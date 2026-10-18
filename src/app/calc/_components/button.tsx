import { InlineMath } from "react-katex"
import { Button } from "@heroui/react"
import CalculatorButton from "./calculator"
import { Modal } from "@heroui/react"

export type CalculatorButton = {
  label: string;
  value: string;
  latex?: boolean;
};

type CalcButtonProps = {
  item: CalculatorButton,
  onClick: (value: string) => void
}

export default function CalcButton({item, onClick}: CalcButtonProps) {
  return (<>
    <Button
      type="button"
      variant="outline"
      onClick={() => onClick(item.value)}
      className="h-9 w-full rounded-sm"
    >
      {item.latex ? (
        <InlineMath math={item.label} />
      ) : (
        item.label
      )}
    </Button>
  </>)
}
