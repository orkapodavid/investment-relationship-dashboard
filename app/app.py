import reflex as rx
import reflex_enterprise as rxe
from contextlib import asynccontextmanager
import sqlmodel
from app.states.relationship_state import RelationshipState
from app.components.graph_view import graph_view
from app.components.side_panel import side_panel
from app.models import Account, Contact, Relationship, RelationshipLog


@asynccontextmanager
async def lifespan_task():
    """Initialize the database on startup."""
    with rx.session() as session:
        sqlmodel.SQLModel.metadata.drop_all(session.get_bind())
        sqlmodel.SQLModel.metadata.create_all(session.get_bind())
    yield


def index() -> rx.Component:
    """The main page layout."""
    return rx.el.div(
        graph_view(),
        rx.el.button(
            rx.icon("plus", class_name="w-6 h-6 mr-2"),
            "NEW ENTITY",
            on_click=RelationshipState.start_node_creation,
            class_name="fixed top-4 right-4 z-[9999] bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl border-4 border-black hover:bg-yellow-500 hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center text-lg",
        ),
        side_panel(),
        class_name="flex h-screen w-full font-sans bg-white text-gray-900 font-['Inter'] overflow-hidden relative",
    )


app = rxe.App(
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