import {Fragment,useContext,useEffect} from "react"
import {Background,Controls,ReactFlow} from "@xyflow/react"
import {StateContexts} from "$/utils/context"
import "@xyflow/react/dist/style.css"
import {jsx} from "@emotion/react"




function Reactflow_53e02ce78cb805e98ce8b9741813078a () {
  const reflex___state____state__app___states___relationship_state____relationship_state = useContext(StateContexts.reflex___state____state__app___states___relationship_state____relationship_state)



  return (
    jsx(ReactFlow,{className:"bg-gray-50",edges:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["edges"],edgesFocusable:true,fitView:true,fitViewOptions:({ ["padding"] : 0.2 }),maxZoom:4.0,minZoom:0.1,nodes:reflex___state____state__app___states___relationship_state____relationship_state.graph_data_rx_state_?.["nodes"],nodesConnectable:true,nodesDraggable:true,nodesFocusable:true},jsx(Background,{gap:12,size:1,variant:"dots"},),jsx(Controls,{},))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx("div",{className:"flex h-screen w-full font-sans bg-white text-gray-900 font-['Inter'] overflow-hidden relative"},jsx("div",{className:"w-full h-full absolute inset-0"},jsx(Reactflow_53e02ce78cb805e98ce8b9741813078a,{},))),jsx("title",{},"App | Index"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}