import React from "react";


import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import {FormControlProperties} from "../../types/forms";
import HelpTooltip from "./HelpTooltip";


const FormControl = ({
                         title,
                         input,
                         helpText,
                         required,
                         errorsChildren,
                         className = 'mb-2',
                         inline,
                     }: FormControlProperties) => {
    const helpIconRef = React.createRef<HTMLDivElement>();
    return (
        <div className={className}>
            <div className="md:flex md:items-center md:w-full">
                <div className={clsx('flex w-full', inline ? 'flex-row' : 'flex-col')}>
                    <div className='flex items-center'>
                        {title && <label
                            className={clsx("form-control-label flex", errorsChildren && 'text-red-700')}
                            htmlFor={input.id}
                        >
                            {title} {required && '*'}
                            {helpText &&
                                <div>
                                    <div ref={helpIconRef}><FontAwesomeIcon className="mx-2 hover:text-primary-700"
                                                                            icon={faQuestionCircle}/>
                                    </div>
                                    <HelpTooltip content={helpText} targetRef={helpIconRef}/>
                                </div>}
                        </label>}
                    </div>
                    <div className='w-full'>
                        <div>{input}</div>
                        {errorsChildren &&
                            <div
                                className={clsx('card p-1 text-sm text-semibold mb-1 border-1 border-red-400 bg-red-200')}>
                                {errorsChildren}
                            </div>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FormControl;
