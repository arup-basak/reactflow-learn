import { useState, useRef, useEffect } from "react";
import { BaseNode } from "../BaseNode";

export const TextNode = ({ id, data }: { id: string; data: any }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrText(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <BaseNode id={id} title="Text" outputs={[{ id: "output" }]}>
      <div className="p-3">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Text:</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text..."
            rows={1}
          />
        </label>
      </div>
    </BaseNode>
  );
};
