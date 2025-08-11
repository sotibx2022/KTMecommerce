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
    // Create parser and get exact format instructions
    const parser = new JsonOutputParser<PriceClassification>();
    const formatInstructions = parser.getFormatInstructions();
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", `
Analyze this request for price-related intent: "{input}"
Rules:
1. Strictly, Respond only with JSON. No extra words, no explanation.
2. Extract explicit numeric ranges:
   - "under 5000" → {{ "maxPrice": 5000 }}
   - "2000 to 10000" → {{ "minPrice": 2000, "maxPrice": 10000 }}
   3. Detect sorting preference:
   - "cheap"/"lowest"/"budget" → {{ "priceOrder": "asc" }}
   - "expensive"/"high-end"/"premium" → {{ "priceOrder": "desc" }}
4. Default to {{ "priceOrder": "asc" }} if no price intent found.
Respond ONLY with valid JSON containing:
- minPrice (optional, number)
- maxPrice (optional, number)
- priceOrder ("asc" or "desc")
Examples:
Input: "Phones under 30000" → {{ "maxPrice": 30000 }}
Input: "cheapest laptops" → {{ "priceOrder": "asc" }}
Input: "most expensive watches" → {{ "priceOrder": "desc" }}
{format_instructions}
  `]
    ]);
    const chain = prompt
        .pipe(llmConfig)
        .pipe(parser);
    try {
        const result = await chain.invoke({
            input: userInput,
            format_instructions: formatInstructions
        });
        // Ensure defaults so destructuring won't fail
        return {
            minPrice: result.minPrice ?? undefined,
            maxPrice: result.maxPrice ?? undefined,
            priceOrder: result.priceOrder ?? 'asc'
        };
    } catch (error) {
        console.error("Price classification failed:", error);
        return { priceOrder: 'asc' };
    }
};
