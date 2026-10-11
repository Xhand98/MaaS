import { NextRequest, NextResponse } from "next/server";
import query from "@/lib/wolfram";

export async function POST(req: NextRequest) {
  try {
      const { input } = await req.json();

      if (typeof input !== "string" || !input.trim()) {
        return NextResponse.json(
          { error: "Please enter an expression." },
          { status: 400 },
        );
      }

      const result = await query(input, "json");

      return NextResponse.json(result.queryresult);
    } catch (error) {
      console.error("Wolfram query failed:", error);

      return NextResponse.json(
        { error: "Calculation failed." },
        { status: 500 },
      );
    }
}
