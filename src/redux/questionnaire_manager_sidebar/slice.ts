import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export type QuestionnaireManagerSidebarState = {
    collapsed: boolean;
};

const initialState: QuestionnaireManagerSidebarState = {
    collapsed: false,
};

const questionnaireManagerSlice = createSlice({
    name: "questionnaire_manager_sidebar",
    initialState,
    reducers: {
        setCollapsed: (state, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload;
        },
    },
});

export const {setCollapsed} = questionnaireManagerSlice.actions;

export default questionnaireManagerSlice.reducer;
