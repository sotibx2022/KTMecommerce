import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llmConfig } from "@/config/llmConfig";
import { config } from "@/config/configuration";
import { ChatGroq } from "@langchain/groq";
// Initialize the LLM (make sure OPENAI_API_KEY is set in env)
export const analyzeRemarks = async (
  productName: string,
  reviewDescription: string,
  rating: number
): Promise<string> => {
  try {
    const llmModel = () =>
      new ChatGroq({
        apiKey: config.groqSecretKey,
        model: "llama-3.1-8B-instant",
        temperature: 0,
      });
    const template = `
You are a Sentiment Analyzer for Product Review Details.  
You must return exactly ONE word only: Positive, Negative, or Neutral.
### Rules
1. Negative remarks → return "Negative".
2. Positive remarks → return "Positive".
3. Neutral remarks → return "Neutral".
4. If the remark is not related to the product → return "Negative".
5. If the remark contains vulgar words → return "Negative".
6. If the Rating is less than 3, even if the remark is Positive or Neutral → return "Negative".
### Examples
Input: "This is a great phone, I would recommend others to buy it." | Rating: 5
Output: Positive  
Input: "The phone stopped working after 2 days, totally useless." | Rating: 2
Output: Negative  
Input: "It's okay, nothing special." | Rating: 3
Output: Neutral  
### Task
Analyze the following review:
Input: "{reviewDescription}" | Product: "{productName}" | Rating: {rating}
Output:
`;
    const prompt = new PromptTemplate({
      inputVariables: ["productName", "reviewDescription", "rating"],
      template,
    });
    const chain = prompt.pipe(llmModel).pipe(new StringOutputParser() as any);
    const result = (await chain.invoke({
      productName,
      reviewDescription,
      rating,
    })) as string;
    return result;
  } catch (error) {
    throw error;
  }
};
