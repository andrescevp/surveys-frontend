import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import {faBars, faBookAtlas, faClose,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AppMenu = () => {
    const {t} = useTranslation();
    const [showSidebar, setShowSidebar] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    // useClickOutside(ref, toogleShow);
    const toogleShow = () => {
        setShowSidebar((wasShown) => !wasShown);
    };


    return (
        <div
            className={`h-full top-0 ${
                showSidebar ? "w-64" : "w-12"
            } overflow-y-auto flex-row flex-nowrap overflow-hidden bg-white z-10 py-4 transition-all duration-300 shadow-right`}
        >
            <div
                className={`fixed ${
                    showSidebar ? "left-63" : "left-11"
                } transition-all duration-300 top-24`}
            >
                <button
                    className="bg-white px-2 hover:shadow-lg shadow-sm transition-all duration-300 rounded-r-full bg-gradient-to-r from-white to-gray-300"
                    title={t("Close sidebar")}
                    type="button"
                    onClick={toogleShow}
                >
                    <FontAwesomeIcon icon={showSidebar ? faClose : faBars}/>
                </button>
            </div>
            <button
                className="w-full transition-all duration-300 bg-white hover:bg-gray-200 hover:shadow border-l-4  border-secondary-600 h-12 overflow-hidden">
                <FontAwesomeIcon
                    className="border-r-2 border-gray-400 px-2 mx-2"
                    icon={faBookAtlas}
                />
                {t("Dashboard")}
            </button>
        </div>
    );
};

export default AppMenu;
