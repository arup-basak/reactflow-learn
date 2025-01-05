import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { CircleX } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
  className = "",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  inputs?: { id: string; className?: string }[];
  outputs?: { id: string; className?: string }[];
  className?: string;
}) => {
  const { deleteElements } = useReactFlow();

  const handleRemove = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div
      className={twMerge(`bg-white rounded-lg shadow-md p-4 border border-gray-200`, className)}
    >
      <div className="drag-handle cursor-move">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-base text-slate-600">{title}</div>
          <button
            onClick={handleRemove}
            className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-red-500"
          >
            <CircleX />
          </button>
        </div>
      </div>

      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className={input.className}
        />
      ))}

      <div className="mt-2 py-2 space-y-3">{children}</div>

      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className={output.className}
        />
      ))}
    </div>
  );
};
