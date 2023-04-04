import React, {useRef, useState} from 'react'
import {useDrag, useDrop} from 'react-dnd';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import {faUpDown} from "@fortawesome/free-solid-svg-icons/faUpDown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import {Iterate, Questionnaire} from "../../../../../../@questionnaire_api";
import Collapsible from "../../../../../../components/Collapsible";
import {DROP_TYPE} from "./types";

export interface IterateElementProperties {
    questionnaire: Questionnaire
    element: Iterate
    index: number,
    moveItem: (dragIndex: number, hoverIndex: number) => void,
    onEnd: (result: { element: Iterate, index: number } | null) => void
    canDrag?: boolean
}

const IterateElement = ({questionnaire, element, index, moveItem, onEnd, canDrag}: IterateElementProperties) => {
    const [t] = useTranslation()
    const ref = useRef(null);
    const navigate = useNavigate()
    const childrenDndRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
    const [, drop] = useDrop({
        // Accept will make sure only these element type can be droppable on this element
        accept: DROP_TYPE,
        hover: (item: IterateElementProperties) => { // item is the dragged element
            if (!ref.current) {
                return;
            }
            setIsHovered(true)
            const dragIndex = item.index;
            // current element where the dragged element is hovered on
            const hoverIndex = index;
            // If the dragged element is hovered in the same place, then do nothing
            if (dragIndex === hoverIndex) {
                setIsHovered(false)
                return;
            }
            // If it is dragged around other elements, then move the image and set the state with position changes
            moveItem(dragIndex, hoverIndex);
            /*
              Update the index for dragged item directly to avoid flickering
              when the image was half dragged into the next
            */
            item.index = hoverIndex;
        }
    });

    // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
    const [{isDragging}, drag] = useDrag(() => ({
        // what type of item this to determine if a drop target accepts it
        type: DROP_TYPE,
        canDrag: canDrag,
        // data of the item to be available to the drop methods
        item: {element: element, index},
        // method to collect additional data for drop handling like whether is currently being dragged
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                const result: { element: Iterate, index: number } | null = monitor.getDropResult()
                onEnd(result)
            }
            setIsHovered(false)
        }
    }), [canDrag]);

    drag(drop(ref));

    return <div ref={ref}>
        <div
            className={clsx('card p-1 flex-col gap-2 items-center w-full', canDrag || 'bg-gray-200 cursor-pointer', canDrag && 'cursor-move', isDragging && 'opacity-40')}
            role="presentation"
            title={`${t('Question')}: ${element.code}`}
            onClick={() => navigate(`/questionnaires/manage/${questionnaire.uuid || ""}/builder/element/${element.code}`)}>
            <Collapsible
                buttonClassName={'flex items-center justify-between w-full'}
                contentClassName={''}
                open={isHovered}
                title={
                    <span className='flex items-center gap-2 w-full'>
                {canDrag && <span className='text-sm ml-1'>
                <FontAwesomeIcon className={'text-gray-800'} icon={faUpDown}/>
            </span>}
                        <span className='bg-gray-300 p-1 rounded text-gray-900 font-semibold'><span
                            className={'hidden'}>{t('Pos')}:</span>{element.position}</span>
                <span className='bg-green-300 p-1 rounded text-gray-900 font-semibold'>{t('Iterate')}</span>
                        {/*<span className='font-bold'>{t('Question')}:</span>*/}
                        <span className='text-gray-800 font-bold text-lg'>{element.code}</span>
            </span>
                }
                wrapperClassName={''}
            >
            </Collapsible>
        </div>
    </div>
}

export default IterateElement