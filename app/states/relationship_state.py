import reflex as rx
import sqlmodel
import math
from typing import Optional
from datetime import datetime
import logging
from sqlalchemy.orm import selectinload
from app.models import Account, Contact, Relationship, RelationshipLog, RelationshipType


class RelationshipState(rx.State):
    """State management for the Relationship Dashboard."""

    accounts: list[Account] = []
    contacts: list[Contact] = []
    relationships: list[Relationship] = []
    selected_account: Optional[Account] = None
    search_query: str = ""
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

    @rx.event
    def load_data(self):
        """Load all entities and relationships from the database."""
        try:
            with rx.session() as session:
                sqlmodel.SQLModel.metadata.create_all(session.get_bind())
                self.accounts = session.exec(sqlmodel.select(Account)).all()
                self.contacts = session.exec(sqlmodel.select(Contact)).all()
                self.relationships = session.exec(sqlmodel.select(Relationship)).all()
                if not self.accounts and (not self.contacts):
                    self.seed_database()
                    self.accounts = session.exec(sqlmodel.select(Account)).all()
                    self.contacts = session.exec(sqlmodel.select(Contact)).all()
                    self.relationships = session.exec(
                        sqlmodel.select(Relationship)
                    ).all()
        except Exception as e:
            logging.exception(f"Database error in load_data: {e}")

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
                    source_type="person",
                    source_id=tony.id,
                    target_type="person",
                    target_id=bruce.id,
                )
                session.add(rel_social)
                rel_biz = Relationship(
                    score=-50,
                    relationship_type=RelationshipType.BUSINESS,
                    source_type="company",
                    source_id=stark.id,
                    target_type="company",
                    target_id=wayne.id,
                )
                session.add(rel_biz)
                rel_social2 = Relationship(
                    score=90,
                    relationship_type=RelationshipType.SOCIAL,
                    source_type="person",
                    source_id=pepper.id,
                    target_type="person",
                    target_id=tony.id,
                )
                session.add(rel_social2)
                session.commit()
        except Exception as e:
            logging.exception(f"Error seeding database: {e}")

    @rx.var
    def graph_data(self) -> dict:
        """Transform generic entities and relationships into graph nodes and edges."""
        nodes = []
        edges = []
        center_x, center_y = (0, 0)
        for idx, acc in enumerate(self.accounts):
            x = center_x + 300 * math.cos(2 * math.pi * idx / (len(self.accounts) or 1))
            y = center_y + 300 * math.sin(2 * math.pi * idx / (len(self.accounts) or 1))
            nodes.append(
                {
                    "id": f"acc-{acc.id}",
                    "type": "account",
                    "group": "company",
                    "data": {"label": acc.name, "job": "Company"},
                    "position": {"x": x, "y": y},
                    "style": {
                        "width": "100px",
                        "height": "100px",
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
        for idx, con in enumerate(self.contacts):
            offset_x = 400 + 100 * math.cos(
                2 * math.pi * idx / (len(self.contacts) or 1)
            )
            offset_y = 400 + 100 * math.sin(
                2 * math.pi * idx / (len(self.contacts) or 1)
            )
            nodes.append(
                {
                    "id": f"con-{con.id}",
                    "type": "contact",
                    "group": "person",
                    "data": {
                        "label": f"{con.first_name} {con.last_name}",
                        "job": con.job_title,
                    },
                    "position": {"x": offset_x, "y": offset_y},
                    "style": {
                        "width": "60px",
                        "height": "60px",
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
            if con.account_id:
                edges.append(
                    {
                        "id": f"emp-{con.id}-{con.account_id}",
                        "source": f"acc-{con.account_id}",
                        "target": f"con-{con.id}",
                        "label": "Employed",
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
        for rel in self.relationships:
            src_prefix = "acc-" if rel.source_type == "company" else "con-"
            tgt_prefix = "acc-" if rel.target_type == "company" else "con-"
            src_id = f"{src_prefix}{rel.source_id}"
            tgt_id = f"{tgt_prefix}{rel.target_id}"
            is_employment = rel.relationship_type == RelationshipType.EMPLOYMENT
            if is_employment:
                edge_color = "#334155"
                is_animated = False
                label = "Employed"
                stroke_dash = "5,5"
                stroke_width = 2
            else:
                edge_color = self.get_edge_color(rel.score)
                is_animated = True
                label = f"{rel.relationship_type.value.title()} ({rel.score})"
                stroke_dash = "0"
                stroke_width = 3
            edges.append(
                {
                    "id": f"rel-{rel.id}",
                    "source": src_id,
                    "target": tgt_id,
                    "label": label,
                    "animated": is_animated,
                    "type": "smoothstep",
                    "style": {
                        "stroke": edge_color,
                        "strokeWidth": stroke_width,
                        "strokeDasharray": stroke_dash,
                    },
                    "labelStyle": {"fill": edge_color, "fontWeight": 700},
                    "data": {"score": rel.score, "type": rel.relationship_type.value},
                }
            )
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
        if edge["id"].startswith("rel-"):
            self.edit_mode = "edge"
            self.show_side_panel = True
        elif edge["id"].startswith("emp-"):
            self.edit_mode = "edge"
            self.editing_relationship_type = "employment"
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
                    )
                    session.add(log_entry)
                    session.commit()
                self.load_data()
        except Exception as e:
            logging.exception(f"Error updating score: {e}")

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
            if src_type == "company" and tgt_type == "company":
                rel_type = RelationshipType.BUSINESS
            elif (
                src_type == "person"
                and tgt_type == "company"
                or (src_type == "company" and tgt_type == "person")
            ):
                rel_type = RelationshipType.EMPLOYMENT
            with rx.session() as session:
                existing = session.exec(
                    sqlmodel.select(Relationship).where(
                        Relationship.source_type == src_type,
                        Relationship.source_id == src_id,
                        Relationship.target_type == tgt_type,
                        Relationship.target_id == tgt_id,
                    )
                ).first()
                if existing:
                    return rx.toast("Relationship already exists", duration=3000)
                new_rel = Relationship(
                    score=0,
                    relationship_type=rel_type,
                    source_type=src_type,
                    source_id=src_id,
                    target_type=tgt_type,
                    target_id=tgt_id,
                )
                session.add(new_rel)
                session.commit()
            self.load_data()
            return rx.toast(f"Created new {rel_type.value} relationship", duration=3000)
        except Exception as e:
            logging.exception(f"Failed to link nodes: {e}")
            return rx.toast("Failed to create relationship", duration=3000)