import React from "react";
import {Link} from "react-router-dom";

import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useSelector} from "../redux/store";
import {BreadcrumbItem} from "../types/breadcrumbs";

const HomeItem = {
    label: "home",
    title: "go to home",
    to: "/",
}

const Breadcrumbs = () => {
    const items = useSelector((state) => state.breadcrumbs);
    return (
        <nav className="flex my-2 mx-4 border-1 rounded darkeable border-0 dark:border-0">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((e: BreadcrumbItem, i) => (<li key={e.title} className="inline-flex items-center">
                    <Link className="btn-breadcrumb breadcrum-caret" title={String(e.title)} to={e.to}>
                        {e.label}
                    </Link>
                    {(items.length > 1 && i < (items.length - 1)) &&
                        <FontAwesomeIcon className={'ml-2 text-gray-500'} icon={faCaretRight}/>}
                </li>))}
            </ol>
        </nav>
    )
};

export default Breadcrumbs;
export {HomeItem}
