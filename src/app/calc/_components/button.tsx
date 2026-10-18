import { InlineMath } from "react-katex";
import { Button } from "@heroui/react";
import type { ComponentProps } from "react";

export type CalculatorButton = {
  label: string;
  value: string;
  latex?: boolean;
};

type CalcButtonProps = {
  item: CalculatorButton;
  onClick: (value: string) => void;
} & Omit<ComponentProps<typeof Button>, "onClick" | "children">;

export default function CalcButton({
  item,
  onClick,
  className,
  ...buttonProps
}: CalcButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      {...buttonProps}
      onClick={() => onClick(item.value)}
      className={`h-9 w-full rounded-sm ${className ?? ""}`}
    >
      {item.latex ? (
        <InlineMath math={item.label} />
      ) : (
        item.label
      )}
    </Button>
  );
}
