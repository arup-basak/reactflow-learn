"use client";

import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
} from "@xyflow/react";
import NodeEdge from "@/components/NodeEdge";
import { InputNode, LLMNode, OutputNode, TextNode } from "@/components/nodes";
import { useFlowStore, type CustomNode, type NodeData } from "@/utils/store";

const nodeTypes: NodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const nodeColor = (node: any) => {
  switch (node.type) {
    case "customInput":
      return "#4CAF50";
    case "customOutput":
      return "#3F51B5";
    case "llm":
      return "#FF4081";
    case "text":
      return "#FF9800";
    default:
      return "#9C27B0";
  }
};

const edgeTypes: EdgeTypes = {
  default: NodeEdge,
  smoothstep: NodeEdge,
};

export default function PipelineUI() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setReactFlowInstance,
    getNodeID,
  } = useFlowStore();

  const getInitNodeData = (nodeID: string, type: string): NodeData => ({
    nodeType: type,
  });

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    const dataTransfer = event.dataTransfer.getData("application/reactflow");
    const reactFlowInstance = useFlowStore.getState().reactFlowInstance;

    if (dataTransfer && reactFlowBounds && reactFlowInstance) {
      try {
        const appData = JSON.parse(dataTransfer) as { nodeType?: string };
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode: CustomNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
          draggable: true,
          dragHandle: ".drag-handle",
        };

        addNode(newNode);
      } catch (error) {
        console.error("Error adding new node:", error);
      }
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-[92vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: "default" }}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
