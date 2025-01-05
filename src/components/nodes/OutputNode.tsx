import { useState } from "react";
import { BaseNode } from "../BaseNode";

export const OutputNode = ({ id, data }: { id: string; data: any }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode id={id} title="Output" inputs={[{ id: "value" }]}>
      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">Name:</span>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </label>
      
      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">Type:</span>
        <select
          value={outputType}
          onChange={handleTypeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
