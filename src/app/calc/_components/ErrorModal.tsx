import { Button, Modal } from "@heroui/react";
import { X } from "lucide-react";

type ErrorModalProps = {
  enable: boolean;
  mistake: string;
  onClose?: ()=> void;
}

export default function ErrorModal({enable, mistake, onClose}: ErrorModalProps) {


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
            <Modal.Icon className="bg-red-400 text-accent-soft-foreground">
              <X className="size-5" color="oklch(39.6% 0.141 25.723)"  />
            </Modal.Icon>
              <Modal.Heading>An error has ocurred :C</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <div className="text-md">
              {mistake}
              <p className="font-bold italic text-"> Please check if your operation is well written. </p>
                </div>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary"
              onPress={()=>onClose?.()}>
              Cancel
            </Button>
            <Button slot="close" variant="danger" onPress={()=>onClose?.()}>Confirm</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
