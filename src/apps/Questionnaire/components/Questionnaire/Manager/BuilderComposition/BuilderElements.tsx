import React from "react";

import {
    Iterate,
    NumericQuestion,
    Questionnaire,
    SelectionQuestion,
    SetOfElements as SetOfElementsModel,
    TextQuestion
} from "../../../../../../@questionnaire_api";
import IterateElement from "./IterateElement";
import QuestionElement from "./QuestionElement";
import SetOfElements from "./SetOfElements";

type ElementType = { index: number, element: TextQuestion | NumericQuestion | SelectionQuestion | SetOfElementsModel | Iterate }

export const BuilderElements = ({
                                    items,
                                    moveItem,
                                    onEnd,
                                    canDrag,
                                    questionnaire
                                }: { questionnaire: Questionnaire, canDrag: boolean, items: { code: string, type: any, position: number, children?: any[] }[], moveItem: (dragIndex: number, hoverIndex: number) => void, onEnd: (result: ElementType | null) => void }) => {
    const renderElement = (element: TextQuestion | NumericQuestion | SelectionQuestion | SetOfElementsModel | Iterate, index) => {
        if (element?.type as string === "text") {
            return <QuestionElement
                key={`${element.code}_${index as number}`}
                canDrag={canDrag}
                element={element as TextQuestion}
                index={index as number}
                moveItem={moveItem}
                questionnaire={questionnaire}
                onEnd={onEnd}
            />
        }
        if (element?.type as string === "numeric") {
            return <QuestionElement
                key={`${element.code}_${index as number}`}
                canDrag={canDrag}
                element={element as NumericQuestion}
                index={index as number}
                moveItem={moveItem}
                questionnaire={questionnaire}
                onEnd={onEnd}
            />
        }
        if (element?.type as string === "selection") {
            return <QuestionElement
                key={`${element.code}_${index as number}`}
                canDrag={canDrag}
                element={element as SelectionQuestion}
                index={index as number}
                moveItem={moveItem}
                questionnaire={questionnaire}
                onEnd={onEnd}
            />
        }

        if (element?.type as string === 'set') {
            return <SetOfElements key={`${element.code}_${index as number}`} canDrag={canDrag}
                                  element={element as SetOfElementsModel} index={index as number}
                                  moveItem={moveItem}
                                  questionnaire={questionnaire}
                                  onEnd={onEnd}/>
        }
        if (element?.type as string === 'iterate') {
            return <IterateElement key={`${element.code}_${index as number}`} canDrag={canDrag}
                                   element={element as Iterate} index={index as number}
                                   moveItem={moveItem}
                                   questionnaire={questionnaire}
                                   onEnd={onEnd}/>
        }
        return null;
    };
    return <section>{items.map(renderElement)}</section>;
}