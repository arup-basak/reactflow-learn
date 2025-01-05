import { create } from "zustand";
import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  ReactFlowInstance,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";

export interface NodeData extends Record<string, unknown> {
  label?: string;
  nodeType?: string;
  [key: string]: unknown;
}

export interface CustomNode extends Node<NodeData> {
  type?: string;
}

interface FlowState {
  nodes: CustomNode[];
  edges: Edge[];
  nodeIDs: Record<string, number>;
  reactFlowInstance: ReactFlowInstance | null;
  
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  getNodeID: (type: string) => string;
  addNode: (node: CustomNode) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  updateNodeField: (nodeId: string, fieldName: string, fieldValue: unknown) => void;
}

const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.Arrow,
    height: 20,
    width: 20
  }
} as const;

const initialState = {
  nodes: [] as CustomNode[],
  edges: [] as Edge[],
  nodeIDs: {} as Record<string, number>,
  reactFlowInstance: null as ReactFlowInstance | null,
};

export const useFlowStore = create<FlowState>()((set, get) => ({
  ...initialState,

  setReactFlowInstance: (instance) => {
    set({
      reactFlowInstance: instance
    });
  },

  getNodeID: (type) => {
    const { nodeIDs } = get();
    const nextId = (nodeIDs[type] || 0) + 1;
    
    set({ 
      nodeIDs: { ...nodeIDs, [type]: nextId } 
    });
    
    return `${type}-${nextId}`;
  },

  addNode: (node) => set(state => ({
    nodes: [...state.nodes, node]
  })),

  onNodesChange: (changes) => set(state => ({
    nodes: applyNodeChanges(changes, state.nodes)
  })),

  onEdgesChange: (changes) => set(state => ({
    edges: applyEdgeChanges(changes, state.edges)
  })),

  onConnect: (connection) => set(state => ({
    edges: addEdge({ ...connection, ...defaultEdgeOptions }, state.edges)
  })),

  updateNodeField: (nodeId, fieldName, fieldValue) => set(state => ({
    nodes: state.nodes.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
        : node
    )
  })),
}));