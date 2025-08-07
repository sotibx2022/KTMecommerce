import { createProductCollection } from "@/app/services/typesence/typesenceProductSchema";
(async () => {
    try {
        const result = await createProductCollection();
        console.log("✅ Typesense collection created:", result);
    } catch (err) {
        console.error("❌ Failed to create Typesense collection:", err);
    }
})();
