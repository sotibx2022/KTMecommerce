import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { config } from "./configuration";
const llm = new ChatGroq({
  apiKey: config.groqSecretKey,
  model: "llama3-70b-8192"
});
export async function smartSearch(query: string): Promise<string> {
  try {
    const response = await llm.invoke([
      new HumanMessage(`return me the query in below format
        searchParams:{keyword?:string, you need to update the synonim words as well,
        category?:string,
        subCategory?:string,
        price?:accessedning, decessending,
        rating?: accessending or decessending,
        brand?:string,
        features?:[]
        }
        : "${query}"`)
    ]);
    console.log(response.content)
    return response.content.toString();
  } catch (error) {
    return JSON.stringify({ query }); // Fallback
  }
}