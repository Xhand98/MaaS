"use client"

// const algebraButtons = [
//   [String.raw`a^2`, String.raw`a^b`, "|a|"],
//   [String.raw`\sqrt{}`, String.raw`\sqrt[n]{x}`, String.raw`\pi`],
//   ["sin", "cos", "tan"],
//   ["(", ")", ","],
// ];

import { useState } from "react";
import CalcButton from "./button";
import { Button, Input, Modal, Surface } from "@heroui/react";
import React from "react";
import { CircleCheck } from "lucide-react";
import MathML from "@/components/MathML";

// const numberButtons = [
//   ["7", "8", "9"],
//   ["4", "5", "6"],
//   ["1", "2", "3"],
//   ["0", ".", "ans"],
// ];

// const operations = ["÷", "×", "−", "+"];



export type CalculatorButton = {
  label: string,
  value: string,
  latex?: boolean
}

const algebraButtons: CalculatorButton[][] = [
  [
    { label: "a^2", value: "^2", latex: true },
    { label: "a^b", value: "^", latex: true },
    { label: "|a|", value: "abs()", latex: true },
  ],
  [
    { label: String.raw`\sqrt{x}`, value: "sqrt()", latex: true },
    { label: String.raw`\sqrt[n]{x}`, value: "root()", latex: true },
    { label: String.raw`\pi`, value: "pi", latex: true },
  ],
  [
    { label: "sin", value: "sin(" },
    { label: "cos", value: "cos(" },
    { label: "tan", value: "tan(" },
  ],
  [
    { label: "(", value: "(" },
    { label: ")", value: ")" },
    { label: ",", value: "," },
  ],
];

const numberButtons: CalculatorButton[][] = [
  ["7", "8", "9"].map((n) => ({ label: n, value: n })),
  ["4", "5", "6"].map((n) => ({ label: n, value: n })),
  ["1", "2", "3"].map((n) => ({ label: n, value: n })),
  ["0", ".", "ans"].map((n) => ({ label: n, value: n })),
];

const operations: CalculatorButton[] = [
  { label: "÷", value: "/" },
  { label: "×", value: "*" },
  { label: "−", value: "-" },
  { label: "+", value: "+" },
];

export default function Calculator() {
  const [expression, setExpression] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleCal() {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: expression }),
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

      setResult(answer ?? "No answer found");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function insertValue(value: string) {
    switch (value) {
      case "BACKSPACE":
        setExpression((previous) => previous.slice(0, -1))
        break;

      case "ENTER":
        void handleCal();
        setIsOpen(true)
        break;

      case "LEFT":
      case "RIGHT":

        break;

      default:
        setExpression((previous) => previous + value)
    }
  }

  return (
    <div>
      <Surface className="flex min-w-[320px] min-h-60 border-l-0 rounded-xl border-b-0 flex-col gap-3  p-6" variant="default">
           <Input disabled value={expression} placeholder="Try 2+2" variant="secondary" className={"min-h-36 text-2xl"} />
      </Surface>
      <div className="grid grid-cols-[1fr_1.2fr_0.7fr_0.8fr] gap-1.5 bg-neutral-900 p-1.5">
      {/* Algebra */}
      <div className="grid grid-cols-3 gap-1 mr-5">
        {algebraButtons.flat().map((item, index) => (
          <CalcButton
            key={`algebra-${index}`}
            item={item}
            onPress={insertValue}
          />
        ))}
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-3 gap-1 mr-5">
        {numberButtons.flat().map((item, index) => (
          <CalcButton
            key={`number-${index}`}
            item={item}
            onPress={insertValue}
          />
        ))}
      </div>

      {/* Basic operations */}
      <div className="grid grid-cols-1 gap-1">
        {operations.map((item) => (
          <CalcButton
            key={item.label}
            item={item}
            onPress={insertValue}
          />
        ))}
      </div>

      {/* Utility keys */}
      <div className="grid grid-cols-2 gap-1">
        {[
          { label: "%", value: "%" },
          { label: String.raw`\frac{a}{b}`, value: "/", latex: true },
          { label: "←", value: "LEFT" },
          { label: "→", value: "RIGHT" },
          { label: "⌫", value: "BACKSPACE" },
          { label: "↵", value: "ENTER" },
        ].map((item) => (
          <CalcButton
            key={item.label}
            item={item}
            onPress={insertValue}
          />
        ))}
        </div>
      </div>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} className="dark">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <CircleCheck className="size-5" />
              </Modal.Icon>
                <Modal.Heading>{loading ? "Loading..." : "Operation done!"}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                {loading ? (
                  "Loading..."
                ) : (
                  <div className="text-md">
              Your result is: <MathML className="text-md italic text-2xl" mathml={result} />
              <p className="font-bold italic text-"> Operation added to cart! </p>
                  </div>
                )}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Confirm</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  )
}
