import {ReactNode} from "react";

export interface FormInputType extends JSX.Element {
    id?: string;
}

export interface FormControlProperties {
    title?: string;
    input: FormInputType;
    helpText?: string
    required?: boolean
    errorsChildren?: ReactNode | undefined
    className?: string
    inline?: boolean
}