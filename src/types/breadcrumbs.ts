// redux breadcrumbs
import {PropsWithChildren, ReactNode} from "react";

export interface BreadcrumbItem {
    label: string | ReactNode,
    to: string,
    title: string
}

export type BreadcrumbsState = BreadcrumbItem[]
export type BreadcrumbsAction = {
    type: string
    breadcrumbs: BreadcrumbItem[]
}
export type BreadcrumbsActionDispatchType = (args: BreadcrumbsAction) => BreadcrumbsAction

export interface BreadcrumbsProperties extends PropsWithChildren {
    items: {
        label: string,
        to: string,
        icon?: JSX.Element
    }[]
}