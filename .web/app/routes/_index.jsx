import {Fragment,useCallback,useContext,useEffect} from "react"
import {Briefcase as LucideBriefcase,Link as LucideLink,Network as LucideNetwork,Pencil as LucidePencil,Plus as LucidePlus,Search as LucideSearch,Trash as LucideTrash,Trash2 as LucideTrash2,Users as LucideUsers,X as LucideX} from "lucide-react"
import {Background,Controls,ReactFlow} from "@xyflow/react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import "@xyflow/react/dist/style.css"
import {Drawer as VaulDrawer} from "vaul"
import {Theme as RadixThemesTheme} from "@radix-ui/themes"
import theme from "$/utils/theme"
import {jsx} from "@emotion/react"




function Reactflow_90728f4e1fddeb3e03299f13d7dc7da1 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_nodes_change_261f9ed27d4adef0255f83998c49f8e6 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_nodes_change", ({ ["changes"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])
const on_edges_change_810a8c315930f759f969bafb17bea711 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_edges_change", ({ ["changes"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])
const on_viewport_change_1ecb808a120917d26638f25407698d79 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_viewport_change", ({ ["viewport"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])
const on_node_click_aaeec5d9b52d48064d35abcf023ce6ad = useCallback(((_event, _node) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_node_click", ({ ["node"] : _node }), ({  })))], [_event, _node], ({  })))), [addEvents, ReflexEvent])
const on_edge_click_e2f95da83301f88b1122896b4b556a07 = useCallback(((_event, _edge) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_edge_click", ({ ["edge"] : _edge }), ({  })))], [_event, _edge], ({  })))), [addEvents, ReflexEvent])
const on_connect_fa168d58d463c6a6acab4ad3b675129f = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_connect", ({ ["connection"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(ReactFlow,{className:"bg-gray-50 w-full h-full",edges:reflex___state____state__app___states___relationship_state____relationship_state.edges_rx_state_,edgesFocusable:true,fitView:true,fitViewOptions:({ ["padding"] : 0.2 }),maxZoom:4.0,minZoom:0.1,nodes:reflex___state____state__app___states___relationship_state____relationship_state.nodes_rx_state_,nodesConnectable:true,nodesDraggable:true,nodesFocusable:true,onConnect:on_connect_fa168d58d463c6a6acab4ad3b675129f,onEdgeClick:on_edge_click_e2f95da83301f88b1122896b4b556a07,onEdgesChange:on_edges_change_810a8c315930f759f969bafb17bea711,onNodeClick:on_node_click_aaeec5d9b52d48064d35abcf023ce6ad,onNodesChange:on_nodes_change_261f9ed27d4adef0255f83998c49f8e6,onViewportChange:on_viewport_change_1ecb808a120917d26638f25407698d79,panOnScroll:false,snapToGrid:false,zoomOnDoubleClick:false,zoomOnScroll:true},jsx(Background,{gap:12,size:1,variant:"dots"},),jsx(Controls,{},))
  )
}


function Input_d58fca9919e1022f545a696373cee33d () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_05bcce9446d718e7a4abb4b080c17322 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.handle_search", ({ ["query"] : _e?.["target"]?.["value"] }), ({ ["debounce"] : 300 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full sm:w-64 pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.search_query_rx_state_,onChange:on_change_05bcce9446d718e7a4abb4b080c17322,placeholder:"Search..."},)
  )
}


function Button_6c8e61fddb5bf189fe151ab789f1b90f () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6e4a29164a2099368f62d55bc1d3507c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.clear_search", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors",onClick:on_click_6e4a29164a2099368f62d55bc1d3507c},jsx(LucideX,{className:"w-3 h-3"},))
  )
}


function Fragment_3b187ad3082ce2dbcaa2da64013fcaf0 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__app___states___relationship_state____relationship_state.search_query_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(Button_6c8e61fddb5bf189fe151ab789f1b90f,{},))):(jsx(Fragment,{},))))
  )
}


function Input_21cfc7988c0b0e0d4121e64f10482057 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_651473d5430c49b08628c70e70faa9a3 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_node_limit", ({ ["limit"] : (Number(_e?.["target"]?.["value"])) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all",defaultValue:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.node_limit_rx_state_)),key:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.node_limit_rx_state_)),max:"500",min:"50",onChange:on_change_651473d5430c49b08628c70e70faa9a3,step:"50",type:"range"},)
  )
}


function Span_c07e36242f5ee2098e7050436ab29688 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"font-bold text-indigo-600 tabular-nums"},(reflex___state____state__app___states___relationship_state____relationship_state.filtered_accounts_rx_state_.length + reflex___state____state__app___states___relationship_state____relationship_state.filtered_contacts_rx_state_.length))
  )
}


function Fragment_4a0c85769cb52f2a578c5d4fda314ade () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_?(jsx(Fragment,{},jsx("div",{className:"animate-spin w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full"},))):(jsx(Fragment,{},))))
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


function Button_49722a0f68f5cf57f0c83540f11a40f9 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_928ccc08d030188db40bb6156b3c7ece = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.start_node_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all active:scale-95",onClick:on_click_928ccc08d030188db40bb6156b3c7ece},jsx(LucidePlus,{className:"w-4 h-4"},),jsx("span",{},"Node"))
  )
}


function Button_a1c6f65b7883f29cd9306efb3c6369da () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6852d3b8a60347257df2d18475c600f7 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.start_relationship_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:((reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_?.valueOf?.() === ""?.valueOf?.()) ? "flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-400 text-sm font-medium rounded-lg cursor-not-allowed border border-gray-200" : "flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all active:scale-95"),disabled:(reflex___state____state__app___states___relationship_state____relationship_state.selected_node_id_rx_state_?.valueOf?.() === ""?.valueOf?.()),onClick:on_click_6852d3b8a60347257df2d18475c600f7},jsx(LucideLink,{className:"w-4 h-4"},),jsx("span",{},"Link"))
  )
}


function Button_ff1c68e25363c5499d56db44b193c104 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_16e3973365718bfead50c84ac563d0d6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.prepare_node_edit", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"p-2 text-gray-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-lg transition-all shadow-sm hover:shadow active:scale-95",onClick:on_click_16e3973365718bfead50c84ac563d0d6,title:"Edit Node"},jsx(LucidePencil,{className:"w-4 h-4"},))
  )
}


function Fragment_bf018163644689788e5febd33aef8cc6 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.())?(jsx(Fragment,{},jsx(Button_ff1c68e25363c5499d56db44b193c104,{},))):(jsx(Fragment,{},))))
  )
}


function Button_36685c4a45829accf4cc6077650f56b9 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_c0c083496e50484c684d9813588ecf4d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.delete_current_selection", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"p-2 text-gray-600 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-all shadow-sm hover:shadow active:scale-95",onClick:on_click_c0c083496e50484c684d9813588ecf4d,title:"Delete Selected"},jsx(LucideTrash2,{className:"w-4 h-4"},))
  )
}


function Fragment_4046c52b345645535c52dc70cfc88175 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.show_side_panel_rx_state_ && !((reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "none"?.valueOf?.())))?(jsx(Fragment,{},jsx("div",{className:"flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300"},jsx("div",{className:"w-px h-8 bg-gray-200 mx-1"},),jsx("div",{className:"flex items-center gap-2"},jsx(Fragment_bf018163644689788e5febd33aef8cc6,{},),jsx(Button_36685c4a45829accf4cc6077650f56b9,{},))))):(jsx(Fragment,{},))))
  )
}


function Drawer__overlay_d9d9ab0269c326a388c7caead6a2ac5b () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_480e95f021a096d625b5bcb51e7ce240 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.close_panel", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(VaulDrawer.Overlay,{className:"fixed inset-0 bg-black/40 z-[9999]",css:({ ["position"] : "fixed", ["left"] : "0", ["right"] : "0", ["bottom"] : "0", ["top"] : "0", ["zIndex"] : 50, ["background"] : "rgba(0, 0, 0, 0.5)" }),onClick:on_click_480e95f021a096d625b5bcb51e7ce240},)
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


function Input_8d9ed94757c4d75b02491f8406574826 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_e46a5ab368b9cb97250068cc1075cf05 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_node_name_rx_state_,onChange:on_change_e46a5ab368b9cb97250068cc1075cf05},)
  )
}


function Input_9fdd784c057effb1393fa88e7ad665e7 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_4e2de07fdd3c83544bb221b5c50e533e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_last_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_node_last_name_rx_state_,onChange:on_change_4e2de07fdd3c83544bb221b5c50e533e},)
  )
}


function Input_346053e22ef364a4b8ae45123218b81a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_bc89abe3596bfe5b4b83da45e9338d22 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_new_node_title_or_ticker", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.new_node_title_or_ticker_rx_state_,onChange:on_change_bc89abe3596bfe5b4b83da45e9338d22},)
  )
}


function Fragment_d74abc8db182f074315209c9b79ba435 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.new_node_type_rx_state_?.valueOf?.() === "person"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"First Name *"),jsx(Input_8d9ed94757c4d75b02491f8406574826,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Last Name"),jsx(Input_9fdd784c057effb1393fa88e7ad665e7,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Job Title"),jsx(Input_346053e22ef364a4b8ae45123218b81a,{},)))):(jsx(Fragment,{},jsx("div",{},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Company Name *"),jsx(Input_8d9ed94757c4d75b02491f8406574826,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Ticker / ID"),jsx(Input_346053e22ef364a4b8ae45123218b81a,{},))))))
  )
}


function Fragment_3a84e2b498715578c2bfe0e730464bef () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_?(jsx(Fragment,{},jsx("span",{className:"animate-pulse"},"Saving..."))):(jsx(Fragment,{},"Create Entity"))))
  )
}


function Button_e855d14ac1d53632529b9178084f0c9e () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_54341ee1d6bb0baaa14876fabb7f9b85 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.save_node", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm mb-2",disabled:reflex___state____state__app___states___relationship_state____relationship_state.is_loading_rx_state_,onClick:on_click_54341ee1d6bb0baaa14876fabb7f9b85},jsx(Fragment_3a84e2b498715578c2bfe0e730464bef,{},))
  )
}


function Button_99025adced0c0c57b60e3d7d5454f605 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_3f40e4c127332733e83ea2042c15a08a = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.cancel_node_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors",onClick:on_click_3f40e4c127332733e83ea2042c15a08a},"Cancel")
  )
}


function Fragment_a3b55e81e21f408ec5907afbf410afe1 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_?(jsx(Fragment,{},jsx("div",{className:"p-4 md:p-5 h-full flex flex-col bg-white"},jsx(VaulDrawer.Title,{asChild:true,css:({ ["fontSize"] : "1.125rem", ["fontWeight"] : "600", ["lineHeight"] : "1", ["letterSpacing"] : "-0.05em" })},jsx("h2",{className:"text-xl font-bold mb-4 text-gray-900 border-b pb-1 shrink-0"},"New Entity")),jsx("div",{className:"flex-1 overflow-y-auto mb-4 min-h-0"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Type"),jsx("div",{className:"flex gap-4 mb-4"},jsx("label",{className:"flex items-center"},jsx(Input_dcce46ac7977d2aaf052d56c9249799d,{},),jsx("span",{className:"ml-2 text-sm text-gray-700"},"Person")),jsx("label",{className:"flex items-center"},jsx(Input_e83093342e8d2b6ad5284589533e64be,{},),jsx("span",{className:"ml-2 text-sm text-gray-700"},"Company"))),jsx(Fragment_d74abc8db182f074315209c9b79ba435,{},)),jsx("div",{className:"shrink-0 pt-2 border-t border-gray-200 bg-white"},jsx(Button_e855d14ac1d53632529b9178084f0c9e,{},),jsx(Button_99025adced0c0c57b60e3d7d5454f605,{},))))):(jsx(Fragment,{},))))
  )
}


function Input_b826b7a1bd6f691ff12a27c1ae04445d () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_43f1014d994aa2e54007cbf05de1deca = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.filter_target_nodes", ({ ["query"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-indigo-500 outline-none",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.relationship_target_search_rx_state_,onChange:on_change_43f1014d994aa2e54007cbf05de1deca,placeholder:"Type name..."},)
  )
}


function Div_f150b7040a844c426cb1996323244fa5 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx("div",{className:"max-h-40 overflow-y-auto border border-gray-200 rounded-lg mb-4 bg-white shadow-sm"},Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.filtered_target_nodes_rx_state_ ?? [],((node_rx_state_,index_6bbf74ad4d03cf571b1e92e7603b52e0)=>(jsx("button",{className:"w-full flex items-center p-2 hover:bg-indigo-50 rounded-md transition-colors text-sm border-b border-gray-50 last:border-0",key:index_6bbf74ad4d03cf571b1e92e7603b52e0,onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_creation_target", ({ ["id"] : node_rx_state_?.["id"], ["type"] : node_rx_state_?.["type"], ["name"] : node_rx_state_?.["name"] }), ({  })))], [_e], ({  }))))},jsx("div",{className:"flex-1 text-left min-w-0"},jsx("span",{className:"font-medium text-gray-900 block truncate"},node_rx_state_?.["name"]),jsx("span",{className:"text-xs text-gray-500 block truncate"},node_rx_state_?.["subtitle"])),jsx("span",{className:"ml-2 text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded"},node_rx_state_?.["type"]))))))
  )
}


function Fragment_3a6277e94da53d08a5eebb995c1543ba () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.filtered_target_nodes_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Div_f150b7040a844c426cb1996323244fa5,{},))):(jsx(Fragment,{},jsx("p",{className:"text-xs text-gray-400 mb-4 italic"},"Type to search for people or companies...")))))
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


function Input_40cc6e83d23517698fa0adcf6c8db6c9 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_84ef41a73331e71af28a1f39087293c4 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_creation_score", ({ ["score"] : (Number(_e?.["target"]?.["value"])) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2 accent-indigo-600",defaultValue:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.creation_score_rx_state_)),key:reflex___state____state__app___states___relationship_state____relationship_state.creation_term_rx_state_,max:"100",min:"-100",onChange:on_change_84ef41a73331e71af28a1f39087293c4,type:"range"},)
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


function Fragment_91635031a98cb946a84f8016007cb9e6 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.creation_target_id_rx_state_?.valueOf?.() !== 0?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"animate-in fade-in slide-in-from-top-2 duration-300"},jsx("div",{className:"text-sm mb-4 p-2 bg-indigo-50 rounded-md border border-indigo-100"},jsx("span",{className:"text-gray-500 mr-2"},"Target:"),jsx(Span_d08d277520988082e5dfa10e9fb24026,{},)),jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Relationship Term"),jsx(Select_4c8b34627aa1836988326e7853c2d4bc,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Initial Score"),jsx(Input_40cc6e83d23517698fa0adcf6c8db6c9,{},),jsx(Div_847a01c7c74a8c6dbf44012b3caaf7b4,{},),jsx(Button_9fab42aec5b8216d22c71e8721b67092,{},)))):(jsx(Fragment,{},))))
  )
}


function Button_cf5e5bfeb86941afde5ca5695f80e827 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6f05aaff6a7e17ce950405c3fec1e656 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.cancel_relationship_creation", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors mt-auto",onClick:on_click_6f05aaff6a7e17ce950405c3fec1e656},"Cancel")
  )
}


function Fragment_78fe796bd070b2f6decf7b9fb3c7aa5a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx(VaulDrawer.Title,{asChild:true,css:({ ["fontSize"] : "1.125rem", ["fontWeight"] : "600", ["lineHeight"] : "1", ["letterSpacing"] : "-0.05em" })},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2"},"Add Connection")),jsx("div",{className:"flex-1 overflow-y-auto flex flex-col"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Search Target Node"),jsx(Input_b826b7a1bd6f691ff12a27c1ae04445d,{},),jsx(Fragment_3a6277e94da53d08a5eebb995c1543ba,{},),jsx(Fragment_91635031a98cb946a84f8016007cb9e6,{},),jsx(Button_cf5e5bfeb86941afde5ca5695f80e827,{},))))):(jsx(Fragment,{},))))
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


function Fragment_b70030c4fde4ec178468ffa14c39e6f2 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)) && (reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.())) && reflex___state____state__app___states___relationship_state____relationship_state.is_editing_rx_state_)?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx(VaulDrawer.Title,{asChild:true,css:({ ["fontSize"] : "1.125rem", ["fontWeight"] : "600", ["lineHeight"] : "1", ["letterSpacing"] : "-0.05em" })},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2 shrink-0"},"Edit Entity")),jsx("div",{className:"flex-1 overflow-y-auto mb-4 min-h-0"},jsx(Fragment_ef33331c4ea73149a8831c04708f9fbf,{},)),jsx("div",{className:"shrink-0 pt-4 border-t border-gray-200 bg-white mt-auto"},jsx(Button_d74149214ac81f9d2f29ad56fcd34c2b,{},),jsx(Button_184a4a0c7590e851cd2bffeef2fb13bd,{},),jsx(Button_fab67df1ff43c956bd47adbfd8192e0b,{},))))):(jsx(Fragment,{},))))
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


function Div_98208f83d2bd77aa4bf0f7c061257b0e () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx("div",{className:"space-y-2"},Array.prototype.map.call(reflex___state____state__app___states___relationship_state____relationship_state.active_node_relationships_rx_state_ ?? [],((item_rx_state_,index_a6cf4483543f8ffb90570e6e418eff51)=>(jsx("div",{className:"flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-indigo-100 transition-colors",key:index_a6cf4483543f8ffb90570e6e418eff51},jsx("div",{className:"flex-1 min-w-0"},jsx("p",{className:"font-medium text-gray-900 text-sm truncate"},item_rx_state_?.["connected_node_name"]),jsx("div",{className:"flex items-center mt-0.5"},jsx("span",{className:"text-[10px] font-bold tracking-wider text-gray-500 uppercase mr-2"},item_rx_state_?.["term"].toUpperCase()),jsx("span",{className:((item_rx_state_?.["type"]?.valueOf?.() === "employment"?.valueOf?.()) ? "px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200" : ("px-1.5 py-0.5 rounded text-[10px] font-semibold "+item_rx_state_?.["badge_class"]))},((item_rx_state_?.["type"]?.valueOf?.() === "employment"?.valueOf?.()) ? "Struct." : (JSON.stringify(item_rx_state_?.["score"])))))),jsx("button",{className:"p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.soft_delete_relationship", ({ ["rel_id"] : item_rx_state_?.["relationship_id"] }), ({  })))], [_e], ({  }))))},jsx(LucideTrash,{className:"w-3.5 h-3.5"},)))))))
  )
}


function Fragment_9ff7fa12d2a1b3ca19c9c12c3aec5a20 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.active_node_relationships_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Div_98208f83d2bd77aa4bf0f7c061257b0e,{},))):(jsx(Fragment,{},jsx("div",{className:"py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200"},jsx(LucideUsers,{className:"w-8 h-8 text-gray-300 mb-2 mx-auto"},),jsx("p",{className:"text-sm text-gray-400 text-center"},"No active connections"))))))
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


function Fragment_964989e2e016afd3f5e1fba6cef78be9 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)) && (reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.())) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_editing_rx_state_))?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("div",{className:"flex items-center justify-between mb-6 border-b pb-2 shrink-0"},jsx(VaulDrawer.Title,{asChild:true,css:({ ["fontSize"] : "1.125rem", ["fontWeight"] : "600", ["lineHeight"] : "1", ["letterSpacing"] : "-0.05em" })},jsx("h2",{className:"text-xl font-bold text-gray-900"},"Details")),jsx(Span_823b17d275118f0afdf798c2bbe13366,{},)),jsx("div",{className:"flex-1 overflow-y-auto min-h-0 mb-4"},jsx("div",{className:"shrink-0"},jsx("label",{className:"text-xs font-bold text-gray-400 uppercase mb-1 block"},"Name"),jsx(P_0622292c409e6430972044ddb28956f2,{},),jsx("label",{className:"text-xs font-bold text-gray-400 uppercase mb-1 block"},"Role / Info"),jsx(P_a3cb1af0bbb273ea14e3082bda632079,{},),jsx("div",{className:"flex gap-3 mb-8"},jsx(Button_804ae62c91449f98b73138c6a7a93734,{},),jsx(Button_676978fd5038044a3c5151d3c4df6d0f,{},))),jsx("div",{className:"flex-1 mb-4"},jsx("h3",{className:"text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"},"Connections"),jsx(Fragment_9ff7fa12d2a1b3ca19c9c12c3aec5a20,{},))),jsx("div",{className:"shrink-0 pt-4 border-t border-gray-200 bg-white mt-auto"},jsx("div",{className:"border-t border-gray-200 my-4"},),jsx("div",{className:"shrink-0 mb-6"},jsx("h3",{className:"text-sm font-bold text-gray-900 mb-4"},"Record Metadata"),jsx("label",{className:"text-xs font-medium text-gray-500 mb-1 block"},"Modified By"),jsx(Input_37b0e791659245d96e21b6265c32c56b,{},),jsx("label",{className:"text-xs font-medium text-gray-500 mb-1 block"},"Operation Type"),jsx(Input_27cd45ed4f28943c349a95bcfdfdcbcf,{},),jsx("label",{className:"text-xs font-medium text-gray-500 mb-1 block"},"Last Updated"),jsx(Input_de89f4bb91b03033f0f01aab29436c97,{},)),jsx(Button_3515c5f8f92f1171c390463e72ffae39,{},))))):(jsx(Fragment,{},))))
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


function Input_65ce07f6246b596b0632bcae1c07eccc () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_289a3ff9b5a3bfa35b05b5047357782f = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_score", ({ ["value"] : (Number(_e?.["target"]?.["value"])) }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4 accent-indigo-600",defaultValue:(JSON.stringify(reflex___state____state__app___states___relationship_state____relationship_state.editing_score_rx_state_)),key:reflex___state____state__app___states___relationship_state____relationship_state.selected_edge_id_rx_state_,max:"100",min:"-100",onChange:on_change_289a3ff9b5a3bfa35b05b5047357782f,type:"range"},)
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


function Fragment_c1fa747c0484d9171c54c14b5ee21cc6 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.editing_relationship_type_rx_state_?.valueOf?.() === "employment"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"bg-gray-50 rounded-lg p-6 border border-gray-100 mb-6"},jsx(LucideBriefcase,{className:"w-12 h-12 text-gray-300 mx-auto mb-3"},),jsx("p",{className:"text-center text-gray-600 font-medium mb-1"},"Employment relationships are structural links."),jsx("p",{className:"text-center text-gray-400 text-sm"},"They do not carry a sentiment score.")))):(jsx(Fragment,{},jsx("div",{className:"flex flex-col"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-2 block"},"Nature of Relationship"),jsx(Select_053b4d3f4dcf63589a41a708903ba045,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-4 block"},"Relationship Score"),jsx("div",{className:"flex justify-between w-full mb-2 px-1"},jsx("span",{className:"text-xs font-bold text-red-500"},"-100 (Enemy)"),jsx("span",{className:"text-xs font-bold text-gray-500"},"0 (Neutral)"),jsx("span",{className:"text-xs font-bold text-green-500"},"+100 (Ally)")),jsx(Input_65ce07f6246b596b0632bcae1c07eccc,{},),jsx("div",{className:"text-center text-sm text-gray-600 mb-8"},"Current Score: ",jsx(Span_b05afbf33bb1f3f0340d12de6ffb8667,{},)),jsx(Button_3fc7ec0a8d2c7b4b2e8ed406552e17f2,{},))))))
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


function Fragment_2b5d43b7ba0846e524b2c11b6069babb () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},(((!(reflex___state____state__app___states___relationship_state____relationship_state.node_create_mode_rx_state_) && !(reflex___state____state__app___states___relationship_state____relationship_state.is_creating_relationship_rx_state_)) && (reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "edge"?.valueOf?.()))?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("div",{className:"mb-6 border-b pb-2 shrink-0"},jsx(VaulDrawer.Title,{asChild:true,css:({ ["fontSize"] : "1.125rem", ["fontWeight"] : "600", ["lineHeight"] : "1", ["letterSpacing"] : "-0.05em" })},jsx("h2",{className:"text-xl font-bold text-gray-900"},"Edit Relationship"))),jsx("div",{className:"flex-1 overflow-y-auto flex flex-col"},jsx("div",{className:"mb-6 flex items-center flex-wrap gap-2"},jsx("span",{className:"text-sm font-medium text-gray-500 mr-2"},"Type:"),jsx(Span_a75135667ce8f5f11b2403f552f90a1e,{},),jsx(Fragment_3a802aeca0e1069f2c7e2a8b65b7af4a,{},)),jsx(Fragment_c1fa747c0484d9171c54c14b5ee21cc6,{},),jsx("div",{className:"mt-auto pt-4 border-t"},jsx(Button_eadbddf5751c3fe57cd391dd3066d737,{},)))))):(jsx(Fragment,{},))))
  )
}


function Drawer__root_e44e95514546d51456e0263a22f963bd () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(VaulDrawer.Root,{direction:"right",open:reflex___state____state__app___states___relationship_state____relationship_state.show_side_panel_rx_state_},jsx(VaulDrawer.Portal,{},jsx(Drawer__overlay_d9d9ab0269c326a388c7caead6a2ac5b,{},),jsx(RadixThemesTheme,{css:{...theme.styles.global[':root'], ...theme.styles.global.body}},jsx(VaulDrawer.Content,{className:"fixed top-0 right-0 h-full w-full max-w-md sm:w-[420px] flex flex-col bg-white shadow-2xl z-[10000] border-l border-gray-200 outline-none sm:rounded-l-3xl",css:({ ["left"] : "0", ["right"] : "0", ["bottom"] : "0", ["top"] : "0", ["position"] : "fixed", ["zIndex"] : 50, ["display"] : "flex" })},jsx("div",{className:"flex-1 w-full h-full bg-white relative max-w-md mx-auto"},jsx(Fragment_a3b55e81e21f408ec5907afbf410afe1,{},),jsx(Fragment_78fe796bd070b2f6decf7b9fb3c7aa5a,{},),jsx(Fragment_b70030c4fde4ec178468ffa14c39e6f2,{},),jsx(Fragment_964989e2e016afd3f5e1fba6cef78be9,{},),jsx(Fragment_2b5d43b7ba0846e524b2c11b6069babb,{},))))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx("div",{className:"relative h-screen w-full font-sans bg-white text-gray-900 font-['Inter'] overflow-hidden"},jsx("div",{className:"absolute top-0 left-0 right-0 z-[600] bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm h-14 flex items-center"},jsx("div",{className:"flex items-center justify-between max-w-7xl mx-auto px-4"},jsx("div",{className:"flex items-center gap-3"},jsx(LucideNetwork,{className:"w-5 h-5 text-indigo-600"},),jsx("h1",{className:"text-lg font-bold text-gray-900"},"Investment Relationship Dashboard")),jsx("div",{className:"hidden sm:block"},jsx("span",{className:"text-xs text-gray-500"},"Track relationships and connections")))),jsx("div",{className:"absolute inset-0 z-0 w-full h-full pt-14"},jsx("div",{className:"w-full h-full relative"},jsx(Reactflow_90728f4e1fddeb3e03299f13d7dc7da1,{},))),jsx("div",{className:"absolute top-[72px] left-4 z-[500] flex flex-wrap items-center gap-4 p-3 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg transition-all hover:shadow-xl max-w-[calc(100vw-32px)]"},jsx("div",{className:"relative group"},jsx(LucideSearch,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"},),jsx(Input_d58fca9919e1022f545a696373cee33d,{},),jsx(Fragment_3b187ad3082ce2dbcaa2da64013fcaf0,{},)),jsx("div",{className:"w-px h-8 bg-gray-200"},),jsx("div",{className:"flex flex-col gap-1"},jsx("span",{className:"text-[10px] font-bold text-gray-400 tracking-wider select-none"},"LIMIT"),jsx("div",{className:"flex items-center h-4"},jsx(Input_21cfc7988c0b0e0d4121e64f10482057,{},))),jsx("div",{className:"w-px h-8 bg-gray-200"},),jsx("div",{className:"flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg min-w-[80px] justify-between h-[38px]"},jsx("div",{className:"flex items-baseline gap-1"},jsx(Span_c07e36242f5ee2098e7050436ab29688,{},),jsx("span",{className:"text-xs text-gray-500 font-medium"},"nodes")),jsx(Fragment_4a0c85769cb52f2a578c5d4fda314ade,{},)),jsx("label",{className:"relative flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded-lg transition-colors"},jsx(Input_f16de6022b1956b6a4f38d4de44d7698,{},),jsx("div",{className:"w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 transition-colors cursor-pointer"},),jsx("span",{className:"text-sm font-medium text-gray-600 select-none"},"History")),jsx("div",{className:"w-px h-8 bg-gray-200"},),jsx("div",{className:"flex items-center gap-2"},jsx(Button_49722a0f68f5cf57f0c83540f11a40f9,{},),jsx(Button_a1c6f65b7883f29cd9306efb3c6369da,{},)),jsx(Fragment_4046c52b345645535c52dc70cfc88175,{},)),jsx(Drawer__root_e44e95514546d51456e0263a22f963bd,{},)),jsx("title",{},"App | Index"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}