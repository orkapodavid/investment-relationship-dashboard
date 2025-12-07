import {Fragment,useCallback,useContext,useEffect} from "react"
import {ArrowRight as LucideArrowRight,Building2 as LucideBuilding2,ChartSpline as LucideChartSpline,ChevronRight as LucideChevronRight,Hash as LucideHash,History as LucideHistory,Plus as LucidePlus,RefreshCw as LucideRefreshCw,Search as LucideSearch,Users as LucideUsers} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isTrue} from "$/utils/state"
import {jsx} from "@emotion/react"




function Input_ec589285f77f0140cb0d88662076b28d () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_957276e5abe2d977474195e204c3fce4 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_search_query", ({ ["query"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.search_query_rx_state_,onChange:on_change_957276e5abe2d977474195e204c3fce4,placeholder:"Search accounts or tickers..."},)
  )
}


function Div_746cdcab1a4c26d53b4e016891eb7879 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx("div",{className:"flex-1 overflow-y-auto p-4 custom-scrollbar"},jsx("p",{className:"text-xs font-semibold text-gray-400 mb-3 px-2 tracking-wider"},"ACCOUNTS"),Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.filtered_accounts_rx_state_ ?? [],((account_rx_state_,index_7467302fdeb35379e3dac5a21ec8a995)=>(jsx("div",{className:((reflex___state____state__app___states___relationship_state____relationship_state.selected_account_rx_state_?.["id"]?.valueOf?.() === account_rx_state_?.["id"]?.valueOf?.()) ? "flex items-center justify-between p-3 rounded-xl bg-indigo-50 border border-indigo-100 cursor-pointer mb-2 transition-all duration-200 shadow-sm" : "flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer mb-2 border border-transparent hover:border-gray-200 transition-all duration-200 group"),key:index_7467302fdeb35379e3dac5a21ec8a995,onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.select_account", ({ ["account"] : account_rx_state_ }), ({  })))], [_e], ({  }))))},jsx("div",{className:"flex items-center"},jsx("span",{className:"text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md mr-3 min-w-[3rem] text-center"},account_rx_state_?.["ticker"]),jsx("span",{className:((reflex___state____state__app___states___relationship_state____relationship_state.selected_account_rx_state_?.["id"]?.valueOf?.() === account_rx_state_?.["id"]?.valueOf?.()) ? "font-semibold text-indigo-900" : "font-medium text-gray-700 group-hover:text-gray-900")},account_rx_state_?.["name"])),jsx(LucideChevronRight,{className:((reflex___state____state__app___states___relationship_state____relationship_state.selected_account_rx_state_?.["id"]?.valueOf?.() === account_rx_state_?.["id"]?.valueOf?.()) ? "w-4 h-4 text-indigo-500 opacity-100" : "w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity")},))))))
  )
}


function Input_c75b1664fde7ff4692b791c1f4202e7f () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_9026db8aa883df875ed09092360c0190 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_contact_first_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_contact_first_name_rx_state_,onChange:on_change_9026db8aa883df875ed09092360c0190,placeholder:"e.g. John"},)
  )
}


function Input_3fe7b5ea99b3373e251d113315df4fd4 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_56dced9cc72ab08efeaabd79711719db = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_contact_last_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_contact_last_name_rx_state_,onChange:on_change_56dced9cc72ab08efeaabd79711719db,placeholder:"e.g. Doe"},)
  )
}


function Input_956fda2d27f3d9a4ada6c57d13be6983 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_95786d31b54cc87e78267332cf0b924c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_contact_job_title", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_contact_job_title_rx_state_,onChange:on_change_95786d31b54cc87e78267332cf0b924c,placeholder:"e.g. Portfolio Manager"},)
  )
}


function Button_88244945671389a31e0dc5d6a10e863d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_bf6fb8aaeac4c17e96aa22a862709236 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.toggle_add_contact_modal", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 mr-3",onClick:on_click_bf6fb8aaeac4c17e96aa22a862709236},"Cancel")
  )
}


function Button_d66ab26b7611666ab3d8c02bcbe3ac2e () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_580dbf59bb1f85837fdbb8a547cba43b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.add_contact", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700",onClick:on_click_580dbf59bb1f85837fdbb8a547cba43b},"Add Contact")
  )
}


function Div_7a022291449113c3a68f45a4aa7d2e6b () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_bf6fb8aaeac4c17e96aa22a862709236 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.toggle_add_contact_modal", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("div",{className:"fixed inset-0 bg-black/50 backdrop-blur-sm z-40",onClick:on_click_bf6fb8aaeac4c17e96aa22a862709236},)
  )
}


function Fragment_0c3391124c2611b5a8c6a43b66b37e8a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.show_add_contact_modal_rx_state_?(jsx(Fragment,{},jsx("div",{className:"fixed inset-0 z-50 overflow-y-auto"},jsx("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4"},jsx("div",{className:"bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"},jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4"},"Add New Contact"),jsx("div",{className:"mb-4"},jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1"},"First Name"),jsx(Input_c75b1664fde7ff4692b791c1f4202e7f,{},)),jsx("div",{className:"mb-4"},jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1"},"Last Name"),jsx(Input_3fe7b5ea99b3373e251d113315df4fd4,{},)),jsx("div",{className:"mb-6"},jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1"},"Job Title"),jsx(Input_956fda2d27f3d9a4ada6c57d13be6983,{},)),jsx("div",{className:"flex justify-end"},jsx(Button_88244945671389a31e0dc5d6a10e863d,{},),jsx(Button_d66ab26b7611666ab3d8c02bcbe3ac2e,{},)))),jsx(Div_7a022291449113c3a68f45a4aa7d2e6b,{},)))):(jsx(Fragment,{},jsx("div",{},)))))
  )
}


function H1_a8a091638feff77fdf6c8e794b9a9dbf () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2"},reflex___state____state__app___states___relationship_state____relationship_state.selected_account_rx_state_?.["name"])
  )
}


function Span_d0792f20b5dd2ef8547f1bdf37cf8caa () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold mr-3"},reflex___state____state__app___states___relationship_state____relationship_state.selected_account_rx_state_?.["ticker"])
  )
}


function Span_b3488b4b55e39b50b6622be669caca93 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"font-mono text-xs text-gray-500"},reflex___state____state__app___states___relationship_state____relationship_state.selected_account_rx_state_?.["dynamics_account_id"])
  )
}


function Button_d88c5f162c63e9deae662c4303fc105a () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_bf6fb8aaeac4c17e96aa22a862709236 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.toggle_add_contact_modal", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm mr-2",onClick:on_click_bf6fb8aaeac4c17e96aa22a862709236},jsx(LucidePlus,{className:"w-4 h-4 mr-2"},),"Add Contact")
  )
}


function Div_9bac4d7d42af2a4d3bbbab8fb599059f () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.current_contacts_rx_state_ ?? [],((contact_rx_state_,index_7bd2c0a7d43a38e76c7366047be94cda)=>(jsx("div",{className:((contact_rx_state_?.["relationship"]?.["score"] <= -30) ? "bg-white rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow overflow-hidden" : ((contact_rx_state_?.["relationship"]?.["score"] >= 30) ? "bg-white rounded-xl border-l-4 border-emerald-500 shadow-sm hover:shadow-md transition-shadow overflow-hidden" : "bg-white rounded-xl border-l-4 border-gray-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden")),key:index_7bd2c0a7d43a38e76c7366047be94cda},jsx("div",{className:"p-5"},jsx("div",{className:"flex justify-between items-start mb-4"},jsx("div",{className:"flex flex-col"},jsx("h4",{className:"font-bold text-gray-900 text-lg"},(contact_rx_state_?.["first_name"]+" "+contact_rx_state_?.["last_name"])),jsx("p",{className:"text-sm text-gray-500 font-medium"},contact_rx_state_?.["job_title"])),jsx("div",{className:((contact_rx_state_?.["relationship"]?.["score"] <= -30) ? "px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700" : ((contact_rx_state_?.["relationship"]?.["score"] >= 30) ? "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700" : "px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700"))},((contact_rx_state_?.["relationship"]?.["score"] <= -30) ? "Hostile" : ((contact_rx_state_?.["relationship"]?.["score"] >= 30) ? "Friendly" : "Indifferent"))))),jsx("div",{className:"bg-gray-50/80 border-t border-gray-100 p-5"},jsx("div",{className:"flex justify-between items-center mb-3"},jsx("span",{className:"text-xs font-semibold text-gray-400 uppercase tracking-wider"},"Relationship Score"),jsx("span",{className:((contact_rx_state_?.["relationship"]?.["score"] <= -30) ? "text-red-600 font-mono font-bold" : ((contact_rx_state_?.["relationship"]?.["score"] >= 30) ? "text-emerald-600 font-mono font-bold" : "text-gray-600 font-mono font-bold"))},(JSON.stringify(contact_rx_state_?.["relationship"]?.["score"])))),jsx("input",{className:((contact_rx_state_?.["relationship"]?.["score"] <= -30) ? "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500 mb-4" : ((contact_rx_state_?.["relationship"]?.["score"] >= 30) ? "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-4" : "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-500 mb-4")),defaultValue:contact_rx_state_?.["relationship"]?.["score"],key:("slider-"+contact_rx_state_?.["id"]),max:"100",min:"-100",onChange:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.update_score", ({ ["contact_id"] : contact_rx_state_?.["id"], ["new_score"] : (Number(_e?.["target"]?.["value"])) }), ({ ["throttle"] : 500 })))], [_e], ({  })))),step:"1",type:"range"},),jsx("div",{},jsx("input",{className:"w-full text-xs px-2 py-1 bg-white border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 outline-none mb-3",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.contact_notes_rx_state_?.[contact_rx_state_?.["id"]],onChange:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_contact_note", ({ ["contact_id"] : contact_rx_state_?.["id"], ["note"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))),placeholder:"Add note for update..."},),jsx("div",{className:"flex justify-between px-1"},jsx("span",{className:"text-[10px] text-red-400 font-medium"},"Enemy"),jsx("span",{className:"text-[10px] text-gray-400 font-medium"},"Neutral"),jsx("span",{className:"text-[10px] text-emerald-500 font-medium"},"Friendly")))),jsx("div",{className:"bg-white rounded-b-xl"},jsx("button",{className:"w-full flex items-center justify-center py-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 transition-colors border-t border-gray-100",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.toggle_contact_history", ({ ["contact_id"] : contact_rx_state_?.["id"] }), ({  })))], [_e], ({  }))))},jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.expanded_contact_ids_rx_state_.includes(contact_rx_state_?.["id"])?(jsx(Fragment,{},jsx("span",{className:"text-xs font-semibold"},"Hide History"))):(jsx(Fragment,{},jsx("span",{className:"text-xs font-semibold"},"Show History"))))),jsx(LucideHistory,{className:"w-3 h-3 ml-2"},)),jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.expanded_contact_ids_rx_state_.includes(contact_rx_state_?.["id"])?(jsx(Fragment,{},jsx("div",{className:"p-4 bg-gray-50 border-t border-gray-100"},jsx(Fragment,{},((contact_rx_state_?.["relationship"]?.["logs"].length > 0)?(jsx(Fragment,{},jsx("div",{className:"max-h-48 overflow-y-auto custom-scrollbar"},Array.prototype.map.call(contact_rx_state_?.["relationship"]?.["logs"].slice().reverse() ?? [],((log_rx_state_,index_e82a44fcde49166e9f25376d2305a365)=>(jsx("div",{className:"py-2 border-b border-gray-100 last:border-0",key:index_e82a44fcde49166e9f25376d2305a365},jsx("div",{className:"flex flex-col w-full"},jsx("div",{className:"flex justify-between items-center mb-1"},jsx("span",{className:"text-[10px] text-gray-400 font-mono"},(JSON.stringify(log_rx_state_?.["changed_at"]))),jsx("div",{className:"flex items-center"},jsx("span",{className:"text-xs text-gray-500"},(JSON.stringify(log_rx_state_?.["previous_score"]))),jsx(LucideArrowRight,{className:"w-3 h-3 text-gray-400 mx-1"},),jsx("span",{className:((log_rx_state_?.["new_score"] > log_rx_state_?.["previous_score"]) ? "text-xs font-bold text-emerald-600" : ((log_rx_state_?.["new_score"] < log_rx_state_?.["previous_score"]) ? "text-xs font-bold text-red-600" : "text-xs font-bold text-gray-600"))},(JSON.stringify(log_rx_state_?.["new_score"]))))),jsx(Fragment,{},(isTrue(log_rx_state_?.["note"])?(jsx(Fragment,{},jsx("p",{className:"text-xs text-gray-700 italic bg-gray-50 p-2 rounded border border-gray-100"},log_rx_state_?.["note"]))):(jsx(Fragment,{},)))))))))))):(jsx(Fragment,{},jsx("p",{className:"text-xs text-gray-400 text-center py-4"},"No history recorded.")))))))):(jsx(Fragment,{},))))))))))
  )
}


function Fragment_c31c8f7c8dd1c0a7e149914ac27a5fcf () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.current_contacts_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Div_9bac4d7d42af2a4d3bbbab8fb599059f,{},))):(jsx(Fragment,{},jsx("div",{className:"p-8 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50"},jsx("p",{className:"text-gray-400 italic"},"No contacts found for this account."))))))
  )
}


function Fragment_e64a5861743e27a11e124ea64f576cd4 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(isTrue(reflex___state____state__app___states___relationship_state____relationship_state.selected_account_rx_state_)?(jsx(Fragment,{},jsx("div",{className:"flex flex-col max-w-6xl mx-auto w-full p-6 sm:p-10 animation-fade-in"},jsx(Fragment_0c3391124c2611b5a8c6a43b66b37e8a,{},),jsx("div",{className:"bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6"},jsx("div",{className:"flex justify-between items-start"},jsx("div",{className:"flex flex-col"},jsx(H1_a8a091638feff77fdf6c8e794b9a9dbf,{},),jsx("div",{className:"flex items-center"},jsx(Span_d0792f20b5dd2ef8547f1bdf37cf8caa,{},),jsx("span",{className:"flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-200"},jsx(LucideHash,{className:"w-3 h-3 mr-1 text-gray-400"},),jsx(Span_b3488b4b55e39b50b6622be669caca93,{},)))),jsx("div",{className:"flex items-center"},jsx(Button_d88c5f162c63e9deae662c4303fc105a,{},),jsx("button",{className:"flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"},jsx(LucideRefreshCw,{className:"w-4 h-4 mr-2"},),"Sync Dynamics")))),jsx("div",{className:"bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[400px]"},jsx("div",{className:"flex items-center mb-4"},jsx(LucideUsers,{className:"w-5 h-5 text-gray-400 mr-2"},),jsx("h3",{className:"text-lg font-semibold text-gray-900"},"Key Contacts")),jsx(Fragment_c31c8f7c8dd1c0a7e149914ac27a5fcf,{},))))):(jsx(Fragment,{},jsx("div",{className:"flex-1 flex items-center justify-center h-full bg-gray-50/50"},jsx("div",{className:"text-center"},jsx(LucideBuilding2,{className:"w-16 h-16 text-gray-200 mb-4"},),jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2"},"No Account Selected"),jsx("p",{className:"text-gray-500 max-w-sm mx-auto"},"Select an account from the sidebar to view details and manage relationships.")))))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx("div",{className:"flex h-screen w-full font-sans bg-white text-gray-900 font-['Inter']"},jsx("aside",{className:"w-80 h-screen flex flex-col bg-white border-r border-gray-200 shadow-xl z-10"},jsx("div",{className:"p-6 border-b border-gray-100 bg-white"},jsx("div",{className:"flex items-center mb-6"},jsx(LucideChartSpline,{className:"w-6 h-6 text-indigo-600 mr-2"},),jsx("h1",{className:"text-xl font-bold text-gray-900 tracking-tight"},"RelMngr")),jsx("div",{className:"relative mb-6"},jsx(LucideSearch,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"},),jsx(Input_ec589285f77f0140cb0d88662076b28d,{},))),jsx(Div_746cdcab1a4c26d53b4e016891eb7879,{},),jsx("div",{className:"p-4 border-t border-gray-100 bg-gray-50"},jsx("div",{className:"flex items-center"},jsx("div",{className:"w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs mr-3"},jsx("span",{},"PM")),jsx("div",{className:"flex flex-col"},jsx("p",{className:"text-sm font-medium text-gray-900"},"Portfolio Manager"),jsx("p",{className:"text-xs text-gray-500"},"admin@fund.com"))))),jsx("main",{className:"flex-1 h-screen overflow-y-auto bg-gray-50/30"},jsx(Fragment_e64a5861743e27a11e124ea64f576cd4,{},))),jsx("title",{},"App | Index"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}