import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llmConfig } from "@/config/llmConfig";
interface IClassifyCategoryResult {
    categoryName: string;
}
export const classifyProductCategory = async (
    userInput: string,
    categories: string[]
): Promise<IClassifyCategoryResult> => {
    try {
        // 1. Create a structured prompt
        const prompt = ChatPromptTemplate.fromTemplate(`
      Analyze this product request and classify it strictly into ONE of these categories:
      {categories}
      User Input: "{input}"
      Rules:
  1. Respond ONLY with the exact category name from the list
  2. Never invent new categories
  3. If unsure, return "uncategorized"
  Examples:
  Input: "Smartphone with good camera" → Output: "mobile"
    `);
        // 2. Create the processing chain
        const chain = prompt
            .pipe(llmConfig)
            .pipe(new StringOutputParser());
        // 3. Execute with user input
        const result = await chain.invoke({
            input: userInput,
            categories: categories.join(", ")
        });
        // 4. Validate the response
        const matchedCategory = categories.includes(result.trim())
            ? result.trim()
            : "uncategorized";
        return {
            categoryName: matchedCategory
        };
    } catch (error) {
        console.error("Classification error:", error);
        return {
            categoryName: "uncategorized"
        };
    }
};