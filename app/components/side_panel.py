import reflex as rx
from app.states.relationship_state import RelationshipState


def side_panel() -> rx.Component:
    return rx.el.div(
        rx.el.button(
            rx.icon("x", class_name="w-6 h-6"),
            on_click=RelationshipState.close_panel,
            class_name="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10",
        ),
        rx.cond(
            RelationshipState.edit_mode == "node",
            rx.el.div(
                rx.el.h2(
                    "Details",
                    class_name="text-xl font-bold mb-6 text-gray-900 border-b pb-2",
                ),
                rx.el.div(
                    rx.el.label(
                        "Name",
                        class_name="text-sm font-medium text-gray-500 mb-1 block",
                    ),
                    rx.el.p(
                        RelationshipState.selected_node_data["label"],
                        class_name="text-lg font-semibold text-gray-900 mb-4 whitespace-pre-wrap",
                    ),
                    rx.el.label(
                        "Role/Info",
                        class_name="text-sm font-medium text-gray-500 mb-1 block",
                    ),
                    rx.el.p(
                        RelationshipState.selected_node_data["job"],
                        class_name="text-base text-gray-700",
                    ),
                    class_name="space-y-4",
                ),
                class_name="p-6 h-full flex flex-col",
            ),
        ),
        rx.cond(
            RelationshipState.edit_mode == "edge",
            rx.el.div(
                rx.el.h2(
                    "Edit Relationship",
                    class_name="text-xl font-bold mb-6 text-gray-900 border-b pb-2",
                ),
                rx.el.div(
                    rx.el.label(
                        "Relationship Score",
                        class_name="text-sm font-medium text-gray-500 mb-4 block",
                    ),
                    rx.el.div(
                        rx.el.span(
                            "-100 (Enemy)", class_name="text-xs font-bold text-red-500"
                        ),
                        rx.el.span(
                            "0 (Neutral)", class_name="text-xs font-bold text-gray-500"
                        ),
                        rx.el.span(
                            "+100 (Ally)", class_name="text-xs font-bold text-green-500"
                        ),
                        class_name="flex justify-between w-full mb-2 px-1",
                    ),
                    rx.el.input(
                        type="range",
                        min="-100",
                        max="100",
                        default_value=RelationshipState.editing_score,
                        key=RelationshipState.selected_edge_id,
                        on_change=lambda value: RelationshipState.set_editing_score(
                            value.to(int)
                        ).throttle(100),
                        class_name="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4 accent-indigo-600",
                    ),
                    rx.el.div(
                        "Current Score: ",
                        rx.el.span(
                            RelationshipState.editing_score,
                            class_name="font-mono font-bold ml-1",
                        ),
                        class_name="text-center text-sm text-gray-600 mb-8",
                    ),
                    rx.el.button(
                        "Save Changes",
                        on_click=RelationshipState.save_relationship_update,
                        class_name="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm",
                    ),
                    class_name="flex flex-col",
                ),
                class_name="p-6 h-full flex flex-col",
            ),
        ),
        class_name=rx.cond(
            RelationshipState.show_side_panel,
            "fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-0 border-l",
            "fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-full border-l",
        ),
    )