import React from "react";
import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { X } from "lucide-react";

const NodeEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
  animated,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          ...style,
          strokeWidth: 2,
          stroke: selected ? '#3b82f6' : '#9ca3af',
        }} 
      />
      <foreignObject
        width={20}
        height={20}
        x={(sourceX + targetX) / 2 - 10}
        y={(sourceY + targetY) / 2 - 10}
        className="cursor-pointer"
        onClick={onEdgeClick}
        style={{ pointerEvents: 'all' }}
      >
        <button className="flex h-5 w-5 items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 shadow-sm" style={{ transform: 'none' }}>
          <X className="h-3 w-3 text-slate-800 font-bold" />
        </button>
      </foreignObject>
    </>
  );
};

export default NodeEdge;
