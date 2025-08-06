import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { config } from "./configuration";
const llm = new ChatGroq({
  apiKey: config.groqSecretKey, // Store in your configuration
  model: "llama3-70b-8192",
  temperature: 0.7, // Adjust for creativity (0-1)
});
export async function smartSearch(query: string) {
  try {
    const response = await llm.invoke([
      new HumanMessage(`Answer concisely: ${query}`),
    ]);
    return response.content;
  } catch (error) {
    throw error;
  }
}