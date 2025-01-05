interface PipelineData {
  nodes: any[];
  edges: any[];
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const parsePipeline = async (
  pipelineData: PipelineData
): Promise<PipelineResponse> => {
  console.log(pipelineData)
  const formData = new FormData();
  formData.append("pipeline", JSON.stringify(pipelineData));

  const response = await fetch(backendUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
