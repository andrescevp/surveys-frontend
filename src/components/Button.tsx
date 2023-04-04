import React, {FC, LegacyRef, PropsWithChildren, Ref} from 'react';
import {Link} from 'react-router-dom';

import clsx from "clsx";

import Spinner from "./Spinner";

interface ButtonProps extends PropsWithChildren {
    title: string;
    linkTo?: string;
    linkToExternal?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string
    type?: 'button' | 'submit'
    ref?: Ref<HTMLAnchorElement | HTMLButtonElement> | LegacyRef<HTMLAnchorElement | HTMLButtonElement>
    disabled?: boolean
    loadingClickAction?: boolean
}

const Button: FC<ButtonProps> = ({
                                     title,
                                     children,
                                     icon,
                                     onClick,
                                     linkTo,
                                     linkToExternal,
                                     className = 'bg-blue-500 btn-default hover:bg-blue-700 text-white uppercase',
                                     type = 'button',
                                     ref,
                                     disabled,
                                     loadingClickAction
                                 }) => {
    const disableComponent = disabled || loadingClickAction
    const btnIcon = icon ? <div className="mr-2">{icon}</div> : <></>
    const onClickNone = () => {
    }

    if (linkTo) {
        return (
            <Link
                ref={ref as Ref<HTMLAnchorElement>}
                className={clsx(className, disableComponent && 'cursor-not-allowed')}
                title={title}
                to={disabled ? '#' : linkTo}
                onClick={disabled ? onClickNone : onClick}
            >
                {loadingClickAction ? <Spinner/> : btnIcon}
                <span className="text-xs text-gray-200 w-full">{children}</span>
            </Link>
        );
    }

    if (linkToExternal) {
        return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
                ref={ref as Ref<HTMLAnchorElement>}
                className={clsx(className, disableComponent && 'cursor-not-allowed')}
                href={disabled ? '#' : linkTo}
                rel="noopener noreferrer"
                target="_blank"
                title={title}
                onClick={disabled ? onClickNone : onClick}
            >
                {loadingClickAction ? <Spinner/> : btnIcon}
                <span className="text-xs text-gray-200 w-full">{children}</span>
            </a>
        );
    }

    return (
        <button
            ref={ref as Ref<HTMLButtonElement>}
            className={clsx(className, disableComponent && 'cursor-not-allowed')}
            disabled={disabled}
            title={title}
            type={type}
            onClick={disabled ? onClickNone : onClick}
        >
            {loadingClickAction ? <Spinner/> : btnIcon}
            <span className="text-xs text-gray-200 w-full">{children}</span>
        </button>
    );
};

export default Button;
