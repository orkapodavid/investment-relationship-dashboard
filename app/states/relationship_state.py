import reflex as rx
import sqlmodel
import math
from typing import Optional
from datetime import datetime
import logging
from sqlalchemy.orm import selectinload
from app.models import Account, Contact, Relationship, RelationshipLog


class RelationshipState(rx.State):
    """State management for the Relationship Dashboard."""

    accounts: list[Account] = []
    selected_account: Optional[Account] = None
    search_query: str = ""
    current_contacts: list[Contact] = []
    show_add_contact_modal: bool = False
    new_contact_first_name: str = ""
    new_contact_last_name: str = ""
    new_contact_job_title: str = ""
    expanded_contact_ids: list[int] = []
    contact_notes: dict[int, str] = {}

    @rx.event
    def toggle_add_contact_modal(self):
        self.show_add_contact_modal = not self.show_add_contact_modal

    @rx.event
    def set_new_contact_first_name(self, value: str):
        self.new_contact_first_name = value

    @rx.event
    def set_new_contact_last_name(self, value: str):
        self.new_contact_last_name = value

    @rx.event
    def set_new_contact_job_title(self, value: str):
        self.new_contact_job_title = value

    @rx.event
    def toggle_contact_history(self, contact_id: int):
        if contact_id in self.expanded_contact_ids:
            self.expanded_contact_ids.remove(contact_id)
        else:
            self.expanded_contact_ids.append(contact_id)

    @rx.event
    def set_contact_note(self, contact_id: int, note: str):
        self.contact_notes[contact_id] = note

    @rx.event
    def add_contact(self):
        """Add a new contact to the selected account."""
        if not self.selected_account:
            return
        try:
            with rx.session() as session:
                contact = Contact(
                    first_name=self.new_contact_first_name,
                    last_name=self.new_contact_last_name,
                    job_title=self.new_contact_job_title,
                    account_id=self.selected_account.id,
                    dynamics_contact_id=f"NEW-{datetime.now().strftime('%M%S')}",
                )
                session.add(contact)
                session.flush()
                rel = Relationship(score=0, contact_id=contact.id)
                session.add(rel)
                session.commit()
                self.new_contact_first_name = ""
                self.new_contact_last_name = ""
                self.new_contact_job_title = ""
                self.show_add_contact_modal = False
                self.load_data()
                for acc in self.accounts:
                    if acc.id == self.selected_account.id:
                        self.select_account(acc)
                        break
        except Exception as e:
            logging.exception(f"Error adding contact: {e}")

    @rx.event
    def load_data(self):
        """Load accounts from database. Handles failures gracefully by using mock data."""
        try:
            with rx.session() as session:
                sqlmodel.SQLModel.metadata.create_all(session.get_bind())
                statement = sqlmodel.select(Account).options(
                    selectinload(Account.contacts)
                    .selectinload(Contact.relationship)
                    .selectinload(Relationship.logs)
                )
                accounts = session.exec(statement).all()
                if not accounts:
                    self.seed_database()
                    accounts = session.exec(statement).all()
                self.accounts = accounts
                if self.accounts and (not self.selected_account):
                    self.select_account(self.accounts[0])
        except Exception as e:
            logging.exception(f"Database error in load_data: {e}")
            self.use_mock_data()

    @rx.event
    def use_mock_data(self):
        """Fallback to in-memory data when database is unavailable."""
        print("WARNING: Using in-memory mock data due to database error.")
        acc1 = Account(
            id=1, name="Acme Corp", ticker="ACME", dynamics_account_id="ACC-1001"
        )
        c1 = Contact(
            id=1,
            first_name="Wile E.",
            last_name="Coyote",
            job_title="Chief Genius",
            account_id=1,
        )
        c1.relationship = Relationship(id=1, score=-80, contact_id=1)
        acc1.contacts = [c1]
        acc2 = Account(
            id=2, name="Stark Industries", ticker="STRK", dynamics_account_id="ACC-1002"
        )
        c2 = Contact(
            id=2, first_name="Tony", last_name="Stark", job_title="CEO", account_id=2
        )
        c2.relationship = Relationship(id=2, score=90, contact_id=2)
        c3 = Contact(
            id=3, first_name="Pepper", last_name="Potts", job_title="COO", account_id=2
        )
        c3.relationship = Relationship(id=3, score=60, contact_id=3)
        acc2.contacts = [c2, c3]
        self.accounts = [acc1, acc2]
        if not self.selected_account:
            self.select_account(acc1)

    @rx.event
    def seed_database(self):
        """Seed the database with sample data for demonstration."""
        sample_accounts = [
            {"name": "Acme Corp", "ticker": "ACME", "dynamics_account_id": "ACC-001"},
            {"name": "Globex Corp", "ticker": "GLBX", "dynamics_account_id": "ACC-002"},
            {"name": "Stark Ind", "ticker": "STRK", "dynamics_account_id": "ACC-003"},
            {"name": "Wayne Ent", "ticker": "WAYN", "dynamics_account_id": "ACC-004"},
        ]
        sample_contacts = [
            {
                "first_name": "Wile E.",
                "last_name": "Coyote",
                "job_title": "Super Genius",
                "acc_idx": 0,
                "score": -90,
            },
            {
                "first_name": "Road",
                "last_name": "Runner",
                "job_title": "Speed Tester",
                "acc_idx": 0,
                "score": 10,
            },
            {
                "first_name": "Hank",
                "last_name": "Scorpio",
                "job_title": "CEO",
                "acc_idx": 1,
                "score": 85,
            },
            {
                "first_name": "Tony",
                "last_name": "Stark",
                "job_title": "Iron Man",
                "acc_idx": 2,
                "score": 50,
            },
            {
                "first_name": "Bruce",
                "last_name": "Wayne",
                "job_title": "Chairman",
                "acc_idx": 3,
                "score": 0,
            },
        ]
        try:
            with rx.session() as session:
                sqlmodel.SQLModel.metadata.create_all(session.get_bind())
                accounts_objs = []
                for acc_data in sample_accounts:
                    account = Account(**acc_data)
                    session.add(account)
                    accounts_objs.append(account)
                session.flush()
                for con_data in sample_contacts:
                    acc_idx = con_data.pop("acc_idx")
                    score = con_data.pop("score")
                    contact = Contact(**con_data, account_id=accounts_objs[acc_idx].id)
                    session.add(contact)
                    session.flush()
                    rel = Relationship(score=score, contact_id=contact.id)
                    session.add(rel)
                session.commit()
        except Exception as e:
            logging.exception(f"Error seeding database: {e}")

    @rx.event
    def select_account(self, account: Account):
        """Set the currently selected account and update contacts list."""
        self.selected_account = account
        if account and hasattr(account, "contacts"):
            self.current_contacts = account.contacts
        else:
            self.current_contacts = []

    @rx.event
    def update_score(self, contact_id: int, new_score: int):
        """Update the relationship score for a contact."""
        try:
            with rx.session() as session:
                statement = sqlmodel.select(Relationship).where(
                    Relationship.contact_id == contact_id
                )
                relationship = session.exec(statement).first()
                previous_score = 0
                if not relationship:
                    relationship = Relationship(contact_id=contact_id, score=new_score)
                    session.add(relationship)
                    session.flush()
                else:
                    previous_score = relationship.score
                    relationship.score = new_score
                    relationship.last_updated = datetime.now()
                    session.add(relationship)
                note = self.contact_notes.get(contact_id, "Manual update via dashboard")
                if not note:
                    note = "Manual update via dashboard"
                log_entry = RelationshipLog(
                    relationship_id=relationship.id,
                    previous_score=previous_score,
                    new_score=new_score,
                    changed_at=datetime.now(),
                    note=note,
                )
                session.add(log_entry)
                session.commit()
                self.load_data()
                if self.selected_account:
                    for acc in self.accounts:
                        if acc.id == self.selected_account.id:
                            self.select_account(acc)
                            break
        except Exception as e:
            logging.exception(f"Error updating score: {e}")

    @rx.event
    def set_search_query(self, query: str):
        """Update the search query."""
        self.search_query = query

    @rx.var
    def filtered_accounts(self) -> list[Account]:
        """Return accounts matching the search query."""
        if not self.search_query:
            return self.accounts
        query = self.search_query.lower()
        return [
            acc
            for acc in self.accounts
            if query in acc.name.lower() or query in acc.ticker.lower()
        ]

    @rx.var
    def graph_data(self) -> dict:
        """Transform SQL models into graph nodes and edges."""
        nodes = []
        edges = []
        center_x, center_y = (0, 0)
        account_radius = 400
        contact_radius = 150
        if not self.accounts:
            return {"nodes": [], "edges": []}
        for idx, account in enumerate(self.accounts):
            acc_pos = self.get_node_position(
                idx, len(self.accounts), "account", center_x, center_y, account_radius
            )
            nodes.append(
                {
                    "id": f"acc-{account.id}",
                    "type": "account",
                    "data": {
                        "label": account.name,
                        "contactsCount": len(account.contacts),
                    },
                    "position": acc_pos,
                    "style": {
                        "width": "120px",
                        "height": "120px",
                        "background": self.get_account_color(len(account.contacts)),
                        "color": "white",
                        "border": "2px solid #1e1b4b",
                        "borderRadius": "4px",
                        "display": "flex",
                        "justifyContent": "center",
                        "alignItems": "center",
                        "textAlign": "center",
                        "fontWeight": "bold",
                        "boxShadow": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    },
                    "draggable": True,
                }
            )
            for c_idx, contact in enumerate(account.contacts):
                con_pos = self.get_node_position(
                    c_idx,
                    len(account.contacts),
                    "contact",
                    acc_pos["x"],
                    acc_pos["y"],
                    contact_radius,
                )
                nodes.append(
                    {
                        "id": f"con-{contact.id}",
                        "type": "contact",
                        "data": {
                            "label": f"{contact.first_name}\n{contact.last_name}",
                            "job": contact.job_title,
                        },
                        "position": con_pos,
                        "style": {
                            "width": "60px",
                            "height": "60px",
                            "background": "#bae6fd",
                            "color": "#0f172a",
                            "border": "1px solid #0284c7",
                            "borderRadius": "50%",
                            "display": "flex",
                            "justifyContent": "center",
                            "alignItems": "center",
                            "textAlign": "center",
                            "fontSize": "10px",
                            "boxShadow": "0 2px 4px -1px rgb(0 0 0 / 0.06)",
                        },
                        "draggable": True,
                    }
                )
                score = contact.relationship.score if contact.relationship else 0
                edge_color = self.get_edge_color(score)
                edges.append(
                    {
                        "id": f"edge-{account.id}-{contact.id}",
                        "source": f"acc-{account.id}",
                        "target": f"con-{contact.id}",
                        "label": f"{score}",
                        "animated": True,
                        "style": {"stroke": edge_color, "strokeWidth": 2},
                        "labelStyle": {"fill": edge_color, "fontWeight": 700},
                        "data": {"score": score},
                    }
                )
        return {"nodes": nodes, "edges": edges}

    @rx.event
    def get_node_position(
        self,
        index: int,
        total: int,
        node_type: str,
        center_x: float = 0,
        center_y: float = 0,
        radius: float = 100,
    ) -> dict:
        """Calculate position based on circular layout."""
        if total == 0:
            return {"x": center_x, "y": center_y}
        angle = 2 * math.pi * index / total
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle)
        return {"x": x, "y": y}

    @rx.event
    def get_account_color(self, contact_count: int) -> str:
        """Return color shade based on number of contacts."""
        if contact_count == 0:
            return "#a5b4fc"
        elif contact_count < 3:
            return "#6366f1"
        elif contact_count < 6:
            return "#4338ca"
        else:
            return "#312e81"

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

    selected_node_id: str = ""
    selected_edge_id: str = ""
    show_side_panel: bool = False
    edit_mode: str = "none"
    selected_node_data: dict = {}
    editing_score: int = 0

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
        self.edit_mode = "edge"
        self.show_side_panel = True

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
            parts = self.selected_edge_id.split("-")
            if len(parts) >= 3:
                contact_id = int(parts[-1])
                self.update_score(contact_id, self.editing_score)
        except Exception as e:
            logging.exception(f"Failed to save relationship: {e}")

    @rx.event
    def on_connect(self, connection: dict):
        """Handle new connections (reparenting contacts)."""
        source = connection["source"]
        target = connection["target"]
        if source.startswith("acc-") and target.startswith("con-"):
            try:
                acc_id = int(source.split("-")[1])
                con_id = int(target.split("-")[1])
                with rx.session() as session:
                    contact = session.get(Contact, con_id)
                    if contact:
                        contact.account_id = acc_id
                        session.add(contact)
                        session.commit()
                self.load_data()
            except Exception as e:
                logging.exception(f"Failed to link nodes: {e}")