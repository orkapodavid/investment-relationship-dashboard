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
                placeholder="Search...",
                on_change=RelationshipState.handle_search.debounce(300),
                class_name="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all bg-gray-50 focus:bg-white",
                default_value=RelationshipState.search_query,
            ),
            class_name="relative flex-shrink-0 w-full sm:w-auto",
        ),
        rx.el.div(
            rx.el.div(
                rx.el.div(
                    rx.el.span(
                        "LIMIT",
                        class_name="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5",
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
                        class_name="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600",
                    ),
                    class_name="flex flex-col justify-center mr-4",
                ),
                rx.el.div(
                    rx.el.span(
                        RelationshipState.filtered_accounts.length()
                        + RelationshipState.filtered_contacts.length(),
                        class_name="font-bold text-indigo-600",
                    ),
                    rx.el.span("nodes", class_name="text-xs text-gray-500 ml-1"),
                    rx.cond(
                        RelationshipState.is_loading,
                        rx.el.div(
                            class_name="animate-spin rounded-full h-3 w-3 border-2 border-indigo-600 border-t-transparent ml-2"
                        ),
                    ),
                    class_name="flex items-center bg-gray-50 px-3 py-1 rounded border border-gray-100 min-w-[70px] justify-center h-8",
                ),
                class_name="flex items-center",
            ),
            rx.el.label(
                rx.el.input(
                    type="checkbox",
                    on_change=RelationshipState.toggle_historic,
                    checked=RelationshipState.show_historic,
                    class_name="sr-only peer",
                ),
                rx.el.div(
                    class_name="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"
                ),
                rx.el.span(
                    "Historic",
                    class_name="ml-2 text-xs font-semibold text-gray-600 select-none",
                ),
                class_name="relative inline-flex items-center cursor-pointer ml-4 border-l pl-4 border-gray-200 h-8",
            ),
            class_name="flex items-center flex-wrap gap-y-2",
        ),
        rx.el.div(class_name="flex-grow hidden lg:block"),
        rx.el.div(
            rx.cond(
                RelationshipState.search_query != "",
                rx.el.button(
                    rx.icon("x", class_name="w-4 h-4 mr-1"),
                    "Clear",
                    on_click=RelationshipState.clear_search,
                    class_name="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium border border-transparent hover:border-red-100 mr-2",
                ),
            ),
            rx.el.button(
                rx.icon("plus", class_name="w-5 h-5 mr-2"),
                "New Entity",
                on_click=RelationshipState.start_node_creation,
                class_name="flex items-center px-4 py-2.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors font-bold shadow-md hover:shadow-lg whitespace-nowrap tracking-wide",
            ),
            class_name="flex items-center ml-auto sm:ml-0",
        ),
        class_name="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-gray-200/50 max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-top-2 duration-300",
    )