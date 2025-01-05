import { useState } from "react";
import { BaseNode } from "../BaseNode";

export const InputNode = ({ id, data }: { id: string; data: any }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode id={id} title="Input" outputs={[{ id: "value" }]}>
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
          value={inputType}
          onChange={handleTypeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
