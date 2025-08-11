import { llmConfig } from "@/config/llmConfig"
import { productModel } from "@/models/products.model"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { ChatPromptTemplate } from "@langchain/core/prompts"
export const classifyProductModel = async (userInput: string): Promise<string|null> => {
    try {
        const parser = new StringOutputParser()
const prompt = ChatPromptTemplate.fromMessages([
  ["system", `
    Analyze the userInput and return the productModel only.
    {input}
    Rules:
    1. No explanation required. Only output the model name with brand name.
    2. If you cannot identify a specific product model confidently, output exactly: null.
    3. If setence is Opposite, only output the another model name from same brand.
    Example:
    Input: "I need latest samsung galaxy phone"
    Output: samsung galaxy
    Input: "mobile"
    Output: null
    Input : I dont need Samsung Galaxy phone
    Output:  Samsung Guru 1200
  `]
])
        const chain = prompt.pipe(llmConfig).pipe(parser)
        const result = await chain.invoke({ input: userInput })
        const trimmed = result ? result.trim().toLowerCase() : '';
if (!trimmed || trimmed === 'null') {
  return null;  
}
return trimmed;
    } catch (error) {
        return 'noProductModel'
    }
}