"use client"

import { InlineMath } from "react-katex";

type MathDisplayProps = {
  expression: string;
};

function toLatex(expression: string): string {
  return expression
    .replace(/\bpi\b/g, String.raw`\pi`)
    .replace(/\bans\b/g, String.raw`\text{ans}`)
    .replace(/\*/g, String.raw`\times`)
    .replace(/\//g, String.raw`\div`)
    .replace(/sqrt\(([^()]*)\)/g, String.raw`\sqrt{$1}`)
    .replace(/abs\(([^()]*)\)/g, String.raw`|$1|`)
}

export default function MathDisplay ({
  expression,
}: MathDisplayProps) {
  if (!expression) {
    return (
      <span className="text-zinc-400">Try 2+2</span>
    );
  }

  return (
    <div className="overflow-x-auto text-3xl">
      <InlineMath
        math={toLatex(expression)}
        renderError={()=> (
          <span className="font-mono text-2xl">
            {expression}</span>
        )}
        />
    </div>
  )
}
