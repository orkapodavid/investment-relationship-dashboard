import reflex as rx
import sqlmodel
from typing import Optional
from app.models import Account, Contact, Relationship


class RelationshipState(rx.State):
    """State management for the Relationship Dashboard."""

    accounts: list[Account] = []
    selected_account: Optional[Account] = None
    search_query: str = ""

    @rx.event
    def load_data(self):
        """Load accounts from database. If empty, seed initial data."""
        with rx.session() as session:
            accounts = session.exec(sqlmodel.select(Account)).all()
            if not accounts:
                self.seed_database()
                accounts = session.exec(sqlmodel.select(Account)).all()
            self.accounts = accounts

    @rx.event
    def seed_database(self):
        """Seed the database with sample data for demonstration."""
        sample_accounts = [
            {
                "name": "Acme Corp",
                "ticker": "ACME",
                "sector": "Technology",
                "description": "Leading provider of coyote-catching devices.",
            },
            {
                "name": "Globex Corporation",
                "ticker": "GLBX",
                "sector": "Conglomerate",
                "description": "High-tech manufacturing and villainous logistics.",
            },
            {
                "name": "Soylent Corp",
                "ticker": "SYLT",
                "sector": "Food & Beverage",
                "description": "Nutritional supplements for the masses.",
            },
            {
                "name": "Umbrella Corp",
                "ticker": "UMB",
                "sector": "Pharmaceuticals",
                "description": "Biotech research and genetic engineering.",
            },
            {
                "name": "Stark Industries",
                "ticker": "STRK",
                "sector": "Defense",
                "description": "Clean energy and advanced defense systems.",
            },
            {
                "name": "Wayne Enterprises",
                "ticker": "WAYN",
                "sector": "Technology",
                "description": "R&D, shipping, and urban development.",
            },
            {
                "name": "Cyberdyne Systems",
                "ticker": "CYBR",
                "sector": "AI",
                "description": "Artificial intelligence and robotics.",
            },
            {
                "name": "Massive Dynamic",
                "ticker": "MDYN",
                "sector": "Science",
                "description": "Advancing human evolution through technology.",
            },
        ]
        with rx.session() as session:
            for acc_data in sample_accounts:
                account = Account(**acc_data)
                session.add(account)
            session.commit()

    @rx.event
    def select_account(self, account: Account):
        """Set the currently selected account."""
        self.selected_account = account

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