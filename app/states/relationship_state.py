import reflex as rx
import sqlmodel
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

    @rx.event
    def load_data(self):
        """Load accounts from database. Handles failures gracefully by using mock data."""
        try:
            with rx.session() as session:
                statement = sqlmodel.select(Account).options(
                    selectinload(Account.contacts).selectinload(Contact.relationship)
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
                if not relationship:
                    relationship = Relationship(contact_id=contact_id, score=new_score)
                    session.add(relationship)
                    previous_score = 0
                else:
                    previous_score = relationship.score
                    relationship.score = new_score
                    relationship.last_updated = datetime.now()
                    session.add(relationship)
                log_entry = RelationshipLog(
                    relationship_id=relationship.id if relationship.id else 0,
                    previous_score=previous_score,
                    new_score=new_score,
                    changed_at=datetime.now(),
                    note="Manual update via dashboard",
                )
                if not relationship.id:
                    session.flush()
                    log_entry.relationship_id = relationship.id
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