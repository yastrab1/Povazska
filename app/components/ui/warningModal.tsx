import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";

interface Props {
    open: boolean;
    onClose: (shouldContinue: boolean) => void;
}

export default function WarningModal({open, onClose}: Props) {
    return (
        <Dialog open={open}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ste si istí?</DialogTitle>
                    <DialogDescription>
                        Bez obrázku naše služby nedokážu automaticky priradiť popis problému, preto ho budete musieť
                        vypisovať sami.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">

                    <Button type="button" variant="destructive" onClick={() => onClose(true)}>
                        Continue
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="default" onClick={() => onClose(false)}>
                            Return
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}