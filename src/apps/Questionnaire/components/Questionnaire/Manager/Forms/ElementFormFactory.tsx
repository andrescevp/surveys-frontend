import React, {useState} from "react";
import {useParams} from "react-router-dom";

import {ChildrenInner, NumericQuestion, TextQuestion} from "../../../../../../@questionnaire_api";
import {ElementFormProperties} from "../../../../types/questionnaires";
import NumericQuestionForm from "./NumericQuestionForm";
import TextQuestionForm from "./TextQuestionForm";

const ElementFormFactory = ({
                                questionnaire,
                                onChange
                            }: ElementFormProperties) => {
    const {code, parentCodes} = useParams();
    const [element, setElement] = useState<ChildrenInner>()
    if (parentCodes) {
        // @ todo nesting logic
    }

    const currentElement = questionnaire.children?.find((children) => children.code === code)
    if (element?.code !== currentElement?.code) {
        setElement(currentElement)
    }

    if (element && element.type === 'text') {
        console.log(element)
        return <TextQuestionForm question={element as TextQuestion} questionnaire={questionnaire} onChange={onChange}/>
    }

    if (element && element.type === 'numeric') {
        console.log(element)
        return <NumericQuestionForm question={element as NumericQuestion} questionnaire={questionnaire}
                                    onChange={onChange}/>
    }
    return <div></div>
}

export default ElementFormFactory