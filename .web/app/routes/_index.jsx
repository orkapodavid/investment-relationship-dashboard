import {Fragment,useCallback,useContext,useEffect} from "react"
import {Background,Controls,ReactFlow} from "@xyflow/react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isTrue} from "$/utils/state"
import "@xyflow/react/dist/style.css"
import {X as LucideX} from "lucide-react"
import {jsx} from "@emotion/react"




function Reactflow_e74aef831170b9f3edfb4cdb1ba6b795 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_node_click_c7f398905ed13cdb110bd9b8bfd8a422 = useCallback(((_event, _node) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_node_click", ({ ["node"] : ({ ["button"] : _event?.["button"], ["buttons"] : _event?.["buttons"], ["client_x"] : _event?.["clientX"], ["client_y"] : _event?.["clientY"], ["alt_key"] : _event?.["altKey"], ["ctrl_key"] : _event?.["ctrlKey"], ["meta_key"] : _event?.["metaKey"], ["shift_key"] : _event?.["shiftKey"] }) }), ({  })))], [_event, _node], ({  })))), [addEvents, ReflexEvent])
const on_edge_click_310dd2d82b97bfc270b6e577fb31ada3 = useCallback(((_event, _edge) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_edge_click", ({ ["edge"] : ({ ["button"] : _event?.["button"], ["buttons"] : _event?.["buttons"], ["client_x"] : _event?.["clientX"], ["client_y"] : _event?.["clientY"], ["alt_key"] : _event?.["altKey"], ["ctrl_key"] : _event?.["ctrlKey"], ["meta_key"] : _event?.["metaKey"], ["shift_key"] : _event?.["shiftKey"] }) }), ({  })))], [_event, _edge], ({  })))), [addEvents, ReflexEvent])
const on_connect_fa168d58d463c6a6acab4ad3b675129f = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.on_connect", ({ ["connection"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(ReactFlow,{className:"bg-gray-50",edges:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["edges"],edgesFocusable:true,fitView:true,fitViewOptions:({ ["padding"] : 0.2 }),maxZoom:4.0,minZoom:0.1,nodes:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["nodes"],nodesConnectable:true,nodesDraggable:true,nodesFocusable:true,onConnect:on_connect_fa168d58d463c6a6acab4ad3b675129f,onEdgeClick:on_edge_click_310dd2d82b97bfc270b6e577fb31ada3,onNodeClick:on_node_click_c7f398905ed13cdb110bd9b8bfd8a422},jsx(Background,{gap:12,size:1,variant:"dots"},),jsx(Controls,{},))
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


function Fragment_8e0e65409173c416667cc679e0f7b40b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "node"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2"},"Details"),jsx("div",{className:"space-y-4"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Name"),jsx(P_e073ce3a23f8484dfb97644caa59115a,{},),jsx("label",{className:"text-sm font-medium text-gray-500 mb-1 block"},"Role/Info"),jsx(P_a8af4cced5cf51987e96fae843fba187,{},))))):(jsx(Fragment,{},))))
  )
}


function Input_3b48229c5335a4e3f18dacb0f3dca177 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f49a895f77350db311d968161329766d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.set_editing_score", ({ ["value"] : (Number(_e?.["target"]?.["value"])) }), ({ ["throttle"] : 100 })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("input",{className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4 accent-indigo-600",defaultValue:reflex___state____state__app___states___relationship_state____relationship_state.editing_score_rx_state_,key:reflex___state____state__app___states___relationship_state____relationship_state.selected_edge_id_rx_state_,max:"100",min:"-100",onChange:on_change_f49a895f77350db311d968161329766d,type:"range"},)
  )
}


function Span_b05afbf33bb1f3f0340d12de6ffb8667 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("span",{className:"font-mono font-bold ml-1"},reflex___state____state__app___states___relationship_state____relationship_state.editing_score_rx_state_)
  )
}


function Button_421d2a246942f54eae651c112a4f7572 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_8bba1865c705f793b46feff123127746 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.app___states___relationship_state____relationship_state.save_relationship_update", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx("button",{className:"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm",onClick:on_click_8bba1865c705f793b46feff123127746},"Save Changes")
  )
}


function Fragment_132a5c4ddc0d64b5d6baa5649974bc4b () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(Fragment,{},((reflex___state____state__app___states___relationship_state____relationship_state.edit_mode_rx_state_?.valueOf?.() === "edge"?.valueOf?.())?(jsx(Fragment,{},jsx("div",{className:"p-6 h-full flex flex-col"},jsx("h2",{className:"text-xl font-bold mb-6 text-gray-900 border-b pb-2"},"Edit Relationship"),jsx("div",{className:"flex flex-col"},jsx("label",{className:"text-sm font-medium text-gray-500 mb-4 block"},"Relationship Score"),jsx("div",{className:"flex justify-between w-full mb-2 px-1"},jsx("span",{className:"text-xs font-bold text-red-500"},"-100 (Enemy)"),jsx("span",{className:"text-xs font-bold text-gray-500"},"0 (Neutral)"),jsx("span",{className:"text-xs font-bold text-green-500"},"+100 (Ally)")),jsx(Input_3b48229c5335a4e3f18dacb0f3dca177,{},),jsx("div",{className:"text-center text-sm text-gray-600 mb-8"},"Current Score: ",jsx(Span_b05afbf33bb1f3f0340d12de6ffb8667,{},)),jsx(Button_421d2a246942f54eae651c112a4f7572,{},))))):(jsx(Fragment,{},))))
  )
}


function Div_ada1a49c8d48675b0a21983d23bbd781 () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx("div",{className:(reflex___state____state__app___states___relationship_state____relationship_state.show_side_panel_rx_state_ ? "fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-0 border-l" : "fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-full border-l")},jsx(Button_2a72190b7b7499e0a3d0b8e22523a14e,{},),jsx(Fragment_8e0e65409173c416667cc679e0f7b40b,{},),jsx(Fragment_132a5c4ddc0d64b5d6baa5649974bc4b,{},))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx("div",{className:"flex h-screen w-full font-sans bg-white text-gray-900 font-['Inter'] overflow-hidden relative"},jsx("div",{className:"w-full h-full absolute inset-0"},jsx(Reactflow_e74aef831170b9f3edfb4cdb1ba6b795,{},)),jsx(Div_ada1a49c8d48675b0a21983d23bbd781,{},)),jsx("title",{},"App | Index"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}