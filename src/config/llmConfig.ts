import { ChatGroq } from "@langchain/groq";
import { config } from "./configuration";
export const llmConfig = () => new ChatGroq({
  apiKey: config.groqSecretKey,
  model: "llama-3.1-8B-instant",
});
