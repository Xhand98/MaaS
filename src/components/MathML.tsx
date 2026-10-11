"use client"

import { ComponentProps } from "react";

type MathMLProps = Omit<ComponentProps<"div">, "ref" | "dangerouslySetInnerHTML"> & {
  mathml: string;
};

export default function MathML({ mathml, className, ...props }: MathMLProps) {
  return (<div {...props}
               className={`math-result ${className ?? ""}`}
               dangerouslySetInnerHTML={{__html: mathml}} />
)
}
