import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {faClose} from '@fortawesome/free-solid-svg-icons/faClose';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import useClickOutside from '../hooks/useClickOutside';
import Button from './Button';


interface Props extends PropsWithChildren {
    isOpen?: boolean;
    onClose?: () => void;
    onClickOutside?: () => void;
}

const Overlay: React.FC<Props> = ({isOpen, onClose, children, onClickOutside}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [t] = useTranslation()
    const positionInScreen = 'left-0'
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleClickOutside = () => onClickOutside && onClickOutside();

    useClickOutside(ref, handleClickOutside);

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-70"></div>
                    <div
                        className={clsx("fixed right-0 top-0 left-0 z-50 w-full h-full flex items-center transition-all duration-500", isMounted && 'transform translate-x-0')}>
                        <div ref={ref}
                             className={`darkeable max-w-screen-lg w-full h-full px-4 bg-gray-100 absolute ${positionInScreen}`}>
                            <div className="absolute top-0 right-0 m-4">
                                <Button className='btn-default border-0 font-bold hover:bg-gray-200' title={t('Close')}
                                        onClick={onClose && onClose}><span
                                    className='hidden'>{t('Close')}</span><FontAwesomeIcon
                                    className='text-gray-900  text-xl' icon={faClose}/></Button>
                            </div>
                            <div className='flex w-full h-full py-2'>
                                <div
                                    className="items-center flex darkeable-light rounded-lg overflow-hidden mr-10 p-2 w-full h-full">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Overlay;
