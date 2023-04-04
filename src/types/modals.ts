import {PropsWithChildren, ReactNode} from "react";

export interface ModalProperties extends PropsWithChildren {
    title?: string;
    onCloseAction?: () => void;
    openBtnChildren?: ReactNode | undefined
    okBtnComponent?: ReactNode | undefined
    closeBtnComponent?: ReactNode | undefined
}