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
        rx.el.div(graph_view(), class_name="absolute inset-0 z-0 w-full h-full"),
        rx.el.div(
            rx.el.button(
                rx.icon("plus", class_name="w-8 h-8"),
                on_click=RelationshipState.start_node_creation,
                class_name="p-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-2xl hover:scale-110 active:scale-95 flex items-center justify-center border-4 border-white pointer-events-auto transition-all cursor-pointer",
                aria_label="Create New Entity",
            ),
            class_name="absolute bottom-8 right-8 z-50 flex flex-col gap-4 pointer-events-none [&>*]:pointer-events-auto",
        ),
        side_panel(),
        class_name="relative h-screen w-full font-sans bg-white text-gray-900 font-['Inter'] overflow-hidden",
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