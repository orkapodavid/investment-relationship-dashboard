import reflex as rx
from app.states.relationship_state import RelationshipState


def search_input() -> rx.Component:
    return rx.el.div(
        rx.icon(
            "search",
            class_name="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400",
        ),
        rx.el.input(
            placeholder="Search...",
            default_value=RelationshipState.search_query,
            on_change=RelationshipState.handle_search.debounce(300),
            class_name="w-full sm:w-64 pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400",
        ),
        rx.cond(
            RelationshipState.search_query != "",
            rx.el.button(
                rx.icon("x", class_name="w-3 h-3"),
                on_click=RelationshipState.clear_search,
                class_name="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors",
            ),
        ),
        class_name="relative group",
    )


def limit_slider() -> rx.Component:
    return rx.el.div(
        rx.el.span(
            "LIMIT",
            class_name="text-[10px] font-bold text-gray-400 tracking-wider select-none",
        ),
        rx.el.div(
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
                class_name="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all",
            ),
            class_name="flex items-center h-4",
        ),
        class_name="flex flex-col gap-1",
    )


def node_counter() -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.el.span(
                RelationshipState.filtered_accounts.length()
                + RelationshipState.filtered_contacts.length(),
                class_name="font-bold text-indigo-600 tabular-nums",
            ),
            rx.el.span("nodes", class_name="text-xs text-gray-500 font-medium"),
            class_name="flex items-baseline gap-1",
        ),
        rx.cond(
            RelationshipState.is_loading,
            rx.el.div(
                class_name="animate-spin w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full"
            ),
        ),
        class_name="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg min-w-[80px] justify-between h-[38px]",
    )


def history_toggle() -> rx.Component:
    return rx.el.label(
        rx.el.input(
            type="checkbox",
            checked=RelationshipState.show_historic,
            on_change=RelationshipState.toggle_historic,
            class_name="sr-only peer",
        ),
        rx.el.div(
            class_name="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 transition-colors cursor-pointer"
        ),
        rx.el.span(
            "History", class_name="text-sm font-medium text-gray-600 select-none"
        ),
        class_name="relative flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded-lg transition-colors",
    )


def creation_buttons() -> rx.Component:
    return rx.el.div(
        rx.el.button(
            rx.icon("plus", class_name="w-4 h-4"),
            rx.el.span("Node"),
            on_click=RelationshipState.start_node_creation,
            class_name="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all active:scale-95",
        ),
        rx.el.button(
            rx.icon("link", class_name="w-4 h-4"),
            rx.el.span("Link"),
            on_click=RelationshipState.start_relationship_creation,
            disabled=RelationshipState.selected_node_id == "",
            class_name=rx.cond(
                RelationshipState.selected_node_id == "",
                "flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-400 text-sm font-medium rounded-lg cursor-not-allowed border border-gray-200",
                "flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all active:scale-95",
            ),
        ),
        class_name="flex items-center gap-2",
    )


def edit_actions() -> rx.Component:
    return rx.cond(
        RelationshipState.show_side_panel & (RelationshipState.edit_mode != "none"),
        rx.el.div(
            rx.el.div(class_name="w-px h-8 bg-gray-200 mx-1"),
            rx.el.div(
                rx.cond(
                    RelationshipState.edit_mode == "node",
                    rx.el.button(
                        rx.icon("pencil", class_name="w-4 h-4"),
                        on_click=RelationshipState.prepare_node_edit,
                        class_name="p-2 text-gray-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-lg transition-all shadow-sm hover:shadow active:scale-95",
                        title="Edit Node",
                    ),
                ),
                rx.el.button(
                    rx.icon("trash-2", class_name="w-4 h-4"),
                    on_click=RelationshipState.delete_current_selection,
                    class_name="p-2 text-gray-600 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-all shadow-sm hover:shadow active:scale-95",
                    title="Delete Selected",
                ),
                class_name="flex items-center gap-2",
            ),
            class_name="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300",
        ),
    )


def search_bar() -> rx.Component:
    return rx.el.div(
        search_input(),
        rx.el.div(class_name="w-px h-8 bg-gray-200"),
        limit_slider(),
        rx.el.div(class_name="w-px h-8 bg-gray-200"),
        node_counter(),
        history_toggle(),
        rx.el.div(class_name="w-px h-8 bg-gray-200"),
        creation_buttons(),
        edit_actions(),
        class_name="absolute top-4 left-4 z-[500] flex flex-wrap items-center gap-4 p-3 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg transition-all hover:shadow-xl max-w-[calc(100vw-32px)]",
    )