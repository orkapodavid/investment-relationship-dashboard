import reflex as rx
from app.states.relationship_state import RelationshipState
from app.models import Contact, Relationship, RelationshipLog


def add_contact_modal() -> rx.Component:
    return rx.cond(
        RelationshipState.show_add_contact_modal,
        rx.el.div(
            rx.el.div(
                rx.el.div(
                    rx.el.h2(
                        "Add New Contact",
                        class_name="text-xl font-bold text-gray-900 mb-4",
                    ),
                    rx.el.div(
                        rx.el.label(
                            "First Name",
                            class_name="block text-sm font-medium text-gray-700 mb-1",
                        ),
                        rx.el.input(
                            placeholder="e.g. John",
                            on_change=RelationshipState.set_new_contact_first_name,
                            class_name="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                            default_value=RelationshipState.new_contact_first_name,
                        ),
                        class_name="mb-4",
                    ),
                    rx.el.div(
                        rx.el.label(
                            "Last Name",
                            class_name="block text-sm font-medium text-gray-700 mb-1",
                        ),
                        rx.el.input(
                            placeholder="e.g. Doe",
                            on_change=RelationshipState.set_new_contact_last_name,
                            class_name="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                            default_value=RelationshipState.new_contact_last_name,
                        ),
                        class_name="mb-4",
                    ),
                    rx.el.div(
                        rx.el.label(
                            "Job Title",
                            class_name="block text-sm font-medium text-gray-700 mb-1",
                        ),
                        rx.el.input(
                            placeholder="e.g. Portfolio Manager",
                            on_change=RelationshipState.set_new_contact_job_title,
                            class_name="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                            default_value=RelationshipState.new_contact_job_title,
                        ),
                        class_name="mb-6",
                    ),
                    rx.el.div(
                        rx.el.button(
                            "Cancel",
                            on_click=RelationshipState.toggle_add_contact_modal,
                            class_name="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 mr-3",
                        ),
                        rx.el.button(
                            "Add Contact",
                            on_click=RelationshipState.add_contact,
                            class_name="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700",
                        ),
                        class_name="flex justify-end",
                    ),
                    class_name="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl",
                ),
                class_name="fixed inset-0 flex items-center justify-center z-50 p-4",
            ),
            rx.el.div(
                class_name="fixed inset-0 bg-black/50 backdrop-blur-sm z-40",
                on_click=RelationshipState.toggle_add_contact_modal,
            ),
            class_name="fixed inset-0 z-50 overflow-y-auto",
        ),
        rx.el.div(),
    )


def history_item(log: RelationshipLog) -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.el.div(
                rx.el.span(
                    log.changed_at.to_string(),
                    class_name="text-[10px] text-gray-400 font-mono",
                ),
                rx.el.div(
                    rx.el.span(
                        log.previous_score.to_string(),
                        class_name="text-xs text-gray-500",
                    ),
                    rx.icon("arrow-right", class_name="w-3 h-3 text-gray-400 mx-1"),
                    rx.el.span(
                        log.new_score.to_string(),
                        class_name=rx.cond(
                            log.new_score > log.previous_score,
                            "text-xs font-bold text-emerald-600",
                            rx.cond(
                                log.new_score < log.previous_score,
                                "text-xs font-bold text-red-600",
                                "text-xs font-bold text-gray-600",
                            ),
                        ),
                    ),
                    class_name="flex items-center",
                ),
                class_name="flex justify-between items-center mb-1",
            ),
            rx.cond(
                log.note,
                rx.el.p(
                    log.note,
                    class_name="text-xs text-gray-700 italic bg-gray-50 p-2 rounded border border-gray-100",
                ),
            ),
            class_name="flex flex-col w-full",
        ),
        class_name="py-2 border-b border-gray-100 last:border-0",
    )


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
                        class_name="font-bold text-gray-900 text-base",
                    ),
                    rx.el.p(
                        contact.job_title,
                        class_name="text-sm text-gray-500 font-medium truncate",
                    ),
                    class_name="flex flex-col min-w-0 flex-1 mr-2",
                ),
                rx.el.div(
                    get_sentiment_label(score),
                    class_name=rx.cond(
                        score <= -30,
                        "px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 shrink-0",
                        rx.cond(
                            score >= 30,
                            "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 shrink-0",
                            "px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 shrink-0",
                        ),
                    ),
                ),
                class_name="flex justify-between items-start mb-4",
            ),
            class_name="p-4",
        ),
        rx.el.div(
            rx.el.div(
                rx.el.span(
                    "Relationship Score",
                    class_name="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2",
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
                class_name="flex justify-between items-center",
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
                    "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500 mb-2",
                    rx.cond(
                        score >= 30,
                        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-2",
                        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-500 mb-2",
                    ),
                ),
            ),
            rx.el.div(
                rx.el.input(
                    placeholder="Add note for update...",
                    on_change=lambda val: RelationshipState.set_contact_note(
                        contact.id, val
                    ),
                    class_name="w-48 text-xs px-2 py-1 bg-white border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 outline-none mb-3",
                    default_value=RelationshipState.contact_notes[contact.id],
                ),
                rx.el.div(
                    rx.el.span(
                        "Enemy", class_name="text-[10px] text-red-400 font-medium"
                    ),
                    rx.el.span(
                        "Neutral", class_name="text-[10px] text-gray-400 font-medium"
                    ),
                    rx.el.span(
                        "Friendly",
                        class_name="text-[10px] text-emerald-500 font-medium",
                    ),
                    class_name="flex justify-between px-1",
                ),
            ),
            class_name="bg-gray-50/80 border-t border-gray-100 p-4",
        ),
        rx.el.div(
            rx.el.button(
                rx.cond(
                    RelationshipState.expanded_contact_ids.contains(contact.id),
                    rx.el.span("Hide History", class_name="text-xs font-semibold"),
                    rx.el.span("Show History", class_name="text-xs font-semibold"),
                ),
                rx.icon("history", class_name="w-3 h-3 ml-2"),
                on_click=lambda: RelationshipState.toggle_contact_history(contact.id),
                class_name="w-full flex items-center justify-center py-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 transition-colors border-t border-gray-100",
            ),
            rx.cond(
                RelationshipState.expanded_contact_ids.contains(contact.id),
                rx.el.div(
                    rx.cond(
                        contact.relationship.logs.length() > 0,
                        rx.el.div(
                            rx.foreach(
                                contact.relationship.logs.reverse(), history_item
                            ),
                            class_name="max-h-48 overflow-y-auto custom-scrollbar",
                        ),
                        rx.el.p(
                            "No history recorded.",
                            class_name="text-xs text-gray-400 text-center py-4",
                        ),
                    ),
                    class_name="p-4 bg-gray-50 border-t border-gray-100",
                ),
            ),
            class_name="bg-white rounded-b-xl",
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
            rx.el.div(
                rx.el.button(
                    rx.icon("plus", class_name="w-4 h-4 mr-2"),
                    "Add Contact",
                    on_click=RelationshipState.toggle_add_contact_modal,
                    class_name="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm mr-2",
                ),
                rx.el.button(
                    rx.icon("refresh-cw", class_name="w-4 h-4 mr-2"),
                    "Sync Dynamics",
                    class_name="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm",
                ),
                class_name="flex items-center",
            ),
            class_name="flex justify-between items-start",
        ),
        class_name="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6",
    )


def account_view() -> rx.Component:
    return rx.cond(
        RelationshipState.selected_account,
        rx.el.div(
            add_contact_modal(),
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