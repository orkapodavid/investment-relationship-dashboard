import reflex as rx
import sqlmodel
from sqlmodel import select, or_, col
import math
from typing import Optional
from datetime import datetime
import logging
from collections import Counter, defaultdict
from app.models import (
    Account,
    Contact,
    Relationship,
    RelationshipLog,
    RelationshipType,
    RelationshipTerm,
)

TERM_DEFAULTS = {
    RelationshipTerm.WORKS_FOR: {"is_directed": True, "default_score": 0},
    RelationshipTerm.INVESTED_IN: {"is_directed": True, "default_score": 50},
    RelationshipTerm.COMPETITOR: {"is_directed": False, "default_score": -50},
    RelationshipTerm.COLLEAGUE: {"is_directed": False, "default_score": 20},
    RelationshipTerm.FRIEND: {"is_directed": False, "default_score": 80},
    RelationshipTerm.ENEMY: {"is_directed": False, "default_score": -100},
}
TERM_TO_TYPE = {
    RelationshipTerm.WORKS_FOR: RelationshipType.EMPLOYMENT,
    RelationshipTerm.INVESTED_IN: RelationshipType.BUSINESS,
    RelationshipTerm.COMPETITOR: RelationshipType.BUSINESS,
    RelationshipTerm.COLLEAGUE: RelationshipType.BUSINESS,
    RelationshipTerm.FRIEND: RelationshipType.SOCIAL,
    RelationshipTerm.ENEMY: RelationshipType.SOCIAL,
}


class RelationshipState(rx.State):
    """State management for the Relationship Dashboard."""

    accounts: list[Account] = []
    contacts: list[Contact] = []
    relationships: list[Relationship] = []
    filtered_accounts: list[Account] = []
    filtered_contacts: list[Contact] = []
    filtered_relationships: list[Relationship] = []
    selected_account: Optional[Account] = None
    search_query: str = ""
    node_limit: int = 100
    show_add_contact_modal: bool = False
    new_contact_first_name: str = ""
    new_contact_last_name: str = ""
    new_contact_job_title: str = ""
    contact_notes: dict[int, str] = {}
    selected_node_id: str = ""
    selected_edge_id: str = ""
    show_side_panel: bool = False
    edit_mode: str = "none"
    selected_node_data: dict = {}
    editing_score: int = 0
    editing_relationship_type: str = ""
    editing_term: str = ""
    editing_is_directed: bool = True
    is_loading: bool = False
    zoom_level: float = 1.0
    show_historic: bool = False

    @rx.var
    def relationship_terms(self) -> list[str]:
        """Return list of available relationship terms."""
        return [t.value for t in RelationshipTerm]

    @rx.event
    def toggle_historic(self, value: bool):
        """Toggle visibility of historic/deleted relationships."""
        self.show_historic = value
        yield RelationshipState.load_data

    @rx.event
    def handle_term_change(self, new_term: str):
        """Handle term change from UI dropdown."""
        try:
            if self.selected_edge_id.startswith("rel-"):
                rel_id = int(self.selected_edge_id.split("-")[1])
                self.update_relationship_term(rel_id, new_term)
        except Exception as e:
            logging.exception(f"Error handling term change: {e}")

    @rx.event
    async def load_data(self):
        """Load data based on search/filter state."""
        self.is_loading = True
        yield
        try:
            with rx.session() as session:
                sqlmodel.SQLModel.metadata.create_all(session.get_bind())
                if not session.exec(select(Account)).first() and (
                    not session.exec(select(Contact)).first()
                ):
                    self.seed_database()
            if self.search_query.strip():
                self.search_and_build_subgraph(self.search_query)
            else:
                self.get_most_connected_nodes(self.node_limit)
        except Exception as e:
            logging.exception(f"Database error in load_data: {e}")
        finally:
            self.is_loading = False

    @rx.event
    def clear_search(self):
        """Clear the search query and reset view."""
        self.search_query = ""
        yield RelationshipState.load_data

    @rx.event
    def get_most_connected_nodes(self, limit: int):
        """Fetch the top N most connected nodes and their immediate relationships."""
        with rx.session() as session:
            query = select(Relationship)
            if not self.show_historic:
                query = query.where(Relationship.is_active == True)
            rels = session.exec(query).all()
            counter = Counter()
            for r in rels:
                counter[r.source_type, r.source_id] += 1
                counter[r.target_type, r.target_id] += 1
            top_nodes = [node for node, count in counter.most_common(limit)]
            top_node_set = set(top_nodes)
            acc_ids = {nid for ntype, nid in top_node_set if ntype == "company"}
            con_ids = {nid for ntype, nid in top_node_set if ntype == "person"}
            self.filtered_accounts = []
            self.filtered_contacts = []
            if acc_ids:
                self.filtered_accounts = session.exec(
                    select(Account).where(Account.id.in_(acc_ids))
                ).all()
            if con_ids:
                self.filtered_contacts = session.exec(
                    select(Contact).where(Contact.id.in_(con_ids))
                ).all()
            self.filtered_relationships = [
                r
                for r in rels
                if (r.source_type, r.source_id) in top_node_set
                and (r.target_type, r.target_id) in top_node_set
            ]

    @rx.event
    def search_and_build_subgraph(self, query: str):
        """Search for nodes and build a 2-degree subgraph around matches."""
        with rx.session() as session:
            acc_matches = session.exec(
                select(Account).where(col(Account.name).ilike(f"%{query}%"))
            ).all()
            con_matches = session.exec(
                select(Contact).where(
                    or_(
                        col(Contact.first_name).ilike(f"%{query}%"),
                        col(Contact.last_name).ilike(f"%{query}%"),
                    )
                )
            ).all()
            if not acc_matches and (not con_matches):
                self.filtered_accounts = []
                self.filtered_contacts = []
                self.filtered_relationships = []
                return
            frontier = set()
            for a in acc_matches:
                frontier.add(("company", a.id))
            for c in con_matches:
                frontier.add(("person", c.id))
            visited = set(frontier)
            query = select(Relationship)
            if not self.show_historic:
                query = query.where(Relationship.is_active == True)
            all_rels = session.exec(query).all()
            adj = defaultdict(list)
            for r in all_rels:
                src = (r.source_type, r.source_id)
                tgt = (r.target_type, r.target_id)
                adj[src].append(tgt)
                adj[tgt].append(src)
            current_level_nodes = frontier
            for _ in range(2):
                next_level_nodes = set()
                for node in current_level_nodes:
                    for neighbor in adj[node]:
                        if neighbor not in visited:
                            visited.add(neighbor)
                            next_level_nodes.add(neighbor)
                if len(visited) >= self.node_limit:
                    break
                current_level_nodes = next_level_nodes
            if len(visited) > self.node_limit:
                visited = set(list(visited)[: self.node_limit])
            final_acc_ids = {nid for ntype, nid in visited if ntype == "company"}
            final_con_ids = {nid for ntype, nid in visited if ntype == "person"}
            self.filtered_accounts = []
            if final_acc_ids:
                self.filtered_accounts = session.exec(
                    select(Account).where(Account.id.in_(final_acc_ids))
                ).all()
            self.filtered_contacts = []
            if final_con_ids:
                self.filtered_contacts = session.exec(
                    select(Contact).where(Contact.id.in_(final_con_ids))
                ).all()
            self.filtered_relationships = [
                r
                for r in all_rels
                if (r.source_type, r.source_id) in visited
                and (r.target_type, r.target_id) in visited
            ]

    @rx.event
    def handle_search(self, query: str):
        """Update search query and reload data."""
        self.search_query = query
        yield RelationshipState.load_data

    @rx.event
    def set_node_limit(self, limit: int):
        """Update node limit and reload data."""
        self.node_limit = limit
        yield RelationshipState.load_data

    @rx.event
    def seed_database(self):
        """Seed database with Company, Person, and Multi-type Relationships."""
        try:
            with rx.session() as session:
                sqlmodel.SQLModel.metadata.create_all(session.get_bind())
                acme = Account(
                    name="Acme Corp", ticker="ACME", dynamics_account_id="ACC-001"
                )
                stark = Account(
                    name="Stark Ind", ticker="STRK", dynamics_account_id="ACC-002"
                )
                wayne = Account(
                    name="Wayne Ent", ticker="WAYN", dynamics_account_id="ACC-003"
                )
                session.add(acme)
                session.add(stark)
                session.add(wayne)
                session.flush()
                wile = Contact(
                    first_name="Wile E.",
                    last_name="Coyote",
                    job_title="Genius",
                    account_id=acme.id,
                )
                tony = Contact(
                    first_name="Tony",
                    last_name="Stark",
                    job_title="CEO",
                    account_id=stark.id,
                )
                pepper = Contact(
                    first_name="Pepper",
                    last_name="Potts",
                    job_title="CEO",
                    account_id=stark.id,
                )
                bruce = Contact(
                    first_name="Bruce",
                    last_name="Wayne",
                    job_title="Chairman",
                    account_id=wayne.id,
                )
                session.add(wile)
                session.add(tony)
                session.add(pepper)
                session.add(bruce)
                session.flush()
                rel_social = Relationship(
                    score=20,
                    relationship_type=RelationshipType.SOCIAL,
                    term=RelationshipTerm.COLLEAGUE,
                    is_directed=False,
                    source_type="person",
                    source_id=tony.id,
                    target_type="person",
                    target_id=bruce.id,
                )
                session.add(rel_social)
                rel_biz = Relationship(
                    score=-50,
                    relationship_type=RelationshipType.BUSINESS,
                    term=RelationshipTerm.COMPETITOR,
                    is_directed=False,
                    source_type="company",
                    source_id=stark.id,
                    target_type="company",
                    target_id=wayne.id,
                )
                session.add(rel_biz)
                rel_social2 = Relationship(
                    score=80,
                    relationship_type=RelationshipType.SOCIAL,
                    term=RelationshipTerm.FRIEND,
                    is_directed=False,
                    source_type="person",
                    source_id=pepper.id,
                    target_type="person",
                    target_id=tony.id,
                )
                session.add(rel_social2)
                rel_invest = Relationship(
                    score=50,
                    relationship_type=RelationshipType.BUSINESS,
                    term=RelationshipTerm.INVESTED_IN,
                    is_directed=True,
                    source_type="company",
                    source_id=wayne.id,
                    target_type="company",
                    target_id=acme.id,
                )
                session.add(rel_invest)
                session.commit()
        except Exception as e:
            logging.exception(f"Error seeding database: {e}")

    @rx.var
    def graph_data(self) -> dict:
        """Transform filtered entities and relationships into graph nodes and edges."""
        nodes = []
        edges = []
        center_x, center_y = (0, 0)
        current_accounts = self.filtered_accounts
        current_contacts = self.filtered_contacts
        current_relationships = self.filtered_relationships
        show_labels = self.zoom_level >= 0.6
        small_nodes = self.zoom_level < 0.4
        simplify_edges = self.zoom_level < 0.5
        total_nodes = len(current_accounts) + len(current_contacts)
        should_animate_particles = total_nodes <= 100
        comp_size = "50px" if small_nodes else "100px"
        pers_size = "30px" if small_nodes else "60px"

        @rx.event
        def get_id(obj):
            return getattr(obj, "id", obj.get("id") if isinstance(obj, dict) else None)

        @rx.event
        def get_attr(obj, attr, default=""):
            return getattr(
                obj, attr, obj.get(attr, default) if isinstance(obj, dict) else default
            )

        for idx, acc in enumerate(current_accounts):
            acc_id = get_id(acc)
            acc_name = get_attr(acc, "name")
            x = center_x + 300 * math.cos(
                2 * math.pi * idx / (len(current_accounts) or 1)
            )
            y = center_y + 300 * math.sin(
                2 * math.pi * idx / (len(current_accounts) or 1)
            )
            nodes.append(
                {
                    "id": f"acc-{acc_id}",
                    "type": "account",
                    "group": "company",
                    "data": {
                        "label": acc_name if show_labels else "",
                        "job": "Company",
                    },
                    "position": {"x": x, "y": y},
                    "style": {
                        "width": comp_size,
                        "height": comp_size,
                        "background": "#1e1b4b",
                        "color": "white",
                        "borderRadius": "8px",
                        "display": "flex",
                        "justifyContent": "center",
                        "alignItems": "center",
                        "textAlign": "center",
                        "fontWeight": "bold",
                    },
                }
            )
        for idx, con in enumerate(current_contacts):
            con_id = get_id(con)
            con_first = get_attr(con, "first_name")
            con_last = get_attr(con, "last_name")
            con_job = get_attr(con, "job_title")
            con_acc_id = get_attr(con, "account_id")
            offset_x = 400 + 100 * math.cos(
                2 * math.pi * idx / (len(current_contacts) or 1)
            )
            offset_y = 400 + 100 * math.sin(
                2 * math.pi * idx / (len(current_contacts) or 1)
            )
            nodes.append(
                {
                    "id": f"con-{con_id}",
                    "type": "contact",
                    "group": "person",
                    "data": {
                        "label": f"{con_first} {con_last}" if show_labels else "",
                        "job": con_job,
                    },
                    "position": {"x": offset_x, "y": offset_y},
                    "style": {
                        "width": pers_size,
                        "height": pers_size,
                        "background": "#bae6fd",
                        "color": "#0f172a",
                        "borderRadius": "50%",
                        "border": "2px solid #0284c7",
                        "display": "flex",
                        "justifyContent": "center",
                        "alignItems": "center",
                        "textAlign": "center",
                        "fontSize": "10px",
                    },
                }
            )
            acc_ids = {get_id(a) for a in current_accounts}
            if con_acc_id and con_acc_id in acc_ids:
                edges.append(
                    {
                        "id": f"emp-{con_id}-{con_acc_id}",
                        "source": f"acc-{con_acc_id}",
                        "target": f"con-{con_id}",
                        "type": "smoothstep",
                        "animated": False,
                        "style": {
                            "stroke": "#334155",
                            "strokeWidth": 2,
                            "strokeDasharray": "5,5",
                        },
                        "data": {"type": "employment", "score": 0},
                    }
                )
        for rel in current_relationships:
            if not rel.is_active and (not self.show_historic):
                continue
            src_prefix = "acc-" if rel.source_type == "company" else "con-"
            tgt_prefix = "acc-" if rel.target_type == "company" else "con-"
            src_id = f"{src_prefix}{rel.source_id}"
            tgt_id = f"{tgt_prefix}{rel.target_id}"
            is_employment = rel.relationship_type == RelationshipType.EMPLOYMENT
            edge_data = {
                "score": rel.score,
                "type": rel.relationship_type.value,
                "term": rel.term.value,
                "is_directed": rel.is_directed,
                "is_active": rel.is_active,
            }
            edge_dict = {
                "id": f"rel-{rel.id}",
                "source": src_id,
                "target": tgt_id,
                "type": "smoothstep",
                "data": edge_data,
            }
            if rel.is_directed:
                edge_dict["markerEnd"] = {"type": "arrowclosed"}
            if not rel.is_active:
                edge_dict.update(
                    {
                        "animated": False,
                        "label": f"{rel.term.value} (Deleted)",
                        "style": {
                            "stroke": "#94a3b8",
                            "strokeWidth": 1,
                            "strokeDasharray": "5,5",
                            "opacity": 0.4,
                        },
                        "labelStyle": {"fill": "#94a3b8", "fontSize": 10},
                    }
                )
            elif is_employment:
                edge_dict.update(
                    {
                        "animated": False,
                        "style": {
                            "stroke": "#334155",
                            "strokeWidth": 2,
                            "strokeDasharray": "5,5",
                        },
                    }
                )
            else:
                edge_color = self.get_edge_color(rel.score)
                if simplify_edges:
                    edge_dict.update(
                        {
                            "animated": should_animate_particles,
                            "style": {
                                "stroke": edge_color,
                                "strokeWidth": 1,
                                "strokeDasharray": "0",
                            },
                        }
                    )
                else:
                    edge_dict.update(
                        {
                            "label": f"{rel.relationship_type.value.title()} ({rel.score})",
                            "animated": should_animate_particles,
                            "style": {
                                "stroke": edge_color,
                                "strokeWidth": 3,
                                "strokeDasharray": "0",
                            },
                            "labelStyle": {
                                "fill": edge_color,
                                "fontWeight": 700,
                                "fontSize": 11,
                            },
                            "labelShowBg": True,
                            "labelBgStyle": {
                                "fill": "#ffffff",
                                "fillOpacity": 0.95,
                                "stroke": edge_color,
                                "strokeWidth": 1,
                            },
                            "labelBgPadding": [8, 4],
                            "labelBgBorderRadius": 6,
                        }
                    )
            edges.append(edge_dict)
        return {"nodes": nodes, "edges": edges}

    @rx.event
    def get_edge_color(self, score: int) -> str:
        """Return gradient color based on relationship score."""

        @rx.event
        def interpolate(start_rgb, end_rgb, factor):
            r = int(start_rgb[0] + (end_rgb[0] - start_rgb[0]) * factor)
            g = int(start_rgb[1] + (end_rgb[1] - start_rgb[1]) * factor)
            b = int(start_rgb[2] + (end_rgb[2] - start_rgb[2]) * factor)
            return f"#{r:02x}{g:02x}{b:02x}"

        score = max(-100, min(100, score))
        red_rgb = (239, 68, 68)
        gray_rgb = (156, 163, 175)
        green_rgb = (16, 185, 129)
        if score < 0:
            factor = (score + 100) / 100.0
            return interpolate(red_rgb, gray_rgb, factor)
        else:
            factor = score / 100.0
            return interpolate(gray_rgb, green_rgb, factor)

    @rx.event
    def on_node_click(self, node: dict):
        """Handle node click to show details."""
        self.selected_node_id = node["id"]
        self.selected_node_data = node["data"]
        self.edit_mode = "node"
        self.show_side_panel = True

    @rx.event
    def on_edge_click(self, edge: dict):
        """Handle edge click to show score editor."""
        self.selected_edge_id = edge["id"]
        data = edge.get("data", {})
        self.editing_score = int(data.get("score", 0))
        self.editing_relationship_type = str(data.get("type", "employment"))
        self.editing_term = str(data.get("term", "works_for"))
        self.editing_is_directed = bool(data.get("is_directed", True))
        if edge["id"].startswith("rel-"):
            self.edit_mode = "edge"
            self.show_side_panel = True
        elif edge["id"].startswith("emp-"):
            self.edit_mode = "edge"
            self.editing_relationship_type = "employment"
            self.editing_term = "works_for"
            self.editing_is_directed = True
            self.show_side_panel = True
        else:
            self.edit_mode = "none"
            self.show_side_panel = False

    @rx.event
    def close_panel(self):
        """Close the side panel."""
        self.show_side_panel = False
        self.edit_mode = "none"

    @rx.event
    def set_editing_score(self, value: int):
        """Update the temporary score value while editing."""
        self.editing_score = value

    @rx.event
    def save_relationship_update(self):
        """Commit the score change to the database."""
        try:
            if self.selected_edge_id.startswith("rel-"):
                rel_id = int(self.selected_edge_id.split("-")[1])
                self.update_relationship_score(rel_id, self.editing_score)
        except Exception as e:
            logging.exception(f"Failed to save relationship: {e}")

    @rx.event
    def update_relationship_score(self, rel_id: int, new_score: int):
        """Update the relationship score."""
        try:
            with rx.session() as session:
                relationship = session.get(Relationship, rel_id)
                if relationship:
                    previous_score = relationship.score
                    relationship.score = new_score
                    relationship.last_updated = datetime.now()
                    session.add(relationship)
                    log_entry = RelationshipLog(
                        relationship_id=relationship.id,
                        previous_score=previous_score,
                        new_score=new_score,
                        changed_at=datetime.now(),
                        note="Manual update via graph",
                        action="score_change",
                    )
                    session.add(log_entry)
                    session.commit()
                self.load_data()
        except Exception as e:
            logging.exception(f"Error updating score: {e}")

    @rx.event
    def create_relationship_with_term(
        self,
        session,
        source_type: str,
        source_id: int,
        target_type: str,
        target_id: int,
        term: RelationshipTerm,
        rel_type: RelationshipType,
    ):
        """Helper to create a relationship with defaults based on term."""
        defaults = TERM_DEFAULTS.get(term, {"is_directed": False, "default_score": 0})
        new_rel = Relationship(
            score=defaults["default_score"],
            relationship_type=rel_type,
            term=term,
            is_directed=defaults["is_directed"],
            is_active=True,
            source_type=source_type,
            source_id=source_id,
            target_type=target_type,
            target_id=target_id,
        )
        session.add(new_rel)
        return new_rel

    @rx.event
    def soft_delete_relationship(self, rel_id: int):
        """Soft delete a relationship."""
        try:
            with rx.session() as session:
                relationship = session.get(Relationship, rel_id)
                if relationship:
                    relationship.is_active = False
                    relationship.last_updated = datetime.now()
                    session.add(relationship)
                    log_entry = RelationshipLog(
                        relationship_id=relationship.id,
                        previous_score=relationship.score,
                        new_score=0,
                        action="soft_delete",
                        changed_at=datetime.now(),
                        note="Relationship soft deleted",
                    )
                    session.add(log_entry)
                    session.commit()
            self.load_data()
            self.close_panel()
            return rx.toast("Relationship deleted", duration=3000)
        except Exception as e:
            logging.exception(f"Error deleting relationship: {e}")
            return rx.toast("Failed to delete relationship", duration=3000)

    @rx.event
    def update_relationship_term(self, rel_id: int, new_term: str):
        """Update the relationship term and apply defaults."""
        try:
            term_enum = RelationshipTerm(new_term)
            defaults = TERM_DEFAULTS.get(
                term_enum, {"is_directed": False, "default_score": 0}
            )
            new_type = TERM_TO_TYPE.get(term_enum, RelationshipType.SOCIAL)
            with rx.session() as session:
                relationship = session.get(Relationship, rel_id)
                if relationship:
                    previous_term = relationship.term
                    previous_score = relationship.score
                    relationship.term = term_enum
                    relationship.relationship_type = new_type
                    relationship.is_directed = defaults["is_directed"]
                    relationship.score = defaults["default_score"]
                    relationship.last_updated = datetime.now()
                    session.add(relationship)
                    log_entry = RelationshipLog(
                        relationship_id=relationship.id,
                        previous_score=previous_score,
                        new_score=relationship.score,
                        previous_term=previous_term,
                        new_term=new_term,
                        action="term_change",
                        changed_at=datetime.now(),
                        note=f"Term changed to {new_term}",
                    )
                    session.add(log_entry)
                    session.commit()
                    self.editing_relationship_type = new_type.value
                    self.editing_term = new_term
                    self.editing_is_directed = defaults["is_directed"]
                    self.editing_score = defaults["default_score"]
            self.load_data()
            return rx.toast(f"Updated relationship to {new_term}", duration=3000)
        except Exception as e:
            logging.exception(f"Error updating term: {e}")
            return rx.toast("Failed to update term", duration=3000)

    @rx.event
    def on_connect(self, connection: dict):
        """Handle creating new relationships by dragging between nodes."""
        source = connection["source"]
        target = connection["target"]
        try:
            src_parts = source.split("-")
            tgt_parts = target.split("-")
            if len(src_parts) < 2 or len(tgt_parts) < 2:
                return rx.toast("Invalid node identifiers", duration=3000)
            src_prefix, src_id_str = (src_parts[0], src_parts[1])
            tgt_prefix, tgt_id_str = (tgt_parts[0], tgt_parts[1])
            src_id = int(src_id_str)
            tgt_id = int(tgt_id_str)
            src_type = "company" if src_prefix == "acc" else "person"
            tgt_type = "company" if tgt_prefix == "acc" else "person"
            if src_type == tgt_type and src_id == tgt_id:
                return rx.toast("Cannot connect a node to itself", duration=3000)
            rel_type = RelationshipType.SOCIAL
            default_term = RelationshipTerm.FRIEND
            if src_type == "company" and tgt_type == "company":
                rel_type = RelationshipType.BUSINESS
                default_term = RelationshipTerm.COMPETITOR
            elif (
                src_type == "person"
                and tgt_type == "company"
                or (src_type == "company" and tgt_type == "person")
            ):
                rel_type = RelationshipType.EMPLOYMENT
                default_term = RelationshipTerm.WORKS_FOR
            elif src_type == "person" and tgt_type == "person":
                rel_type = RelationshipType.SOCIAL
                default_term = RelationshipTerm.FRIEND
            with rx.session() as session:
                existing = session.exec(
                    sqlmodel.select(Relationship).where(
                        Relationship.source_type == src_type,
                        Relationship.source_id == src_id,
                        Relationship.target_type == tgt_type,
                        Relationship.target_id == tgt_id,
                    )
                ).first()
                rel_to_edit = None
                if existing:
                    if not existing.is_active:
                        existing.is_active = True
                        existing.last_updated = datetime.now()
                        session.add(existing)
                        log_entry = RelationshipLog(
                            relationship_id=existing.id,
                            previous_score=existing.score,
                            new_score=existing.score,
                            action="reactivate",
                            changed_at=datetime.now(),
                            note="Reactivated via graph connection",
                        )
                        session.add(log_entry)
                        session.commit()
                        rel_to_edit = existing
                        rx.toast("Reactivated existing relationship", duration=3000)
                    else:
                        return rx.toast("Relationship already exists", duration=3000)
                else:
                    rel_to_edit = self.create_relationship_with_term(
                        session,
                        src_type,
                        src_id,
                        tgt_type,
                        tgt_id,
                        default_term,
                        rel_type,
                    )
                    session.commit()
                    rx.toast(
                        f"Created new {rel_type.value} relationship", duration=3000
                    )
            self.load_data()
            if rel_to_edit:
                self.selected_edge_id = f"rel-{rel_to_edit.id}"
                self.editing_score = rel_to_edit.score
                self.editing_relationship_type = rel_to_edit.relationship_type.value
                self.editing_term = rel_to_edit.term.value
                self.editing_is_directed = rel_to_edit.is_directed
                self.edit_mode = "edge"
                self.show_side_panel = True
        except Exception as e:
            logging.exception(f"Failed to link nodes: {e}")
            return rx.toast("Failed to create relationship", duration=3000)