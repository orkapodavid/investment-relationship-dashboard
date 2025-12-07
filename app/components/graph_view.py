import reflex as rx
import reflex_enterprise as rxe
from app.states.relationship_state import RelationshipState
from app.components.search_bar import search_bar


def new_entity_fab() -> rx.Component:
    return rx.el.button(
        rx.icon("plus", class_name="w-8 h-8 text-white"),
        on_click=RelationshipState.start_node_creation,
        class_name="absolute top-4 right-4 z-40 w-16 h-16 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95",
        title="Create New Entity",
    )


def graph_view() -> rx.Component:
    return rx.el.div(
        rxe.flow(
            rxe.flow.background(variant="dots", gap=12, size=1),
            rxe.flow.controls(),
            nodes=RelationshipState.graph_data["nodes"],
            edges=RelationshipState.graph_data["edges"],
            fit_view=True,
            fit_view_options={"padding": 0.2},
            nodes_draggable=True,
            nodes_connectable=True,
            nodes_focusable=True,
            edges_focusable=True,
            min_zoom=0.1,
            max_zoom=4.0,
            snap_to_grid=False,
            zoom_on_scroll=True,
            pan_on_scroll=False,
            zoom_on_double_click=False,
            on_node_click=RelationshipState.on_node_click,
            on_edge_click=RelationshipState.on_edge_click,
            on_connect=RelationshipState.on_connect,
            class_name="bg-gray-50",
        ),
        search_bar(),
        new_entity_fab(),
        class_name="w-full h-full absolute inset-0",
    )