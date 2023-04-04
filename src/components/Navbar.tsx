import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

import {faBars, faClose, faMoon, faSun,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import useClickOutside from "../hooks/useClickOutside";
import {NavbarProperties} from "../types/navbar";

const Navbar = ({setDarkToggle, darkToggle}: NavbarProperties) => {
    const {t} = useTranslation();
    const [openNav, setOpenNav] = useState(false);
    const toogleShow = () => {
        setOpenNav((wasShown) => !wasShown);
    };
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setOpenNav(false));

    // useEffect(() => {
    //   window.addEventListener("resize", () =>
    //     window.innerWidth >= 960 ? setOpenNav(true) : setOpenNav(false)
    //   );
    // }, []);

    return (
        <div
            className={`w-full py-2 px-4 lg:px-8 lg:py-4 mb-2 flex justify-between shadow text-default lg:mx-auto darkeable-light items-center`}
        >
            <div className="order-0 items-center">
                <Link className="font-bold text-lg" to={"/"}>
                    Surveys
                </Link>
                {setDarkToggle && (
                    <button
                        className="p-2
          text-slate-600 hover:text-slate-800
          dark:text-slate-300 dark:hover:text-slate-100
          focus-visible:ring-2
          rounded-lg"
                        onClick={() => setDarkToggle(!darkToggle)}
                    >
                        {darkToggle ? (
                            <FontAwesomeIcon icon={faSun}/>
                        ) : (
                            <FontAwesomeIcon icon={faMoon}/>
                        )}
                    </button>
                )}
            </div>
            <button
                className={`btn-navbar ${openNav ? "invisible" : "visible"}`}
                onClick={() => toogleShow()}
            >
                <FontAwesomeIcon icon={faBars}/>
            </button>
            <div
                className={`opacity-25 fixed inset-0 z-40 bg-black ${
                    openNav ? "block visible" : "hidden invisible"
                } transition-all duration-300`}
            ></div>
            <button
                className={`float-right text-xl ml-auto -mt-4 -mr-2 hover:shadow z-50 ${
                    openNav ? "block visible" : "hidden invisible"
                }`}
                title={t("Close menu")}
                onClick={() => setOpenNav(false)}
            >
                <FontAwesomeIcon icon={faClose}/>
            </button>
            <div
                ref={ref}
                className={`order-1 ${
                    openNav ? "block visible" : "hidden invisible"
                } flex p-4 mx-auto z-50 absolute h-full -top-1 flex-col w-64 -left-4 darkeable-light transition-all`}
            >
                <button
                    className={`text-right`}
                    title={t("Close menu")}
                    onClick={() => setOpenNav(false)}
                >
                    <FontAwesomeIcon icon={faClose}/>
                </button>
                <Link className="btn-navbar" to={'/questionnaires'}>{t('Questionnaires')}</Link>
                {/* <a className="btn-navbar">Test</a>
        <a className="btn-navbar">Test</a>
        <a className="btn-navbar">Test</a>
        <a className="btn-navbar">Test</a> */}
            </div>
        </div>
    );
};

export default Navbar;
