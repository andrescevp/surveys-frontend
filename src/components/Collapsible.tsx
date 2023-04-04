import React, {PropsWithChildren, ReactNode, useEffect, useState} from "react";

import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons/faChevronUp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Collapsible = ({
                         title,
                         children,
                         open = false,
                         wrapperClassName = "border-b border-gray-200 w-full",
                         buttonClassName = "border-dashed border-gray-300 border-1 flex items-center justify-between w-full px-4 py-2 font-medium text-left text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300",
                         contentClassName = "p-4"
                     }: PropsWithChildren<{
    title: ReactNode,
    open?: boolean,
    wrapperClassName?: string,
    buttonClassName?: string,
    contentClassName?: string,
}>) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setIsOpen(!open)
    }, [open])


    return (
        <div className={wrapperClassName}>
            <button
                className={buttonClassName}
                onClick={toggle}
            >
                <span>{title}</span>
                {isOpen ? (
                    <FontAwesomeIcon icon={faChevronUp}/>
                ) : (
                    <FontAwesomeIcon icon={faChevronDown}/>
                )}
            </button>
            {isOpen && (
                <div className={contentClassName}>{children}</div>
            )}
        </div>
    );
};

export default Collapsible;
