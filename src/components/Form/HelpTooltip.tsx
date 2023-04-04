import React, {createRef, ReactNode, RefObject, useEffect, useState} from "react";

import {createPopper} from "@popperjs/core";
import clsx from "clsx";

const HelpTooltip = ({
                         targetRef,
                         title,
                         content
                     }: { targetRef: RefObject<HTMLDivElement>, title?: ReactNode, content?: ReactNode }) => {
    const [tooltipShow, setTooltipShow] = useState(false);
    const tooltipRef = createRef<HTMLDivElement>();


    useEffect(() => {
        const target = targetRef.current as HTMLDivElement
        const tooltip = tooltipRef.current as HTMLElement

        const openLeftTooltip = () => {
            createPopper(target, tooltip);
            setTooltipShow(true);
        };

        const closeLeftTooltip = () => {
            setTooltipShow(false);
        };
        target.addEventListener('mouseenter', openLeftTooltip);
        target.addEventListener('mouseleave', closeLeftTooltip);

        return () => {
            target.removeEventListener('mouseenter', openLeftTooltip);
            target.removeEventListener('mouseleave', closeLeftTooltip);
        };
    }, []);

    return (content ?
            <div
                ref={tooltipRef}
                className={clsx("bg-gray-200 border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded card", !tooltipShow && "hidden")}
            >
                <div>
                    {title && <div
                        className={
                            "opacity-75 font-semibold p-3 mb-0 border-b border-solid border-slate-100 uppercase rounded-t-lg float-left"
                        }
                    >
                        {title}
                    </div>}
                    <div>
                        {content}
                    </div>
                </div>
            </div> : <></>
    );
};

export default HelpTooltip
