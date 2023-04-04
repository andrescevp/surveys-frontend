import type {PayloadAction} from "@reduxjs/toolkit"
import {createSlice} from "@reduxjs/toolkit";

import {BreadcrumbItem, BreadcrumbsState} from "../../types/breadcrumbs";

const initialState: BreadcrumbsState = []

export const breadcrumbsSlice = createSlice({
    name: "breadcrumbs",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<BreadcrumbItem[]>) => {
            return action.payload
        },
    },
});

export const {set} = breadcrumbsSlice.actions;

export default breadcrumbsSlice.reducer;