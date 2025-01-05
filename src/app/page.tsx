import React from "react";
import PipelineUI from "@/modules/UI";
import { PipelineToolbar } from "@/modules/Toolbar";

export default function FlowPage() {
  return (
    <div className="w-screen h-screen">
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}
