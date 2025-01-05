"use client";

import React, { useState } from "react";
import { ChevronsLeftRightEllipsis, Bot, FileOutput, Text } from "lucide-react";
import { DraggableNode } from "@/components/DraggableNode";
import { useFlowStore } from "@/utils/store";
import { parsePipeline } from "@/utils/request";
import Modal from "@/components/Modal";

export const PipelineToolbar = () => {
  const { nodes: nodeStore, edges } = useFlowStore();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PipelineResponse | null>(null);

  const handleClose = () => setIsOpen(false);
  const nodes = [
    { type: "customInput", label: "Input", icon: ChevronsLeftRightEllipsis },
    { type: "llm", label: "LLM", icon: Bot },
    { type: "customOutput", label: "Output", icon: FileOutput },
    { type: "text", label: "Text", icon: Text },
  ];

  const handleClick = async () => {
    try {
      const data = await parsePipeline({ nodes: nodeStore, edges });
      setData(data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header className="p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          {nodes.map((node) => (
            <DraggableNode key={node.type} {...node} />
          ))}
        </div>
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </header>
      <Modal isOpen={isOpen} onClose={handleClose} title="Pipeline Preview">
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Number of Nodes:</span>
            <span>{data?.num_nodes}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Number of Edges:</span>
            <span>{data?.num_edges}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Is DAG:</span>
            <span>{data?.is_dag ? "Yes" : "No"}</span>
          </div>
        </div>
      </Modal>
    </>
  );
};
