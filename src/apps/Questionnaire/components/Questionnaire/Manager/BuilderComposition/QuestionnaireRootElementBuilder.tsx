import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useTranslation} from "react-i18next";

import update from "immutability-helper";

import {BaseQuestionnaire, ChildrenInner, Questionnaire} from "../../../../../../@questionnaire_api";
import {NewQuestionnaireChild} from "../../../../types/questionnaires";
import {BuilderElements} from "./BuilderElements";
import NewQuestionnaireElementForm from "./NewQuestionnaireElementForm";


const QuestionnaireRootElementBuilder = ({
                                             questionnaire,
                                             setQuestionnaire
                                         }: { questionnaire: BaseQuestionnaire, setQuestionnaire: Dispatch<SetStateAction<Questionnaire | undefined>> }) => {
    const [t] = useTranslation();
    const [elements, setElements] = useState<ChildrenInner[]>(questionnaire.children || [])
    const [lastElementAdded, setLastElementAdded] = useState<NewQuestionnaireChild>()
    const [collapseElements, setCollapseElements] = useState(false)
    const [canDrag, setCanDrag] = useState(false)

    const toggleCollapse = () => setCollapseElements(!collapseElements)
    const toggleCanDrag = () => {
        console.log('can drag', !canDrag)
        setCanDrag(!canDrag)
    }

    useEffect(() => {
        if (!lastElementAdded) {
            return
        }
        if (elements.find((v) => v.code === lastElementAdded.code)) {
            return;
        }
        const newElements: ChildrenInner[] = [...elements]
        const position = newElements.length > 0 ? newElements[newElements.length - 1].position + 1 : 0
        if (['text', 'numeric', 'selection'].includes(lastElementAdded?.type)) {
            newElements.push({
                code: lastElementAdded.code,
                type: lastElementAdded.type as "text" | "numeric" | "selection",
                label: "",
                position: position
            })
        }
        if (['set'].includes(lastElementAdded?.type)) {
            newElements.push({
                code: lastElementAdded.code,
                type: lastElementAdded.type as "set",
                label: "",
                position: position,
                children: []
            })
        }
        if (['iterate'].includes(lastElementAdded?.type)) {
            newElements.push({
                code: lastElementAdded.code,
                type: lastElementAdded.type as "iterate",
                label: "",
                position: position,
                children: [],
                iterations: []
            })
        }
        setElements(newElements)
    }, [lastElementAdded])

    // const [dustbin, setDustbin] = useState<DustbinState>({accepts: [TEXT_TYPE], lastDroppedItem: null})
    const moveItem = (dragIndex: number, hoverIndex: number) => {
        setElements((current) => {
            const draggedElement = current[dragIndex];
            const newPosition = hoverIndex;

            const newElements = current.map((element) => {
                if (element === draggedElement) {
                    return {...element, position: newPosition};
                } else if (
                    element.position >= Math.min(dragIndex, hoverIndex) &&
                    element.position <= Math.max(dragIndex, hoverIndex)
                ) {
                    const diff = dragIndex < hoverIndex ? -1 : 1;
                    return {...element, position: element.position + diff};
                } else {
                    return element;
                }
            });

            return update(newElements, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, {...draggedElement, position: newPosition}]],
            }).sort((a, b) => a.position - b.position)
        });
    };

    useEffect(() => {
        console.log(elements)
        setQuestionnaire((current) => {
            if (current) {
                return {...current, children: elements}
            }
        })
    }, [elements])

    const onEnd = (result) => {
        if (result === null) {
            return
        }
    }

    return (<div className='card p-1'>
        <NewQuestionnaireElementForm onAdd={setLastElementAdded} onBlockBtnClick={toggleCanDrag}
                                     onCollapseBtnClick={toggleCollapse}/>
        <div className='card p-1 my-1 bg-gray-200'>
            <DndProvider backend={HTML5Backend}>
                <BuilderElements
                    canDrag={canDrag}
                    items={elements}
                    moveItem={moveItem}
                    questionnaire={questionnaire}
                    onEnd={onEnd}
                />
            </DndProvider>
        </div>
    </div>)
}

export default QuestionnaireRootElementBuilder