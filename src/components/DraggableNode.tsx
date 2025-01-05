import React from "react";
import { motion } from "framer-motion";

export const DraggableNode = ({ type, label, icon }: { type: string; label: string; icon: React.ElementType }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData = { nodeType };
    // @ts-ignore
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };
  const Icon = icon;

  return (
    <motion.div
      onDragStart={(event: any) => onDragStart(event, type)}
      // @ts-ignore
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      className="flex items-center gap-2 p-3 rounded-md border-2 border-gray-200 bg-white font-medium shadow-sm  hover:border-cyan-400 cursor-grab active:cursor-grabbing select-none"
      whileHover={{ scale: 1.05 }}
      whileDrag={{ 
        scale: 1.1,
        boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      draggable
    >
      <Icon size={20} className="text-gray-700" />
      <span className="text-gray-700 text-sm">{label}</span>
    </motion.div>
  );
};
