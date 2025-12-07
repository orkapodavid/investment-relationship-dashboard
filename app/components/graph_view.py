import reflex as rx
import reflex_enterprise as rxe
from app.states.relationship_state import RelationshipState
from app.components.search_bar import search_bar
from app.components.side_panel import side_panel


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
            class_name="bg-gray-50 w-full h-full",
        ),
        search_bar(),
        rx.el.button(
            rx.icon("plus", class_name="w-6 h-6 mr-2"),
            "NEW ENTITY",
            on_click=RelationshipState.start_node_creation,
            class_name="absolute top-4 right-4 z-[50] bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl border-4 border-black hover:bg-yellow-500 hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center text-lg",
        ),
        side_panel(),
        class_name="w-full h-full relative",
    )