import type {PayloadAction} from "@reduxjs/toolkit"
import {createSlice} from "@reduxjs/toolkit";

import {Questionnaire} from "../../@questionnaire_api";
import {QuestionnaireState} from "../../apps/Questionnaire/types/questionnaires";


const initialState: QuestionnaireState = {questionnaire: {code: "", title: "", children: []}}

export const questionnaireSlice = createSlice({
    name: "questionnaires",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Questionnaire>) => {
            return {
                questionnaire: action.payload,
            }
        },
        create: (state, action: PayloadAction<Questionnaire>) => {
            return {
                questionnaire: action.payload,
            }
        },
        update: (state, action: PayloadAction<Questionnaire>) => {
            return {
                questionnaire: action.payload,
            }
        },
    },
});

export const {set, create, update} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
