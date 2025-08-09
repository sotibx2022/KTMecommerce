import { llmConfig } from "@/config/llmConfig";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
interface PriceClassification {
    minPrice?: number;
    maxPrice?: number;
    priceOrder: 'asc' | 'desc';
}
export const classifyProductPrice = async (
    userInput: string
): Promise<PriceClassification> => {
    const prompt = ChatPromptTemplate.fromTemplate(`
    Analyze this request for price-related intent: "{input}"
    Rules:
    1. Extract explicit numeric ranges:
       - "under 5000" → {{ "maxPrice": 5000 }}
       - "2000 to 10000" → {{ "minPrice": 2000, "maxPrice": 10000 }}
    2. Detect sorting preference:
       - "cheap"/"lowest"/"budget" → {{ "priceOrder": "asc" }}
       - "expensive"/"high-end"/"premium" → {{ "priceOrder": "desc" }}
    3. Default to {{ "priceOrder": "asc" }} if no price intent found
    Respond ONLY with JSON containing: minPrice, maxPrice, priceOrder
    Examples:
    Input: "Phones under 30000" → {{"maxPrice": 30000,}}
    Input: "cheapest laptops" → {{"priceOrder": "asc"}}
    Input: "most expensive watches" → {{"priceOrder": "desc"}}
  `);
    const chain = prompt
        .pipe(llmConfig)
        .pipe(new JsonOutputParser());
    try {
        const result = await chain.invoke({ input: userInput });
        return result;
    } catch (error) {
        console.error("Price classification failed:", error);
        return { priceOrder: 'asc' };
    }
};