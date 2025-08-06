import { smartSearch } from "@/config/smartSearch";
import { NextRequest, NextResponse } from "next/server";
// app/api/smartSearch/route.ts
export async function POST(request: NextRequest) {
  console.log("=== API REQUEST STARTED ===");
  try {
    // Parse ONCE and reuse
    const requestData = await request.json();  // Parse as JSON first
    console.log("Request data:", requestData);
    const { query } = requestData;
    console.log("Extracted query:", query);
    if (!query) {
      console.error("No query provided");
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }
    const result = await smartSearch(query);
    console.log("Result:", result);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}