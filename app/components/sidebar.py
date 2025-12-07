import reflex as rx
from app.states.relationship_state import RelationshipState
from app.models import Account


def account_item(account: Account) -> rx.Component:
    """Render a single account item in the sidebar list."""
    is_selected = RelationshipState.selected_account.id == account.id
    return rx.el.div(
        rx.el.div(
            rx.el.span(
                account.ticker,
                class_name="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md mr-3 min-w-[3rem] text-center",
            ),
            rx.el.span(
                account.name,
                class_name=rx.cond(
                    is_selected,
                    "font-semibold text-indigo-900",
                    "font-medium text-gray-700 group-hover:text-gray-900",
                ),
            ),
            class_name="flex items-center",
        ),
        rx.icon(
            "chevron-right",
            class_name=rx.cond(
                is_selected,
                "w-4 h-4 text-indigo-500 opacity-100",
                "w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity",
            ),
        ),
        on_click=lambda: RelationshipState.select_account(account),
        class_name=rx.cond(
            is_selected,
            "flex items-center justify-between p-3 rounded-xl bg-indigo-50 border border-indigo-100 cursor-pointer mb-2 transition-all duration-200 shadow-sm",
            "flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer mb-2 border border-transparent hover:border-gray-200 transition-all duration-200 group",
        ),
    )


def sidebar() -> rx.Component:
    """The left sidebar component containing the accounts list."""
    return rx.el.aside(
        rx.el.div(
            rx.el.div(
                rx.icon("chart-spline", class_name="w-6 h-6 text-indigo-600 mr-2"),
                rx.el.h1(
                    "RelMngr",
                    class_name="text-xl font-bold text-gray-900 tracking-tight",
                ),
                class_name="flex items-center mb-6",
            ),
            rx.el.div(
                rx.icon(
                    "search",
                    class_name="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4",
                ),
                rx.el.input(
                    placeholder="Search accounts or tickers...",
                    on_change=RelationshipState.set_search_query,
                    class_name="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all",
                    default_value=RelationshipState.search_query,
                ),
                class_name="relative mb-6",
            ),
            class_name="p-6 border-b border-gray-100 bg-white",
        ),
        rx.el.div(
            rx.el.p(
                "ACCOUNTS",
                class_name="text-xs font-semibold text-gray-400 mb-3 px-2 tracking-wider",
            ),
            rx.foreach(RelationshipState.filtered_accounts, account_item),
            class_name="flex-1 overflow-y-auto p-4 custom-scrollbar",
        ),
        rx.el.div(
            rx.el.div(
                rx.el.div(
                    rx.el.span("PM"),
                    class_name="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs mr-3",
                ),
                rx.el.div(
                    rx.el.p(
                        "Portfolio Manager",
                        class_name="text-sm font-medium text-gray-900",
                    ),
                    rx.el.p("admin@fund.com", class_name="text-xs text-gray-500"),
                    class_name="flex flex-col",
                ),
                class_name="flex items-center",
            ),
            class_name="p-4 border-t border-gray-100 bg-gray-50",
        ),
        class_name="w-80 h-screen flex flex-col bg-white border-r border-gray-200 shadow-xl z-10",
    )