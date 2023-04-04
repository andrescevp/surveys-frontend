import {
    BaseQuestionnaire,
    ChildrenInner,
    Iterate,
    NumericQuestion,
    Questionnaire,
    SelectionQuestion,
    SetOfElements as SetOfElementModel,
    TextQuestion
} from "../../../@questionnaire_api";

type QuestionnaireType = Questionnaire | BaseQuestionnaire

export type ElementStringTypes = "set" | "text" | "iterate" | "numeric" | "selection"
export type ElementTypes = TextQuestion | NumericQuestion | SelectionQuestion | SetOfElementModel | Iterate

export interface NewQuestionnaireChild {
    type: ElementStringTypes,
    code: string
}

// questionnaire redux store
export type QuestionnaireState = {
    questionnaire: QuestionnaireType
}
export type QuestionnaireAction = {
    type: string
    questionnaire: Questionnaire
}

export interface TextQuestionFormProperties {
    question: TextQuestion
    questionnaire: Questionnaire,
    parentCodes?: string[],
    onChange: (question: ChildrenInner, questionnaire: Questionnaire, parentCodes?: string[]) => void
}

export interface NumericQuestionFormProperties {
    question: NumericQuestion
    questionnaire: Questionnaire,
    parentCodes?: string[],
    onChange: (question: ChildrenInner, questionnaire: Questionnaire, parentCodes?: string[]) => void
}

export interface ElementFormProperties {
    questionnaire: Questionnaire,
    onChange: (question: ChildrenInner, questionnaire: Questionnaire, parentCodes?: string[]) => void
}