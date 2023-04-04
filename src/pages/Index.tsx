import * as React from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {HomeItem} from "../components/Breadcrumbs";
import DashboardLayout from "../components/DashboardLayout";
import {set} from "../redux/breadcrumbs/slice";


type DasboardProperties = React.PropsWithChildren;

function Index({children}: DasboardProperties) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(set([HomeItem]))
    }, [])
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}

export default Index;
