import {Fragment,useCallback,useContext,useEffect} from "react"
import {Briefcase as LucideBriefcase,Search as LucideSearch,Trash as LucideTrash,X as LucideX} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isTrue} from "$/utils/state"
import {Background,Controls,ReactFlow} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import {jsx} from "@emotion/react"




function Input_452760df470a3d53315c1ad7e191e6cc () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_05bcce9446d718e7a4abb4b080c17322 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.handle_search", ({ ["query"] : _e?.["target"]?.["value"] }), ({ ["debounce"] : 300 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.search_query_rx_state_,onChange:on_change_05bcce9446d718e7a4abb4b080c17322,placeholder:"Search people or companies..."},)
  )
}


function Span_aa012b7705b5ca487d3155213cb2d562 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"text-xs font-bold text-indigo-600 ml-1"},reflex___state____state__app___states___relationship_state____relationship_state.node_limit_rx_state_)
  )
}


function Input_8033b78229431018e592b9906a28309b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_843e7777a1f87d02b46b132ae024a522 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_node_limit", ({ ["limit"] : (Number(_e?.["target"]?.["value"])) }), ({ ["throttle"] : 100 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-32 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600",defaultValue:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.node_limit_rx_state_)),key:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.node_limit_rx_state_)),max:"500",min:"50",onChange:on_change_843e7777a1f87d02b46b132ae024a522,step:"50",type:"range"},)
  )
}


function Span_57919b037ee25ae10597836caec379e5 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"font-bold text-indigo-600"},(reflex___state____state__app___states___relationship_state____relationship_state.filtered_accounts_rx_state_.length + reflex___state____state__app___states___relationship_state____relationship_state.filtered_contacts_rx_state_.length))
  )
}


function Fragment_b3f9bd9690269352241f5f82277e781a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_?(jsx(Fragment,{},jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent ml-2"},))):(jsx(Fragment,{},))))
  )
}


function Input_f16de6022b1956b6a4f38d4de44d7698 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_dbb875a17bd75c23b5e5195c35e9af66 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.toggle_historic", ({ ["value"] : _e?.["target"]?.["checked"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{checked:reflex___state____state__app___states___relationship_state____relationship_state.show_historic_rx_state_,className:"sr-only peer",onChange:on_change_dbb875a17bd75c23b5e5195c35e9af66,type:"checkbox"},)
  )
}


function Button_1da96e2afebc5b22c0038e4786ab5886 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6e4a29164a2099368f62d55bc1d3507c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.clear_search", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium",onClick:on_click_6e4a29164a2099368f62d55bc1d3507c},jsx(LucideX,{className:"w-4 h-4 mr-1"},),"Clear")
  )
}


function Fragment_2942491bb2a9346893e0fd022acf9526 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__app___states___relationship_state____relationship_state.search_query_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(Button_1da96e2afebc5b22c0038e4786ab5886,{},))):(jsx(Fragment,{},))))
  )
}


function Reactflow_40ca1fb0c81b2d559ef62fc21da62f86 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_node_click_aaeec5d9b52d48064d35abcf023ce6ad = useCallback(((_event, _node) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_node_click", ({ ["node"] : _node }), ({  })))], [_event, _node], ({  })))), [addEvents, ReflexEvent])
const on_edge_click_e2f95da83301f88b1122896b4b556a07 = useCallback(((_event, _edge) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_edge_click", ({ ["edge"] : _edge }), ({  })))], [_event, _edge], ({  })))), [addEvents, ReflexEvent])
const on_connect_fa168d58d463c6a6acab4ad3b675129f = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_connect", ({ ["connection"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(ReactFlow,{className:"bg-gray-50",edges:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["edges"],edgesFocusable:true,fitView:true,fitViewOptions:({ ["padding"] : 0.2 }),maxZoom:4.0,minZoom:0.1,nodes:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["nodes"],nodesConnectable:true,nodesDraggable:true,nodesFocusable:true,onConnect:on_connect_fa168d58d463c6a6acab4ad3b675129f,onEdgeClick:on_edge_click_e2f95da83301f88b1122896b4b556a07,onNodeClick:on_node_click_aaeec5d9b52d48064d35abcf023ce6ad,panOnScroll:false,snapToGrid:false,zoomOnDoubleClick:false,zoomOnScroll:true},jsx(Background,{gap:12,size:1,variant:"dots"},),jsx(Controls,{},))
  )
}


function Button_2a72190b7b7499e0a3d0b8e22523a14e () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_480e95f021a096d625b5bcb51e7ce240 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.close_panel", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10",onClick:on_click_480e95f021a096d625b5bcb51e7ce240},jsx(LucideX,{className:"w-6 h-6"},))
  )
}


function P_e073ce3a23f8484dfb97644caa59115a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("p",{className:"text-lg font-semibold text-gray-900 mb-4 whitespace-pre-wrap"},reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["label"])
  )
}


function P_a8af4cced5cf51987e96fae843fba187 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("p",{className:"text-base text-gray-700"},reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["job"])
  )
}


function Fragment_1ebdce8ea805420f2c1e8b8fb5ac1d98 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2 shrink-0"},"Details"),jsx("div",{className:"flex-1 overflow-y-auto"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Name"),jsx(P_e073ce3a23f8484dfb97644caa59115a,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Role/Info"),jsx(P_a8af4cced5cf51987e96fae843fba187,{},))))):(jsx(Fragment,{},))))
  )
}


function Span_a75135667ce8f5f11b2403f552f90a1e () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200"},reflex___state____state__app___states___relationship_state____relationship_state.editing_relationship_type_rx_state_.toUpperCase())
  )
}


function Fragment_3a802aeca0e1069f2c7e2a8b65b7af4a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.editing_is_directed_rx_state_?(jsx(Fragment,{},jsx("span",{className:"px-2 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100"},"Directed \u2192"))):(jsx(Fragment,{},jsx("span",{className:"px-2 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100"},"Mutual \u2194")))))
  )
}


function Select_053b4d3f4dcf63589a41a708903ba045 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_2bc46e72dc1a6da1c4a1015cc06ebbad = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.handle_term_change", ({ ["new_term"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("select",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white",onChange:on_change_2bc46e72dc1a6da1c4a1015cc06ebbad,value:reflex___state____state__app___states___relationship_state____relationship_state.editing_term_rx_state_},Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.relationship_terms_rx_state_ ?? [],((t_rx_state_,index_227c17b192003fea4a65b05ac462d949)=>(jsx("option",{key:index_227c17b192003fea4a65b05ac462d949,value:t_rx_state_},t_rx_state_)))))
  )
}


function Input_e481125afc2a7eadcfae9a6f1f95c59a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f49a895f77350db311d968161329766d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_score", ({ ["value"] : (Number(_e?.["target"]?.["value"])) }), ({ ["throttle"] : 100 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4 accent-indigo-600",defaultValue:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.editing_score_rx_state_)),key:reflex___state____state__app___states___relationship_state____relationship_state.selected_edge_id_rx_state_,max:"100",min:"-100",onChange:on_change_f49a895f77350db311d968161329766d,type:"range"},)
  )
}


function Span_b05afbf33bb1f3f0340d12de6ffb8667 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"font-mono font-bold ml-1"},reflex___state____state__app___states___relationship_state____relationship_state.editing_score_rx_state_)
  )
}


function Button_3fc7ec0a8d2c7b4b2e8ed406552e17f2 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_8bba1865c705f793b46feff123127746 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.save_relationship_update", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm mb-6",onClick:on_click_8bba1865c705f793b46feff123127746},"Save Changes")
  )
}


function Fragment_88d911d463af34f7ab038870da65ebb7 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.editing_relationship_type_rx_state_?.valueOf?.() === "employment"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"bg-gray-50 rounded-lg p-6 border border-gray-100 mb-6"},jsx(LucideBriefcase,{className:"w-12 h-12 text-gray-300 mx-auto mb-3"},),jsx("p",{className:"text-center text-gray-600 font-medium mb-1"},"Employment relationships are structural links."),jsx("p",{className:"text-center text-gray-400 text-sm"},"They do not carry a sentiment score.")))):(jsx(Fragment,{},jsx("div",{className:"flex flex-col"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Nature of Relationship"),jsx(Select_053b4d3f4dcf63589a41a708903ba045,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-4 block"},"Relationship Score"),jsx("div",{className:"flex justify-between w-full mb-2 px-1"},jsx("span",{className:"text-xs font-bold text-red-500"},"-100 (Enemy)"),jsx("span",{className:"text-xs font-bold text-gray-500"},"0 (Neutral)"),jsx("span",{className:"text-xs font-bold text-green-500"},"+100 (Ally)")),jsx(Input_e481125afc2a7eadcfae9a6f1f95c59a,{},),jsx("div",{className:"text-center text-sm text-gray-600 mb-8"},"Current Score: ",jsx(Span_b05afbf33bb1f3f0340d12de6ffb8667,{},)),jsx(Button_3fc7ec0a8d2c7b4b2e8ed406552e17f2,{},))))))
  )
}


function Button_eadbddf5751c3fe57cd391dd3066d737 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_36e92fe604bb92bc8ecc130d9925c652 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.soft_delete_relationship", ({ ["rel_id"] : reflex___state____state__app___states___relationship_state____relationship_state.selected_edge_id_rx_state_.split("-")?.at?.(1) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent, reflex___state____state__app___states___relationship_state____relationship_state])

  return (
    jsx("button",{className:"w-full flex items-center justify-center bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-3 px-4 rounded-lg transition-colors",onClick:on_click_36e92fe604bb92bc8ecc130d9925c652},jsx(LucideTrash,{className:"w-4 h-4 mr-2"},),"Delete Relationship")
  )
}


function Fragment_5916e6e98a23d5c0f178f1fbe3322944 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "edge"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("div",{className:"mb-6 border-b pb-2 shrink-0"},jsx("h2",{className:"text-xl font-bold text-gray-900"},"Edit Relationship")),jsx("div",{className:"flex-1 overflow-y-auto flex flex-col"},jsx("div",{className:"mb-6 flex items-center flex-wrap gap-2"},jsx("span",{className:"text-sm font-medium text-gray-500 mr-2"},"Type:"),jsx(Span_a75135667ce8f5f11b2403f552f90a1e,{},),jsx(Fragment_3a802aeca0e1069f2c7e2a8b65b7af4a,{},)),jsx(Fragment_88d911d463af34f7ab038870da65ebb7,{},),jsx("div",{className:"mt-auto pt-4 border-t"},jsx(Button_eadbddf5751c3fe57cd391dd3066d737,{},)))))):(jsx(Fragment,{},))))
  )
}


function Div_5090dd0ec4ff2ff08d0ab9f074ec77a4 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("div",{className:(reflex___state____state__app___states___relationship_state____relationship_state.show_side_panel_rx_state_ ? "fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-0 border-l" : "fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-full border-l")},jsx(Button_2a72190b7b7499e0a3d0b8e22523a14e,{},),jsx(Fragment_1ebdce8ea805420f2c1e8b8fb5ac1d98,{},),jsx(Fragment_5916e6e98a23d5c0f178f1fbe3322944,{},))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx("div",{className:"flex h-screen w-full font-sans bg-white text-gray-900 font-['Inter'] overflow-hidden relative"},jsx("div",{className:"w-full h-full absolute inset-0"},jsx("div",{className:"absolute top-4 left-4 z-10 flex items-center gap-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500"},jsx("div",{className:"relative"},jsx(LucideSearch,{className:"w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"},),jsx(Input_452760df470a3d53315c1ad7e191e6cc,{},)),jsx("div",{className:"flex flex-col justify-center"},jsx("div",{className:"mb-1"},jsx("span",{className:"text-xs font-semibold text-gray-500 uppercase tracking-wider"},"Limit: "),jsx(Span_aa012b7705b5ca487d3155213cb2d562,{},)),jsx(Input_8033b78229431018e592b9906a28309b,{},)),jsx("div",{className:"flex items-center bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 min-w-[100px] justify-center"},jsx("div",{className:"text-sm whitespace-nowrap"},jsx(Span_57919b037ee25ae10597836caec379e5,{},),jsx("span",{className:"text-gray-500 ml-1"}," nodes")),jsx(Fragment_b3f9bd9690269352241f5f82277e781a,{},)),jsx("div",{className:"border-l pl-4 border-gray-200"},jsx("label",{className:"relative inline-flex items-center cursor-pointer"},jsx(Input_f16de6022b1956b6a4f38d4de44d7698,{},),jsx("div",{className:"w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"},),jsx("span",{className:"ml-2 text-sm font-medium text-gray-700"},"Show Historic"))),jsx(Fragment_2942491bb2a9346893e0fd022acf9526,{},)),jsx(Reactflow_40ca1fb0c81b2d559ef62fc21da62f86,{},)),jsx(Div_5090dd0ec4ff2ff08d0ab9f074ec77a4,{},)),jsx("title",{},"App | Index"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}