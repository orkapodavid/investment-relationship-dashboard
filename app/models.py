import reflex as rx
from typing import Optional
from datetime import datetime
import sqlmodel


class Account(sqlmodel.SQLModel, table=True):
    """Represents an investment account or company."""

    id: Optional[int] = sqlmodel.Field(default=None, primary_key=True)
    name: str
    ticker: str
    dynamics_account_id: str = ""
    contacts: list["Contact"] = sqlmodel.Relationship(back_populates="account")


class Contact(sqlmodel.SQLModel, table=True):
    """Represents a person at an account."""

    id: Optional[int] = sqlmodel.Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    job_title: str
    dynamics_contact_id: str = ""
    account_id: int = sqlmodel.Field(foreign_key="account.id")
    account: Optional[Account] = sqlmodel.Relationship(back_populates="contacts")
    relationship: Optional["Relationship"] = sqlmodel.Relationship(
        sa_relationship_kwargs={"uselist": False}, back_populates="contact"
    )


class Relationship(sqlmodel.SQLModel, table=True):
    """Tracks the current relationship status with a contact."""

    id: Optional[int] = sqlmodel.Field(default=None, primary_key=True)
    score: int = 0
    last_updated: datetime = sqlmodel.Field(default_factory=datetime.now)
    contact_id: int = sqlmodel.Field(foreign_key="contact.id")
    contact: Optional[Contact] = sqlmodel.Relationship(back_populates="relationship")
    logs: list["RelationshipLog"] = sqlmodel.Relationship(back_populates="relationship")


class RelationshipLog(sqlmodel.SQLModel, table=True):
    """Tracks history of relationship score changes."""

    id: Optional[int] = sqlmodel.Field(default=None, primary_key=True)
    previous_score: int
    new_score: int
    changed_at: datetime = sqlmodel.Field(default_factory=datetime.now)
    note: Optional[str] = None
    relationship_id: int = sqlmodel.Field(foreign_key="relationship.id")
    relationship: Optional[Relationship] = sqlmodel.Relationship(back_populates="logs")