"use client"

// const algebraButtons = [
//   [String.raw`a^2`, String.raw`a^b`, "|a|"],
//   [String.raw`\sqrt{}`, String.raw`\sqrt[n]{x}`, String.raw`\pi`],
//   ["sin", "cos", "tan"],
//   ["(", ")", ","],
// ];

import { useEffect, useState } from "react";
import CalcButton from "./button";
import { Button, Input, Modal, Surface } from "@heroui/react";
import React from "react";
import { CircleCheck } from "lucide-react";
import MathML from "@/components/MathML";
import { useCart } from "@/components/cart-provider";
import { getUser } from "@/lib/user";
import type { PlanId } from "@/lib/user";
import ErrorModal from './ErrorModal'
import CalcModal from './CalculatedModal'
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MathDisplay from "@/components/MathDisplay"

// const numberButtons = [
//   ["7", "8", "9"],
//   ["4", "5", "6"],
//   ["1", "2", "3"],
//   ["0", ".", "ans"],
// ];

// const operations = ["÷", "×", "−", "+"];





const algebraButtons: CalculatorButton[][] = [
  [
    { label: "a²", value: "^2", latex: true, access: "algebra" },
    { label: "aᵇ", value: "^", latex: true, access: "algebra" },
    { label: "|a|", value: "abs()", latex: true, access: "algebra" },
  ],
  [
    { label: "√x", value: "sqrt()", latex: true, access: "algebra" },
    { label: "ⁿ√x", value: "root()", latex: true, access: "algebra" },
    { label: "π", value: "pi", latex: true, access: "algebra" },
  ],
  [
    { label: "sin", value: "sin(", access: "trigonometry" },
    { label: "cos", value: "cos(", access: "trigonometry" },
    { label: "tan", value: "tan(", access: "trigonometry" },
  ],
  [
    { label: "(", value: "(", access: "algebra" },
    { label: ")", value: ")", access: "algebra" },
    { label: ",", value: ",", access: "algebra" },
  ],
];
const numberButtons: CalculatorButton[][] = [
  ["7", "8", "9"].map((n) => ({ label: n, value: n })),
  ["4", "5", "6"].map((n) => ({ label: n, value: n })),
  ["1", "2", "3"].map((n) => ({ label: n, value: n })),
  ["0", ".", "ans"].map((n) => ({ label: n, value: n })),
];

const operations: CalculatorButton[] = [
  { label: "÷", value: "/", access: "arithmetic" },
  { label: "×", value: "*", access: "arithmetic" },
  { label: "−", value: "-", access: "arithmetic" },
  { label: "+", value: "+", access: "arithmetic" },
];

const utilityButtons: CalculatorButton[] = [
  { label: "%", value: "%", access: "percentage" },
  { label: "←", value: "LEFT" },
  { label: "→", value: "RIGHT" },
  { label: "⌫", value: "BACKSPACE" },
  { label: "↵", value: "ENTER" },
];


type AccessLevel =
  | "arithmetic"
  | "percentage"
  | "algebra"
  | "trigonometry";

const PLAN_ACCESS: Record<AccessLevel, PlanId[]> = {
  arithmetic: [
    "free",
    "basic-arithmetic",
    "pre-algebra",
    "algebra-1",
  ],
  percentage: [
    "basic-arithmetic",
    "pre-algebra",
    "algebra-1",
  ],
  algebra: ["pre-algebra", "algebra-1"],
  trigonometry: ["algebra-1"],
};

export type CalculatorButton = {
  label: string;
  value: string;
  latex?: boolean;
  access?: AccessLevel;
}


const REQUIRED_PLAN: Record<AccessLevel, PlanId> = {
  arithmetic: "free",
  percentage: "basic-arithmetic",
  algebra: "pre-algebra",
  trigonometry: "algebra-1",
};

const PLAN_NAMES: Record<PlanId, string> = {
  free: "Free",
  "basic-arithmetic": "Basic Arithmetic",
  "pre-algebra": "Pre-Algebra",
  "algebra-1": "Algebra 1",
};

function getRequiredPlan(item: CalculatorButton): PlanId {
  return item.access ? REQUIRED_PLAN[item.access] : "free";
}

export default function Calculator() {
  const [expression, setExpression] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [userPlan, setUserPlan] = React.useState<PlanId>("free");
  const [requiredPlan, setRequiredPlan] = useState<{
    feature: string;
    plan: string;
  } | null>(null);

  const router = useRouter()

  useEffect(() => {
    const user = getUser();
    setUserPlan(user?.planId ?? "free")
  }, []);

  function canUseButton(item: CalculatorButton) {
    if (!item.access) return true;

    return PLAN_ACCESS[item.access].includes(userPlan);
  }

  const { addToCart } = useCart()

  function canCalculateExpression(expression: string) {
    const requirements: {
      pattern: RegExp;
      access: AccessLevel;
    }[] = [
      { pattern: /%/, access: "percentage" },
      {
        pattern: /\^|sqrt\(|root\(|abs\(|\bpi\b/,
        access: "algebra",
      },
      {
        pattern: /\b(sin|cos|tan)\s*\(/,
        access: "trigonometry",
      },
    ];

    return requirements.every(
      ({ pattern, access }) =>
        !pattern.test(expression) ||
        PLAN_ACCESS[access].includes(userPlan),
    );
  }

  async function handleCal() {
    if (!canCalculateExpression(expression)) {
      setError("Your current plan doesn't support this expression.");
      return;
    }
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
      addToCart(`Math operation: ${expression}`, 10);
      setIsOpen(true)
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
        break;

      case "LEFT":
      case "RIGHT":

        break;

      default:
        setExpression((previous) => previous + value)
    }
  }

  return (
    <div className="p-6">
      <Surface className="flex min-w-[320px] min-h-60 border-l-0 rounded-xl border-b-0 flex-col gap-3  p-6" variant="default">
           {/*<Input disabled value={expression} placeholder="Try 2+2" variant="secondary" className={"min-h-36 text-2xl"} />*/}
           <div className="w-full text-right">
             <MathDisplay expression={expression} />
           </div>
      </Surface>
      <div className="grid grid-cols-[1fr_1.2fr_0.7fr_0.8fr] gap-1.5 bg-neutral-900 p-6">
      {/* Algebra */}
      <div className="grid grid-cols-3 gap-1 mr-5">
        {algebraButtons.flat().map((item, index) => (
          <CalcButton
            key={`algebra-${index}`}
            item={item}
            onClick={(value) => {
              if (!canUseButton(item)) {
                setRequiredPlan({
                  feature: item.label,
                  plan: PLAN_NAMES[getRequiredPlan(item)],
                });
                return;
              }

              insertValue(value);
            }}
          />
        ))}
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-3 gap-1 mr-5">
        {numberButtons.flat().map((item, index) => (
          <CalcButton
            key={`number-${index}`}
            item={item}
            onClick={insertValue}
          />
        ))}
      </div>

      {/* Basic operations */}
      <div className="grid grid-cols-1 gap-1">
        {operations.map((item) => (
          <CalcButton
            key={item.label}
            item={item}
            onClick={(value) => {
              if (!canUseButton(item)) {
                setRequiredPlan({
                  feature: item.label,
                  plan: PLAN_NAMES[getRequiredPlan(item)],
                });
                return;
              }

              setError("");
              insertValue(value);
            }}
          />
        ))}
      </div>

      {/* Utility keys */}
      <div className="grid grid-cols-2 gap-1">
        {utilityButtons.map((item) => (
          <CalcButton
            key={item.label}
            item={item}
            onClick={(value) => {
              if (!canUseButton(item)) {
                setRequiredPlan({
                  feature: item.label,
                  plan: PLAN_NAMES[getRequiredPlan(item)],
                });
                return;
              }

              setError("");
              insertValue(value);
            }}
          />
        ))}
        </div>
      </div>
      <ErrorModal enable={Boolean(error)}
        mistake={error}
     onClose={() => setError("")} />
     <CalcModal
     enable={Boolean(isOpen)}
     result={result}
     onClose={() => {setIsOpen(false);
       setResult("")}}
     />

     <AnimatePresence>
       {requiredPlan && (
         <motion.div
           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={() => setRequiredPlan(null)}
         >
           <motion.div
             role="dialog"
             aria-modal="true"
             aria-labelledby="upgrade-title"
             className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
             initial={{ opacity: 0, scale: 0.96, y: 12 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.96, y: 12 }}
             onClick={(event) => event.stopPropagation()}
           >
             <h2 id="upgrade-title" className="text-xl font-semibold">
               Plan upgrade required
             </h2>

             <p className="mt-3 text-sm leading-6 text-zinc-500">
               You need the <strong>{requiredPlan.plan}</strong> plan
               to use <strong>{requiredPlan.feature}</strong>.
             </p>

             <div className="mt-6 flex gap-3">
               <Button
                 variant="outline"
                 className="flex-1"
                 onClick={() => setRequiredPlan(null)}
               >
                 Maybe later
               </Button>

               <Button
                 className="flex-1"
                 onClick={() => {
                   setRequiredPlan(null);
                   router.push("/pricing");
                 }}
               >
                 View plans
               </Button>
             </div>
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>

    </div>
  )
}
