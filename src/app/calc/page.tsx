"use client";

import "katex/dist/katex.min.css";
import Calculator from "./_components/calculator";

export default function CalcPage() {
  return (

    <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark flex min-h-screen items-center justify-center">
        <Calculator />
    </div>
  );
}
