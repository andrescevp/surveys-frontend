import type {TypedUseSelectorHook,} from "react-redux";
import {useSelector as rawUseSelector} from "react-redux";

// import {applyMiddleware} from "@reduxjs/toolkit";
import {configureStore} from "@reduxjs/toolkit";

// import IDBWrapper, {IdbOptions} from "../utils/IndexedDB";
import breadcrumbsReducer from "./breadcrumbs/slice";
// import createIndexedDBMiddleware from "./createIndexedDBMiddleware";
import questionnaireManagerSlice from "./questionnaire_manager_sidebar/slice";
import questionnaireReducer from "./questionnaires/slice";

// const idbWrapper = new IDBWrapper(IdbOptions);
// const whitelist = {questionnaire_manager_sidebar: true}; // Example whitelist for a slice called "mySlice"
// const persistedState = await idbWrapper.getItem('questionnaire_manager_sidebar') as { [key: string]: IDBValue } || {collapsed: false};

export const store = configureStore({
    reducer: {
        questionnaire: questionnaireReducer,
        breadcrumbs: breadcrumbsReducer,
        questionnaire_manager_sidebar: questionnaireManagerSlice,
    },
    // enhancers: [applyMiddleware(createIndexedDBMiddleware(whitelist, idbWrapper))],
    // preloadedState: {
    //     questionnaire_manager_sidebar: persistedState as QuestionnaireManagerSidebarState
    // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;