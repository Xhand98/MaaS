import { Button, Modal } from "@heroui/react";
import { CircleCheck } from "lucide-react";
import MathML from "@/components/MathML";

type CalcModalProps = {
  enable: boolean;
  result: string;
  onClose?: ()=> void;
}

export default function CalcModal({enable, result, onClose}: CalcModalProps) {
  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose?.();
    }
  }
  return (
    <Modal.Backdrop isOpen={enable} onOpenChange={handleOpenChange} className="dark">
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-90">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
              <CircleCheck className="size-5" />
            </Modal.Icon>
              <Modal.Heading>Operation done!</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
                <div className="text-md">
            Your result is: <MathML className="text-md italic text-2xl" mathml={result} />
            <p className="font-bold italic text-"> Operation added to cart! </p>
                </div>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary" onPress={()=>onClose?.()}>
              Cancel
            </Button>
            <Button slot="close" onPress={()=>onClose?.()}>Confirm</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
