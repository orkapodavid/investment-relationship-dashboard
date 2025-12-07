import reflex as rx
from app.states.relationship_state import RelationshipState
from app.models import Contact, Relationship


def get_sentiment_label(score: int) -> rx.Component:
    return rx.cond(
        score <= -30, "Hostile", rx.cond(score >= 30, "Friendly", "Indifferent")
    )


def contact_card(contact: Contact) -> rx.Component:
    """Render a single contact card with relationship slider."""
    score = contact.relationship.score
    return rx.el.div(
        rx.el.div(
            rx.el.div(
                rx.el.div(
                    rx.el.h4(
                        f"{contact.first_name} {contact.last_name}",
                        class_name="font-bold text-gray-900 text-lg",
                    ),
                    rx.el.p(
                        contact.job_title,
                        class_name="text-sm text-gray-500 font-medium",
                    ),
                    class_name="flex flex-col",
                ),
                rx.el.div(
                    get_sentiment_label(score),
                    class_name=rx.cond(
                        score <= -30,
                        "px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700",
                        rx.cond(
                            score >= 30,
                            "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700",
                            "px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700",
                        ),
                    ),
                ),
                class_name="flex justify-between items-start mb-4",
            ),
            class_name="p-5",
        ),
        rx.el.div(
            rx.el.div(
                rx.el.span(
                    "Relationship Score",
                    class_name="text-xs font-semibold text-gray-400 uppercase tracking-wider",
                ),
                rx.el.span(
                    score.to_string(),
                    class_name=rx.cond(
                        score <= -30,
                        "text-red-600 font-mono font-bold",
                        rx.cond(
                            score >= 30,
                            "text-emerald-600 font-mono font-bold",
                            "text-gray-600 font-mono font-bold",
                        ),
                    ),
                ),
                class_name="flex justify-between items-center mb-3",
            ),
            rx.el.input(
                type="range",
                default_value=score,
                min="-100",
                max="100",
                step="1",
                key=f"slider-{contact.id}",
                on_change=lambda val: RelationshipState.update_score(
                    contact.id, val.to(int)
                ).throttle(500),
                class_name=rx.cond(
                    score <= -30,
                    "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500",
                    rx.cond(
                        score >= 30,
                        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500",
                        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-500",
                    ),
                ),
            ),
            rx.el.div(
                rx.el.span("Enemy", class_name="text-[10px] text-red-400 font-medium"),
                rx.el.span(
                    "Neutral", class_name="text-[10px] text-gray-400 font-medium"
                ),
                rx.el.span(
                    "Friendly", class_name="text-[10px] text-emerald-500 font-medium"
                ),
                class_name="flex justify-between mt-2 px-1",
            ),
            class_name="bg-gray-50/80 border-t border-gray-100 p-5",
        ),
        class_name=rx.cond(
            score <= -30,
            "bg-white rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow overflow-hidden",
            rx.cond(
                score >= 30,
                "bg-white rounded-xl border-l-4 border-emerald-500 shadow-sm hover:shadow-md transition-shadow overflow-hidden",
                "bg-white rounded-xl border-l-4 border-gray-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden",
            ),
        ),
    )


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
                        rx.icon("hash", class_name="w-3 h-3 mr-1 text-gray-400"),
                        rx.el.span(
                            RelationshipState.selected_account.dynamics_account_id,
                            class_name="font-mono text-xs text-gray-500",
                        ),
                        class_name="flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-200",
                    ),
                    class_name="flex items-center",
                ),
                class_name="flex flex-col",
            ),
            rx.el.button(
                rx.icon("refresh-cw", class_name="w-4 h-4 mr-2"),
                "Sync Dynamics",
                class_name="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm",
            ),
            class_name="flex justify-between items-start",
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
                rx.cond(
                    RelationshipState.current_contacts.length() > 0,
                    rx.el.div(
                        rx.foreach(RelationshipState.current_contacts, contact_card),
                        class_name="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    ),
                    rx.el.div(
                        rx.el.p(
                            "No contacts found for this account.",
                            class_name="text-gray-400 italic",
                        ),
                        class_name="p-8 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50",
                    ),
                ),
                class_name="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[400px]",
            ),
            class_name="flex flex-col max-w-6xl mx-auto w-full p-6 sm:p-10 animation-fade-in",
        ),
        empty_state(),
    )