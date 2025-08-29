import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import { extractText, findJson } from "./extractText";
import { ChatGroq } from "@langchain/groq";
import { config } from "@/config/configuration";
// Define schema for validation
const llmConfig = () => new ChatGroq({
    apiKey: config.groqSecretKey,
    model: "llama3-70b-8192",
});
const productDetailsSchema = z.object({
    productDetails: z.object({
        productName: z.string(),
        productDescription: z
            .string()
            .min(100, "Description must be at least 400 characters")
            .max(500, "Description must be at most 500 characters"),
        price: z.number().positive(),
        productFeatures: z
            .array(
                z
                    .string()
                    .min(20, "Each feature must be at least 20 characters")
                    .max(80, "Each feature must be at most 80 characters")
            )
            .length(5, "Must contain exactly 5 features"),
    }),
});
const parser = StructuredOutputParser.fromZodSchema(productDetailsSchema);
export const generateProductDetails = async (productTitle: string): Promise<{ productDetails: { productDescription: string, productFeatures: string[], price: number } }> => {
    const prompt = `
You are a product copywriter. Generate structured product details for the product: "${productTitle}".
Follow these rules strictly:
- productDescription must be between 400–500 characters, no special characters except commas, periods, and hyphens.
- productDescription and product Features should contain similer details.
- Provide a price in US dollars (integer only).
- Exactly 5 productFeatures, each between 20–80 characters, no special characters except commas, periods, and hyphens.
Return ONLY valid JSON that follows this schema:
${parser.getFormatInstructions()}
`;
    try {
        const response = await llmConfig().invoke(prompt);
        const text = extractText(response.content)
        const jsonText = findJson(text)
        try {
            // First parse attempt
            return await parser.parse(jsonText);
        } catch (parseErr) {
            console.warn("Initial parse failed, retrying with repair prompt...");
            // Retry with a repair instruction
            const repairPrompt = `
The following text is supposed to be valid JSON but may be malformed:
---
${text}
---
Please return ONLY valid JSON that strictly matches this schema:
${parser.getFormatInstructions()}
      `;
            const repairResponse = await llmConfig().invoke(repairPrompt);
            const repairedText = extractText(repairResponse.content)
            const jsonString = findJson(repairedText)
            return await parser.parse(jsonString);
        }
    } catch (err) {
        console.error("Error generating product details:", err);
        throw err;
    }
};
