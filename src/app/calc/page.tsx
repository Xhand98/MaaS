"use client";

import "katex/dist/katex.min.css";
import MathML from "@/components/MathML";
import { Button } from "@/components/ui/button";
import React from "react";

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
      <div className="relative h-[94dvh] w-full bg-white">
    <main className="pt-40">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
          <input
            value={calc}
            onChange={(e) => setCalc(e.target.value)}
            placeholder="Try 2+2"
          />

          <Button onClick={handleCal} isDisabled={loading || calc === ""}>
            {loading ? "Calculating..." : "Calculate"}
          </Button>

          <h1>Calc</h1>
          {result && <MathML mathml={result} />}
          {error && <p role="alert">{error}</p>}
      </div>

    </main>
        </div>
  );
};
