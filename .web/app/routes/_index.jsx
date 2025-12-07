import {Fragment,useCallback,useContext,useEffect} from "react"
import {Background,Controls,ReactFlow} from "@xyflow/react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import "@xyflow/react/dist/style.css"
import {Briefcase as LucideBriefcase,Link as LucideLink,Pencil as LucidePencil,Plus as LucidePlus,Search as LucideSearch,Trash as LucideTrash,Trash2 as LucideTrash2,Users as LucideUsers,X as LucideX} from "lucide-react"
import {jsx} from "@emotion/react"




function Reactflow_4a069fa38b67be6118fce7df5a052b66 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_node_click_aaeec5d9b52d48064d35abcf023ce6ad = useCallback(((_event, _node) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_node_click", ({ ["node"] : _node }), ({  })))], [_event, _node], ({  })))), [addEvents, ReflexEvent])
const on_edge_click_e2f95da83301f88b1122896b4b556a07 = useCallback(((_event, _edge) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_edge_click", ({ ["edge"] : _edge }), ({  })))], [_event, _edge], ({  })))), [addEvents, ReflexEvent])
const on_connect_fa168d58d463c6a6acab4ad3b675129f = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_connect", ({ ["connection"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(ReactFlow,{className:"bg-gray-50 w-full h-full",edges:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["edges"],edgesFocusable:true,fitView:true,fitViewOptions:({ ["padding"] : 0.2 }),maxZoom:4.0,minZoom:0.1,nodes:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["nodes"],nodesConnectable:true,nodesDraggable:true,nodesFocusable:true,onConnect:on_connect_fa168d58d463c6a6acab4ad3b675129f,onEdgeClick:on_edge_click_e2f95da83301f88b1122896b4b556a07,onNodeClick:on_node_click_aaeec5d9b52d48064d35abcf023ce6ad,panOnScroll:false,snapToGrid:false,zoomOnDoubleClick:false,zoomOnScroll:true},jsx(Background,{gap:12,size:1,variant:"dots"},),jsx(Controls,{},))
  )
}


function Input_1c93b2dc4949b6cf6571c26a30430a35 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_05bcce9446d718e7a4abb4b080c17322 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.handle_search", ({ ["query"] : _e?.["target"]?.["value"] }), ({ ["debounce"] : 300 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"pl-10 pr-4 py-2.5 w-full sm:w-48 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all bg-gray-50 focus:bg-white",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.search_query_rx_state_,onChange:on_change_05bcce9446d718e7a4abb4b080c17322,placeholder:"Search..."},)
  )
}


function Button_dda422988a93f45f3afdab74ae9b2194 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6e4a29164a2099368f62d55bc1d3507c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.clear_search", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100",onClick:on_click_6e4a29164a2099368f62d55bc1d3507c},jsx(LucideX,{className:"w-4 h-4"},))
  )
}


function Fragment_f97a8479340df1e212f7ed2ecc17d745 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__app___states___relationship_state____relationship_state.search_query_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(Button_dda422988a93f45f3afdab74ae9b2194,{},))):(jsx(Fragment,{},))))
  )
}


function Input_8de0c224da3c5157c3c591abcbb81f71 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_843e7777a1f87d02b46b132ae024a522 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_node_limit", ({ ["limit"] : (Number(_e?.["target"]?.["value"])) }), ({ ["throttle"] : 100 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-20 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600",defaultValue:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.node_limit_rx_state_)),key:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.node_limit_rx_state_)),max:"500",min:"50",onChange:on_change_843e7777a1f87d02b46b132ae024a522,step:"50",type:"range"},)
  )
}


function Span_57919b037ee25ae10597836caec379e5 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"font-bold text-indigo-600"},(reflex___state____state__app___states___relationship_state____relationship_state.filtered_accounts_rx_state_.length + reflex___state____state__app___states___relationship_state____relationship_state.filtered_contacts_rx_state_.length))
  )
}


function Fragment_7e9f83555c06479747385d5466defb99 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_?(jsx(Fragment,{},jsx("div",{className:"animate-spin rounded-full h-3 w-3 border-2 border-indigo-600 border-t-transparent ml-2"},))):(jsx(Fragment,{},))))
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


function Button_fb0683f843e8c094fc19cb2fe1b75ee2 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_928ccc08d030188db40bb6156b3c7ece = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.start_node_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"flex items-center justify-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-sm transition-colors text-sm h-9 shrink-0",onClick:on_click_928ccc08d030188db40bb6156b3c7ece,title:"Create New Entity"},jsx(LucidePlus,{className:"w-4 h-4 mr-2"},),jsx("span",{},"Node"))
  )
}


function Button_b2366988962a5fc89439289a79f7269b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6852d3b8a60347257df2d18475c600f7 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.start_relationship_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:((reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_?.valueOf?.() === ""?.valueOf?.()) ? "flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed h-9 shrink-0" : "flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm shadow-sm h-9 shrink-0"),disabled:(reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_?.valueOf?.() === ""?.valueOf?.()),onClick:on_click_6852d3b8a60347257df2d18475c600f7,title:((reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_?.valueOf?.() === ""?.valueOf?.()) ? "Select a node to add a link" : "Add connection")},jsx(LucideLink,{className:"w-4 h-4 mr-1.5"},),jsx("span",{},"Link"))
  )
}


function Button_f41fec4278ee4fe7f565f5973c6b58ed () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_16e3973365718bfead50c84ac563d0d6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.prepare_node_edit", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:((reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.()) ? "p-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors shadow-sm h-9 w-9 flex items-center justify-center" : "hidden"),onClick:on_click_16e3973365718bfead50c84ac563d0d6,title:"Edit Selected"},jsx(LucidePencil,{className:"w-4 h-4"},))
  )
}


function Button_ec9228d5321e54b8591c54d677480797 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_c0c083496e50484c684d9813588ecf4d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.delete_current_selection", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"p-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition-colors shadow-sm h-9 w-9 flex items-center justify-center",onClick:on_click_c0c083496e50484c684d9813588ecf4d,title:"Delete Selected"},jsx(LucideTrash2,{className:"w-4 h-4"},))
  )
}


function Fragment_8eed47756cf2d6e2478f3a09f391e035 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.show_side_panel_rx_state_?(jsx(Fragment,{},jsx("div",{className:"flex gap-2 items-center border-l border-gray-200 pl-4"},jsx(Button_f41fec4278ee4fe7f565f5973c6b58ed,{},),jsx(Button_ec9228d5321e54b8591c54d677480797,{},)))):(jsx(Fragment,{},))))
  )
}


function Input_dcce46ac7977d2aaf052d56c9249799d () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_8d6bb60c756609515dc4ef8d93729c91 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_type", ({ ["value"] : "person" }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{checked:(reflex___state____state__app___states___relationship_state____relationship_state.new_node_type_rx_state_?.valueOf?.() === "person"?.valueOf?.()),className:"w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300",name:"node_type",onChange:on_change_8d6bb60c756609515dc4ef8d93729c91,type:"radio",value:(isNotNullOrUndefined("person") ? "person" : "")},)
  )
}


function Input_e83093342e8d2b6ad5284589533e64be () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_00048bec789f6902488bc385cb9d33a5 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_type", ({ ["value"] : "company" }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{checked:(reflex___state____state__app___states___relationship_state____relationship_state.new_node_type_rx_state_?.valueOf?.() === "company"?.valueOf?.()),className:"w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300",name:"node_type",onChange:on_change_00048bec789f6902488bc385cb9d33a5,type:"radio",value:(isNotNullOrUndefined("company") ? "company" : "")},)
  )
}


function Input_a7f198916b6e93dce052e8e3b8e91c1d () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_e46a5ab368b9cb97250068cc1075cf05 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_node_name_rx_state_,onChange:on_change_e46a5ab368b9cb97250068cc1075cf05},)
  )
}


function Input_801e51edff3522473895f30b01c18364 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_4e2de07fdd3c83544bb221b5c50e533e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_last_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_node_last_name_rx_state_,onChange:on_change_4e2de07fdd3c83544bb221b5c50e533e},)
  )
}


function Input_955e1c801b030fd4488270387c702785 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_bc89abe3596bfe5b4b83da45e9338d22 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_title_or_ticker", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_node_title_or_ticker_rx_state_,onChange:on_change_bc89abe3596bfe5b4b83da45e9338d22},)
  )
}


function Fragment_976b9f06e2113fe4cb50b7ed1f18470f () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.new_node_type_rx_state_?.valueOf?.() === "person"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"First Name *"),jsx(Input_a7f198916b6e93dce052e8e3b8e91c1d,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Last Name"),jsx(Input_801e51edff3522473895f30b01c18364,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Job Title"),jsx(Input_955e1c801b030fd4488270387c702785,{},)))):(jsx(Fragment,{},jsx("div",{},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Company Name *"),jsx(Input_a7f198916b6e93dce052e8e3b8e91c1d,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Ticker / ID"),jsx(Input_955e1c801b030fd4488270387c702785,{},))))))
  )
}


function Fragment_3a84e2b498715578c2bfe0e730464bef () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_?(jsx(Fragment,{},jsx("span",{className:"animate-pulse"},"Saving..."))):(jsx(Fragment,{},"Create Entity"))))
  )
}


function Button_57f2c6f1e33c9ccf7c78aa06def76a98 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_54341ee1d6bb0baaa14876fabb7f9b85 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.save_node", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm mb-3",disabled:reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_,onClick:on_click_54341ee1d6bb0baaa14876fabb7f9b85},jsx(Fragment_3a84e2b498715578c2bfe0e730464bef,{},))
  )
}


function Button_be4b037472a5380c5da3fe731f25c023 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_3f40e4c127332733e83ea2042c15a08a = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.cancel_node_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors",onClick:on_click_3f40e4c127332733e83ea2042c15a08a},"Cancel")
  )
}


function Fragment_9d0a3a3ae2bea91f5e33c84f440fb14b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col bg-white"},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2 shrink-0"},"New Entity"),jsx("div",{className:"flex-1 overflow-y-auto mb-4 min-h-0"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Type"),jsx("div",{className:"flex gap-6 mb-6"},jsx("label",{className:"flex items-center"},jsx(Input_dcce46ac7977d2aaf052d56c9249799d,{},),jsx("span",{className:"ml-2 text-sm text-gray-700"},"Person")),jsx("label",{className:"flex items-center"},jsx(Input_e83093342e8d2b6ad5284589533e64be,{},),jsx("span",{className:"ml-2 text-sm text-gray-700"},"Company"))),jsx(Fragment_976b9f06e2113fe4cb50b7ed1f18470f,{},)),jsx("div",{className:"shrink-0 pt-4 border-t border-gray-200 bg-white mt-auto"},jsx(Button_57f2c6f1e33c9ccf7c78aa06def76a98,{},),jsx(Button_be4b037472a5380c5da3fe731f25c023,{},))))):(jsx(Fragment,{},))))
  )
}


function Input_9b7ce55fba002bb40e542856f5d65bdb () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_075fb02565090e41abe4de5b756a1410 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.filter_target_nodes", ({ ["query"] : _e?.["target"]?.["value"] }), ({ ["throttle"] : 300 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.relationship_target_search_rx_state_,onChange:on_change_075fb02565090e41abe4de5b756a1410,placeholder:"Type name..."},)
  )
}


function Div_1b6b7f11f97b60586a4824e5459910bc () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx("div",{className:"max-h-40 overflow-y-auto border border-gray-200 rounded-lg mb-4 bg-white shadow-sm"},Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.filtered_target_nodes_rx_state_ ?? [],((node_rx_state_,index_77cc4ff080025e8c59080e0c8f0d6f09)=>(jsx("button",{className:"w-full flex items-center p-2 hover:bg-indigo-50 rounded-md transition-colors text-sm border-b border-gray-50 last:border-0",key:index_77cc4ff080025e8c59080e0c8f0d6f09,onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_creation_target", ({ ["id"] : node_rx_state_?.["id"], ["type"] : node_rx_state_?.["type"], ["name"] : node_rx_state_?.["name"] }), ({  })))], [_e], ({  }))))},jsx("div",{className:"flex-1 text-left min-w-0"},jsx("span",{className:"font-medium text-gray-900 block truncate"},node_rx_state_?.["name"]),jsx("span",{className:"text-xs text-gray-500 block truncate"},node_rx_state_?.["subtitle"])),jsx("span",{className:"ml-2 text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded"},node_rx_state_?.["type"]))))))
  )
}


function Fragment_a60159d68462fd3e1368b5e20ea8a335 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.filtered_target_nodes_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Div_1b6b7f11f97b60586a4824e5459910bc,{},))):(jsx(Fragment,{},jsx("p",{className:"text-xs text-gray-400 mb-4 italic"},"Type to search for people or companies...")))))
  )
}


function Span_d08d277520988082e5dfa10e9fb24026 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"font-bold text-indigo-600"},reflex___state____state__app___states___relationship_state____relationship_state.creation_target_name_rx_state_)
  )
}


function Select_4c8b34627aa1836988326e7853c2d4bc () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f6ab86105173f9dcef0a24ba589ecfb6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_creation_term", ({ ["term"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("select",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-indigo-500 bg-white",onChange:on_change_f6ab86105173f9dcef0a24ba589ecfb6,value:reflex___state____state__app___states___relationship_state____relationship_state.creation_term_rx_state_},Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.relationship_terms_rx_state_ ?? [],((t_rx_state_,index_227c17b192003fea4a65b05ac462d949)=>(jsx("option",{key:index_227c17b192003fea4a65b05ac462d949,value:t_rx_state_},t_rx_state_)))))
  )
}


function Input_f767237f8e6da9b2a1c99fdcc153fc4b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f91f29b667a9714a08cedec9ff5dff61 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_creation_score", ({ ["score"] : (Number(_e?.["target"]?.["value"])) }), ({ ["throttle"] : 100 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2 accent-indigo-600",defaultValue:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.creation_score_rx_state_)),key:reflex___state____state__app___states___relationship_state____relationship_state.creation_term_rx_state_,max:"100",min:"-100",onChange:on_change_f91f29b667a9714a08cedec9ff5dff61,type:"range"},)
  )
}


function Div_847a01c7c74a8c6dbf44012b3caaf7b4 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("div",{className:"text-center font-mono font-bold text-gray-700 text-sm mb-6"},reflex___state____state__app___states___relationship_state____relationship_state.creation_score_rx_state_)
  )
}


function Button_9fab42aec5b8216d22c71e8721b67092 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_e0f8fb22253b5d037dd9941729908838 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.create_relationship_from_panel", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm mb-3",onClick:on_click_e0f8fb22253b5d037dd9941729908838},"Confirm Connection")
  )
}


function Fragment_879b971d5e70957c30ff1b0b4de49cce () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.creation_target_id_rx_state_?.valueOf?.() !== 0?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"animate-in fade-in slide-in-from-top-2 duration-300"},jsx("div",{className:"text-sm mb-4 p-2 bg-indigo-50 rounded-md border border-indigo-100"},jsx("span",{className:"text-gray-500 mr-2"},"Target:"),jsx(Span_d08d277520988082e5dfa10e9fb24026,{},)),jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Relationship Term"),jsx(Select_4c8b34627aa1836988326e7853c2d4bc,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Initial Score"),jsx(Input_f767237f8e6da9b2a1c99fdcc153fc4b,{},),jsx(Div_847a01c7c74a8c6dbf44012b3caaf7b4,{},),jsx(Button_9fab42aec5b8216d22c71e8721b67092,{},)))):(jsx(Fragment,{},))))
  )
}


function Button_cf5e5bfeb86941afde5ca5695f80e827 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6f05aaff6a7e17ce950405c3fec1e656 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.cancel_relationship_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors mt-auto",onClick:on_click_6f05aaff6a7e17ce950405c3fec1e656},"Cancel")
  )
}


function Fragment_d860fd4c6d998f8315e22edbbca9338a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2"},"Add Connection"),jsx("div",{className:"flex-1 overflow-y-auto flex flex-col"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Search Target Node"),jsx(Input_9b7ce55fba002bb40e542856f5d65bdb,{},),jsx(Fragment_a60159d68462fd3e1368b5e20ea8a335,{},),jsx(Fragment_879b971d5e70957c30ff1b0b4de49cce,{},),jsx(Button_cf5e5bfeb86941afde5ca5695f80e827,{},))))):(jsx(Fragment,{},))))
  )
}


function Input_78e3812f89ef3433bafcd54bf4171e3a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_12e1e069f879fbf6ba4890c6a8c23572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_node_data", ({ ["updates"] : ({ ["first_name"] : _e?.["target"]?.["value"] }) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.editing_node_data_rx_state_?.["first_name"],onChange:on_change_12e1e069f879fbf6ba4890c6a8c23572},)
  )
}


function Input_1d21a0d6f9a0919dc7473e3bb0af8707 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_3dc67a16acd2fbf95ad5a4f0faf3234d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_node_data", ({ ["updates"] : ({ ["last_name"] : _e?.["target"]?.["value"] }) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.editing_node_data_rx_state_?.["last_name"],onChange:on_change_3dc67a16acd2fbf95ad5a4f0faf3234d},)
  )
}


function Input_f7baa2195977bee39e823bc61f20cde0 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_8ed6c454a6c8d6a2ec72bc18cd124d20 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_node_data", ({ ["updates"] : ({ ["job_title"] : _e?.["target"]?.["value"] }) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6 focus:ring-2 focus:ring-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.editing_node_data_rx_state_?.["job_title"],onChange:on_change_8ed6c454a6c8d6a2ec72bc18cd124d20},)
  )
}


function Input_7e3cea86e318e0e629f04fd92c8555ee () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_395f4ed292a2542d2f88e218c46b025d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_node_data", ({ ["updates"] : ({ ["name"] : _e?.["target"]?.["value"] }) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.editing_node_data_rx_state_?.["name"],onChange:on_change_395f4ed292a2542d2f88e218c46b025d},)
  )
}


function Input_3d8dcb99b891bae0912b37a175afbc1c () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f536bce36fa9feceaa300d26d689c564 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_node_data", ({ ["updates"] : ({ ["ticker"] : _e?.["target"]?.["value"] }) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6 focus:ring-2 focus:ring-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.editing_node_data_rx_state_?.["ticker"],onChange:on_change_f536bce36fa9feceaa300d26d689c564},)
  )
}


function Fragment_ef33331c4ea73149a8831c04708f9fbf () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.editing_node_type_rx_state_?.valueOf?.() === "person"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"First Name"),jsx(Input_78e3812f89ef3433bafcd54bf4171e3a,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Last Name"),jsx(Input_1d21a0d6f9a0919dc7473e3bb0af8707,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Job Title"),jsx(Input_f7baa2195977bee39e823bc61f20cde0,{},)))):(jsx(Fragment,{},jsx("div",{},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Company Name"),jsx(Input_7e3cea86e318e0e629f04fd92c8555ee,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Ticker"),jsx(Input_3d8dcb99b891bae0912b37a175afbc1c,{},))))))
  )
}


function Fragment_4e5c11b9343b50b07ae2b435bb240494 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_?(jsx(Fragment,{},jsx("span",{className:"animate-pulse"},"Saving..."))):(jsx(Fragment,{},"Save Changes"))))
  )
}


function Button_d74149214ac81f9d2f29ad56fcd34c2b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_54341ee1d6bb0baaa14876fabb7f9b85 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.save_node", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm mb-3",disabled:reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_,onClick:on_click_54341ee1d6bb0baaa14876fabb7f9b85},jsx(Fragment_4e5c11b9343b50b07ae2b435bb240494,{},))
  )
}


function Button_184a4a0c7590e851cd2bffeef2fb13bd () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_56ad40cf7e5119e85e64a7e87b709a49 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.cancel_edit", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors mb-6",onClick:on_click_56ad40cf7e5119e85e64a7e87b709a49},"Cancel")
  )
}


function Button_fab67df1ff43c956bd47adbfd8192e0b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_493fe51a04b7fac4e197ddf82e39b774 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.delete_node", ({ ["node_id"] : reflex___state____state__app___states___relationship_state____relationship_state.editing_node_id_rx_state_, ["node_type"] : reflex___state____state__app___states___relationship_state____relationship_state.editing_node_type_rx_state_ }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent, reflex___state____state__app___states___relationship_state____relationship_state, reflex___state____state__app___states___relationship_state____relationship_state])

  return (
    jsx("button",{className:"w-full flex items-center justify-center bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2.5 px-4 rounded-lg transition-colors",onClick:on_click_493fe51a04b7fac4e197ddf82e39b774},jsx(LucideTrash2,{className:"w-4 h-4 mr-2"},),"Delete Entity")
  )
}


function Fragment_1e770ae33cc3193fe57e976208606a5e () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)) && (reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.())) && reflex___state____state__app___states___relationship_state____relationship_state.is_editing_rx_state_)?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2 shrink-0"},"Edit Entity"),jsx("div",{className:"flex-1 overflow-y-auto mb-4 min-h-0"},jsx(Fragment_ef33331c4ea73149a8831c04708f9fbf,{},)),jsx("div",{className:"shrink-0 pt-4 border-t border-gray-200 bg-white mt-auto"},jsx(Button_d74149214ac81f9d2f29ad56fcd34c2b,{},),jsx(Button_184a4a0c7590e851cd2bffeef2fb13bd,{},),jsx(Button_fab67df1ff43c956bd47adbfd8192e0b,{},))))):(jsx(Fragment,{},))))
  )
}


function Span_823b17d275118f0afdf798c2bbe13366 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full"},((reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["type"]?.valueOf?.() === "company"?.valueOf?.()) ? "Company" : "Person"))
  )
}


function P_0622292c409e6430972044ddb28956f2 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("p",{className:"text-lg font-semibold text-gray-900 mb-4 whitespace-pre-wrap"},reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["display_name"])
  )
}


function P_a3cb1af0bbb273ea14e3082bda632079 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("p",{className:"text-base text-gray-700 mb-6"},reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["job"])
  )
}


function Button_804ae62c91449f98b73138c6a7a93734 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_16e3973365718bfead50c84ac563d0d6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.prepare_node_edit", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"flex-1 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors text-sm",onClick:on_click_16e3973365718bfead50c84ac563d0d6},jsx(LucidePencil,{className:"w-4 h-4 mr-2"},),"Edit Details")
  )
}


function Button_676978fd5038044a3c5151d3c4df6d0f () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6852d3b8a60347257df2d18475c600f7 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.start_relationship_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"flex-1 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm",onClick:on_click_6852d3b8a60347257df2d18475c600f7},jsx(LucidePlus,{className:"w-4 h-4 mr-2"},),"Add Link")
  )
}


function Div_58425e3f5c129756e0cabfd3bb3ab45c () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx("div",{className:"space-y-2"},Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.active_node_relationships_rx_state_ ?? [],((item_rx_state_,index_2087ee53686e8af4cbd1c2dc5a24d794)=>(jsx("div",{className:"flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-indigo-100 transition-colors",key:index_2087ee53686e8af4cbd1c2dc5a24d794},jsx("div",{className:"flex-1 min-w-0"},jsx("p",{className:"font-medium text-gray-900 text-sm truncate"},item_rx_state_?.["connected_node_name"]),jsx("div",{className:"flex items-center mt-0.5"},jsx("span",{className:"text-[10px] font-bold tracking-wider text-gray-500 uppercase mr-2"},item_rx_state_?.["term"].toUpperCase()),jsx("span",{className:((item_rx_state_?.["type"]?.valueOf?.() === "employment"?.valueOf?.()) ? "px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200" : ("px-1.5 py-0.5 rounded text-[10px] font-semibold "+item_rx_state_?.["badge_class"]))},((item_rx_state_?.["type"]?.valueOf?.() === "employment"?.valueOf?.()) ? "Struct." : (JSON.stringify(item_rx_state_?.["score"])))))),jsx("button",{className:"p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.soft_delete_relationship", ({ ["rel_id"] : item_rx_state_?.["relationship_id"] }), ({  })))], [_e], ({  }))))},jsx(LucideTrash,{className:"w-3.5 h-3.5"},)))))))
  )
}


function Fragment_300e8c2af4dd1372bc3477019326e05c () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.active_node_relationships_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Div_58425e3f5c129756e0cabfd3bb3ab45c,{},))):(jsx(Fragment,{},jsx("div",{className:"py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200"},jsx(LucideUsers,{className:"w-8 h-8 text-gray-300 mb-2 mx-auto"},),jsx("p",{className:"text-sm text-gray-400 text-center"},"No active connections"))))))
  )
}


function Input_37b0e791659245d96e21b6265c32c56b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("input",{className:"w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 bg-gray-50 text-gray-600 cursor-not-allowed",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["last_modified_by"],key:((JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_))+"_mod_by"),readOnly:true},)
  )
}


function Input_27cd45ed4f28943c349a95bcfdfdcbcf () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("input",{className:"w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 bg-gray-50 text-gray-600 cursor-not-allowed",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["operation_type"],key:((JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_))+"_op_type"),readOnly:true},)
  )
}


function Input_de89f4bb91b03033f0f01aab29436c97 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("input",{className:"w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600 cursor-not-allowed",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.selected_node_data_rx_state_?.["updated_at"],key:((JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_))+"_ts"),readOnly:true},)
  )
}


function Button_3515c5f8f92f1171c390463e72ffae39 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_c0c083496e50484c684d9813588ecf4d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.delete_current_selection", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full flex items-center justify-center bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2.5 px-4 rounded-lg transition-colors",onClick:on_click_c0c083496e50484c684d9813588ecf4d},jsx(LucideTrash2,{className:"w-4 h-4 mr-2"},),"Delete Entity")
  )
}


function Fragment_ed976ff1e6b0adeda690fb519ab1a4fc () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)) && (reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.())) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_editing_rx_state_))?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("div",{className:"flex items-center justify-between mb-6 border-b pb-2 shrink-0"},jsx("h2",{className:"text-xl font-bold text-gray-900"},"Details"),jsx(Span_823b17d275118f0afdf798c2bbe13366,{},)),jsx("div",{className:"flex-1 overflow-y-auto min-h-0 mb-4"},jsx("div",{className:"shrink-0"},jsx("label",{className:"text-xs font-bold text-gray-400 uppercase mb-1 block"},"Name"),jsx(P_0622292c409e6430972044ddb28956f2,{},),jsx("label",{className:"text-xs font-bold text-gray-400 uppercase mb-1 block"},"Role / Info"),jsx(P_a3cb1af0bbb273ea14e3082bda632079,{},),jsx("div",{className:"flex gap-3 mb-8"},jsx(Button_804ae62c91449f98b73138c6a7a93734,{},),jsx(Button_676978fd5038044a3c5151d3c4df6d0f,{},))),jsx("div",{className:"flex-1 mb-4"},jsx("h3",{className:"text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"},"Connections"),jsx(Fragment_300e8c2af4dd1372bc3477019326e05c,{},))),jsx("div",{className:"shrink-0 pt-4 border-t border-gray-200 bg-white mt-auto"},jsx("div",{className:"border-t border-gray-200 my-4"},),jsx("div",{className:"shrink-0 mb-6"},jsx("h3",{className:"text-sm font-bold text-gray-900 mb-4"},"Record Metadata"),jsx("label",{className:"text-xs font-medium text-gray-500 mb-1 block"},"Modified By"),jsx(Input_37b0e791659245d96e21b6265c32c56b,{},),jsx("label",{className:"text-xs font-medium text-gray-500 mb-1 block"},"Operation Type"),jsx(Input_27cd45ed4f28943c349a95bcfdfdcbcf,{},),jsx("label",{className:"text-xs font-medium text-gray-500 mb-1 block"},"Last Updated"),jsx(Input_de89f4bb91b03033f0f01aab29436c97,{},)),jsx(Button_3515c5f8f92f1171c390463e72ffae39,{},))))):(jsx(Fragment,{},))))
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


function Fragment_fae5bd58257b0d36b4df7c913455e174 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)) && (reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "edge"?.valueOf?.()))?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("div",{className:"mb-6 border-b pb-2 shrink-0"},jsx("h2",{className:"text-xl font-bold text-gray-900"},"Edit Relationship")),jsx("div",{className:"flex-1 overflow-y-auto flex flex-col"},jsx("div",{className:"mb-6 flex items-center flex-wrap gap-2"},jsx("span",{className:"text-sm font-medium text-gray-500 mr-2"},"Type:"),jsx(Span_a75135667ce8f5f11b2403f552f90a1e,{},),jsx(Fragment_3a802aeca0e1069f2c7e2a8b65b7af4a,{},)),jsx(Fragment_88d911d463af34f7ab038870da65ebb7,{},),jsx("div",{className:"mt-auto pt-4 border-t"},jsx(Button_eadbddf5751c3fe57cd391dd3066d737,{},)))))):(jsx(Fragment,{},))))
  )
}


function Aside_cf1b53b6d2179b13c81d42e578355261 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("aside",{"aria-label":"Side Panel",className:(reflex___state____state__app___states___relationship_state____relationship_state.show_side_panel_rx_state_ ? "fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-[10000] transform transition-transform duration-300 ease-in-out translate-x-0 border-l border-gray-200 flex flex-col" : "fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-[10000] transform transition-transform duration-300 ease-in-out translate-x-full border-l border-gray-200 flex flex-col")},jsx("div",{className:"flex-1 w-full h-full bg-white relative z-50"},jsx(Fragment_9d0a3a3ae2bea91f5e33c84f440fb14b,{},),jsx(Fragment_d860fd4c6d998f8315e22edbbca9338a,{},),jsx(Fragment_1e770ae33cc3193fe57e976208606a5e,{},),jsx(Fragment_ed976ff1e6b0adeda690fb519ab1a4fc,{},),jsx(Fragment_fae5bd58257b0d36b4df7c913455e174,{},)))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx("div",{className:"relative h-screen w-full font-sans bg-white text-gray-900 font-['Inter'] overflow-hidden"},jsx("div",{className:"absolute inset-0 z-0 w-full h-full"},jsx("div",{className:"w-full h-full relative"},jsx(Reactflow_4a069fa38b67be6118fce7df5a052b66,{},),jsx("div",{className:"absolute top-4 left-4 z-[500] flex flex-wrap items-center gap-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-gray-200/50 max-w-[90vw]"},jsx("div",{className:"relative flex-shrink-0"},jsx(LucideSearch,{className:"w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"},),jsx(Input_1c93b2dc4949b6cf6571c26a30430a35,{},),jsx(Fragment_f97a8479340df1e212f7ed2ecc17d745,{},)),jsx("div",{className:"flex flex-col justify-center"},jsx("span",{className:"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5"},"LIMIT"),jsx(Input_8de0c224da3c5157c3c591abcbb81f71,{},)),jsx("div",{className:"flex items-center bg-gray-50 px-3 py-1 rounded border border-gray-100 min-w-[70px] justify-center h-9"},jsx(Span_57919b037ee25ae10597836caec379e5,{},),jsx("span",{className:"text-xs text-gray-500 ml-1"},"nodes"),jsx(Fragment_7e9f83555c06479747385d5466defb99,{},)),jsx("label",{className:"relative inline-flex items-center cursor-pointer h-9"},jsx(Input_f16de6022b1956b6a4f38d4de44d7698,{},),jsx("div",{className:"w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"},),jsx("span",{className:"ml-2 text-xs font-semibold text-gray-600 select-none hidden sm:block"},"History")),jsx("div",{className:"flex items-center gap-2 border-l border-gray-200 pl-4"},jsx(Button_fb0683f843e8c094fc19cb2fe1b75ee2,{},),jsx(Button_b2366988962a5fc89439289a79f7269b,{},)),jsx(Fragment_8eed47756cf2d6e2478f3a09f391e035,{},)))),jsx(Aside_cf1b53b6d2179b13c81d42e578355261,{},)),jsx("title",{},"App | Index"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}