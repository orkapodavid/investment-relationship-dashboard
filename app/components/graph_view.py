import reflex as rx
import reflex_enterprise as rxe
from app.states.relationship_state import RelationshipState


def graph_view() -> rx.Component:
    """Render the interactive graph visualization with Flow components."""
    return rx.el.div(
        rxe.flow(
            # Visual components
            rxe.flow.background(variant="dots", gap=12, size=1),
            rxe.flow.controls(
                show_zoom=True,
                show_fit_view=True,
                show_interactive=True,
                position="bottom-right",
            ),
            rxe.flow.mini_map(
                node_color="#93c5fd",  # Light blue matching theme
                pannable=True,
                zoomable=True,
                position="bottom-left",
            ),
            
            # Data binding (controlled flow)
            nodes=RelationshipState.nodes,
            edges=RelationshipState.edges,
            
            # Event handlers
            on_nodes_change=RelationshipState.on_nodes_change,
            on_edges_change=RelationshipState.on_edges_change,
            on_viewport_change=RelationshipState.on_viewport_change,
            on_node_click=RelationshipState.on_node_click,
            on_edge_click=RelationshipState.on_edge_click,
            on_connect=RelationshipState.on_connect,
            
            # Viewport settings
            fit_view=True,
            fit_view_options={"padding": 0.2},
            min_zoom=0.1,
            max_zoom=4.0,
            
            # Interaction settings (explicitly configured)
            nodes_draggable=True,
            nodes_connectable=True,
            nodes_focusable=True,
            edges_focusable=True,
            snap_to_grid=False,
            zoom_on_scroll=True,
            pan_on_scroll=False,
            zoom_on_double_click=False,
            pan_on_drag=True,  # Enable panning by dragging canvas
            select_nodes_on_drag=False,  # Disable selection while dragging
            
            # Styling
            class_name="bg-gray-50 w-full h-full",
        ),
        class_name="w-full h-full relative",
    )