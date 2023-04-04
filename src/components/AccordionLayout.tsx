import React from 'react';
import {BsFillArrowUpCircleFill} from 'react-icons/bs';

import {AccordionLayoutProperties} from "../types/collapsables";

const AccordionLayout = ({title, children}: AccordionLayoutProperties) => (
    <>
        <div className='flex w-1/2 justify-between p-2 mt-2 rounded bg-green-400'>
            <div className='flex'>
                <div className='text-white font-bold'>{title}</div>
            </div>
            <div className="flex items-center justify-center">
                <BsFillArrowUpCircleFill className='w-8 h-8'/>
            </div>
        </div>
        <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
            {children}
        </div>
    </>
);

export default AccordionLayout
