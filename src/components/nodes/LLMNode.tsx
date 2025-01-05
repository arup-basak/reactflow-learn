import { BaseNode } from "../BaseNode";

const inputs = [{ id: "system" }, { id: "prompt" }]
const outputs = [{ id: "response" }]

export const LLMNode = ({ id, data }: { id: string; data: any }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={inputs}
      outputs={outputs}
    >
      <p>This is a LLM.</p>
    </BaseNode>
  );
};
