import reflex as rx
import reflex_enterprise as rxe
from app.states.relationship_state import RelationshipState


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
            on_node_click=lambda e, node: RelationshipState.on_node_click(node),
            on_edge_click=lambda e, edge: RelationshipState.on_edge_click(edge),
            on_connect=lambda connection: RelationshipState.on_connect(connection),
            class_name="bg-gray-50",
        ),
        class_name="w-full h-full absolute inset-0",
    )