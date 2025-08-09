import { ChatGroq } from "@langchain/groq";
import { config } from "./configuration";
export const llmConfig = new ChatGroq({
  apiKey: config.groqSecretKey,
  model: "llama3-70b-8192"
});
