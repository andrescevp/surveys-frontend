import React, {useRef} from "react";
import {useTranslation} from "react-i18next";

import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import useClickOutside from "../hooks/useClickOutside";
import {ModalProperties} from "../types/modals";
import Button from "./Button";

const Modal = ({
                   children,
                   title,
                   openBtnChildren,
                   okBtnComponent,
                   closeBtnComponent,
                   onCloseAction
               }: ModalProperties) => {
    const [t] = useTranslation();
    const [showModal, setShowModal] = React.useState(false);
    const wrapperRef = useRef(null);

    const onClickClose = () => {
        setShowModal(false)
        if (onCloseAction) {
            onCloseAction()
        }
    }

    useClickOutside(wrapperRef, () => setShowModal(false));

    return (
        <>
            <Button
                title={t('Open')}
                onClick={() => setShowModal(true)}
            >
                {openBtnChildren ? openBtnChildren : t("Open modal")}
            </Button>
            <div
                className={`opacity-25 fixed inset-0 z-40 bg-black ${
                    showModal ? "block visible" : "hidden invisible"
                } transition-all duration-300`}
            ></div>
            <div

                className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-opacity duration-300 ${
                    showModal ? "block visible" : "hidden invisible"
                }`}
            >
                <div ref={wrapperRef} className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white dark:bg-gray-800 dark:text-gray-100">
                        {/*header*/}
                        <div
                            className={`flex items-start justify-between p-5 rounded-t ${
                                title ? "border-b border-solid border-slate-200" : ""
                            }`}
                        >
                            {title && <h3 className="text-lg font-semibold">{title}</h3>}
                            <button
                                className="float-right text-xl ml-auto -mt-4 -mr-2 hover:shadow"
                                title={t("Close modal")}
                                onClick={onClickClose}
                            >
                                <FontAwesomeIcon icon={faClose}/>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">{children}</div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                            {closeBtnComponent ? closeBtnComponent : <Button
                                className="btn-red btn-default hover:bg-red-700 text-white uppercase"
                                title={t('Close')}
                                type="button"
                                onClick={onClickClose}>
                                {t('Close')}
                            </Button>}
                            {okBtnComponent && okBtnComponent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
