import reflex as rx
from contextlib import asynccontextmanager
import sqlmodel
from app.states.relationship_state import RelationshipState
from app.components.sidebar import sidebar
from app.components.account_view import account_view
from app.models import Account, Contact, Relationship, RelationshipLog


@asynccontextmanager
async def lifespan_task():
    """Initialize the database on startup."""
    with rx.session() as session:
        sqlmodel.SQLModel.metadata.create_all(session.get_bind())
    yield


def index() -> rx.Component:
    """The main page layout."""
    return rx.el.div(
        sidebar(),
        rx.el.main(
            account_view(), class_name="flex-1 h-screen overflow-y-auto bg-gray-50/30"
        ),
        class_name="flex h-screen w-full font-sans bg-white text-gray-900 font-['Inter']",
    )


app = rx.App(
    theme=rx.theme(appearance="light"),
    head_components=[
        rx.el.link(
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
            rel="stylesheet",
        )
    ],
)
app.register_lifespan_task(lifespan_task)
app.add_page(index, route="/", on_load=RelationshipState.load_data)