"use client";

import "katex/dist/katex.min.css";
import MathML from "@/components/MathML";
// import { Button } from "@/components/ui/button";
import { Input, Surface, Button } from "@heroui/react";
import React from "react";
import Calculator from "./_components/calculator";

export default function CalcPage() {
  const [calc, setCalc] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleCal() {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await fetch("api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: calc }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Request File");
      }

      const answerPod = data.pods?.find(
        (pod: { primary?: boolean }) => pod.primary,
      );

      const answer = answerPod?.subpods
        ?.map((subpod: { mathml?: string }) => subpod.mathml)
        .filter(Boolean)
        .join("\n");

      console.log("Wolfram response:", data);
      console.log("Pods:", data.pods);

      setResult(answer ?? "No answer found");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" bg-slate-500 dark flex min-h-screen items-center justify-center">
      <main>
        <Calculator />
      </main>
    </div>
  );
}
