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


from app.components.search_bar import search_bar


def banner() -> rx.Component:
    """Top banner for the application."""
    return rx.el.div(
        rx.el.div(
            rx.el.div(
                rx.icon("network", class_name="w-5 h-5 text-indigo-600"),
                rx.el.h1(
                    "Investment Relationship Dashboard",
                    class_name="text-lg font-bold text-gray-900",
                ),
                class_name="flex items-center gap-3",
            ),
            rx.el.div(
                rx.el.span(
                    "Track relationships and connections",
                    class_name="text-xs text-gray-500",
                ),
                class_name="hidden sm:block",
            ),
            class_name="flex items-center justify-between max-w-7xl mx-auto px-4",
        ),
        class_name="absolute top-0 left-0 right-0 z-[600] bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm h-14 flex items-center",
    )


def index() -> rx.Component:
    """The main page layout."""
    return rx.el.div(
        banner(),
        rx.el.div(
            graph_view(),
            class_name="absolute inset-0 z-0 w-full h-full pt-14",
        ),
        search_bar(),
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