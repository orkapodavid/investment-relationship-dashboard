import reflex as rx
from app.states.relationship_state import RelationshipState


def empty_state() -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.icon("building-2", class_name="w-16 h-16 text-gray-200 mb-4"),
            rx.el.h2(
                "No Account Selected",
                class_name="text-xl font-semibold text-gray-900 mb-2",
            ),
            rx.el.p(
                "Select an account from the sidebar to view details and manage relationships.",
                class_name="text-gray-500 max-w-sm mx-auto",
            ),
            class_name="text-center",
        ),
        class_name="flex-1 flex items-center justify-center h-full bg-gray-50/50",
    )


def account_header() -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.el.div(
                rx.el.h1(
                    RelationshipState.selected_account.name,
                    class_name="text-3xl font-bold text-gray-900 mb-2",
                ),
                rx.el.div(
                    rx.el.span(
                        RelationshipState.selected_account.ticker,
                        class_name="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold mr-3",
                    ),
                    rx.el.span(
                        rx.icon("briefcase", class_name="w-4 h-4"),
                        rx.el.span(RelationshipState.selected_account.sector),
                        class_name="text-gray-500 text-sm font-medium flex items-center gap-1",
                    ),
                    class_name="flex items-center",
                ),
                class_name="flex flex-col",
            ),
            rx.el.button(
                rx.icon("pencil", class_name="w-4 h-4 mr-2"),
                "Edit Account",
                class_name="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm",
            ),
            class_name="flex justify-between items-start mb-8 pb-8 border-b border-gray-100",
        ),
        rx.el.div(
            rx.el.h3(
                "About",
                class_name="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3",
            ),
            rx.el.p(
                RelationshipState.selected_account.description,
                class_name="text-gray-600 leading-relaxed",
            ),
            class_name="mb-8",
        ),
        class_name="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6",
    )


def account_view() -> rx.Component:
    return rx.cond(
        RelationshipState.selected_account,
        rx.el.div(
            account_header(),
            rx.el.div(
                rx.el.div(
                    rx.icon("users", class_name="w-5 h-5 text-gray-400 mr-2"),
                    rx.el.h3(
                        "Key Contacts", class_name="text-lg font-semibold text-gray-900"
                    ),
                    class_name="flex items-center mb-4",
                ),
                rx.el.div(
                    rx.el.div(
                        "Contacts and relationship scoring will appear here in the next phase.",
                        class_name="text-gray-400 text-sm italic",
                    ),
                    class_name="p-8 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50",
                ),
                class_name="bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
            ),
            class_name="flex flex-col max-w-5xl mx-auto w-full p-6 sm:p-10 animation-fade-in",
        ),
        empty_state(),
    )