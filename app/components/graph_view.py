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
        side_panel(),
        rx.el.button(
            "DEBUG: NEW ENTITY",
            on_click=RelationshipState.start_node_creation,
            class_name="absolute bottom-8 right-8 z-[9999] bg-red-600 text-white font-bold p-6 text-xl border-4 border-black rounded-lg shadow-2xl hover:bg-red-700",
            style={
                "position": "absolute",
                "bottom": "50px",
                "right": "50px",
                "zIndex": "9999",
            },
        ),
        class_name="w-full h-full relative",
    )