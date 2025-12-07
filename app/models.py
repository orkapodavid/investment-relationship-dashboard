import reflex as rx
from typing import Optional
from datetime import datetime
import sqlmodel
import enum


class RelationshipType(str, enum.Enum):
    EMPLOYMENT = "employment"
    SOCIAL = "social"
    BUSINESS = "business"


class Account(sqlmodel.SQLModel, table=True):
    """Represents a company or organization node."""

    id: Optional[int] = sqlmodel.Field(default=None, primary_key=True)
    name: str
    ticker: str
    dynamics_account_id: str = ""
    contacts: list["Contact"] = sqlmodel.Relationship(back_populates="account")


class Contact(sqlmodel.SQLModel, table=True):
    """Represents a person node."""

    id: Optional[int] = sqlmodel.Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    job_title: str
    dynamics_contact_id: str = ""
    account_id: Optional[int] = sqlmodel.Field(default=None, foreign_key="account.id")
    account: Optional[Account] = sqlmodel.Relationship(back_populates="contacts")


class Relationship(sqlmodel.SQLModel, table=True):
    """Tracks relationships between entities (Person-Person, Company-Company, Person-Company)."""

    id: Optional[int] = sqlmodel.Field(default=None, primary_key=True)
    score: int = 0
    last_updated: datetime = sqlmodel.Field(default_factory=datetime.now)
    relationship_type: RelationshipType = sqlmodel.Field(
        default=RelationshipType.EMPLOYMENT
    )
    source_type: str = "person"
    source_id: int
    target_type: str = "company"
    target_id: int
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