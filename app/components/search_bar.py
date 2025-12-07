import reflex as rx
from app.states.relationship_state import RelationshipState


def search_bar() -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.icon(
                "search",
                class_name="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2",
            ),
            rx.el.input(
                placeholder="Search people or companies...",
                on_change=RelationshipState.handle_search.debounce(300),
                class_name="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all",
                default_value=RelationshipState.search_query,
            ),
            class_name="relative",
        ),
        rx.el.div(
            rx.el.div(
                rx.el.span(
                    "Limit: ",
                    class_name="text-xs font-semibold text-gray-500 uppercase tracking-wider",
                ),
                rx.el.span(
                    RelationshipState.node_limit,
                    class_name="text-xs font-bold text-indigo-600 ml-1",
                ),
                class_name="mb-1",
            ),
            rx.el.input(
                type="range",
                min="50",
                max="500",
                step="50",
                default_value=RelationshipState.node_limit.to_string(),
                key=RelationshipState.node_limit.to_string(),
                on_change=lambda val: RelationshipState.set_node_limit(
                    val.to(int)
                ).throttle(100),
                class_name="w-32 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600",
            ),
            class_name="flex flex-col justify-center",
        ),
        rx.el.div(
            rx.el.div(
                rx.el.span(
                    RelationshipState.filtered_accounts.length()
                    + RelationshipState.filtered_contacts.length(),
                    class_name="font-bold text-indigo-600",
                ),
                rx.el.span(" nodes", class_name="text-gray-500 ml-1"),
                class_name="text-sm whitespace-nowrap",
            ),
            rx.cond(
                RelationshipState.is_loading,
                rx.el.div(
                    class_name="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent ml-2"
                ),
            ),
            class_name="flex items-center bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 min-w-[100px] justify-center",
        ),
        rx.cond(
            RelationshipState.search_query != "",
            rx.el.button(
                rx.icon("x", class_name="w-4 h-4 mr-1"),
                "Clear",
                on_click=RelationshipState.clear_search,
                class_name="flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium",
            ),
        ),
        class_name="absolute top-4 left-4 z-10 flex items-center gap-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500",
    )