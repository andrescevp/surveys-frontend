import {Dispatch, SetStateAction} from "react";

export interface NavbarProperties {
    darkToggle?: boolean;
    setDarkToggle?: Dispatch<SetStateAction<boolean>>;
}