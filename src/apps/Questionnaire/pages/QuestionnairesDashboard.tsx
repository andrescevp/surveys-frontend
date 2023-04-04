import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {HomeItem} from "../../../components/Breadcrumbs";
import DashboardLayout from "../../../components/DashboardLayout";
import {set as setBreadcrumbs} from "../../../redux/breadcrumbs/slice";
import QuestionnaireDatatable from "../components/Datatables/QuestionnaireDatatable";


const QuestionnairesDashboard = () => {
    const [t] = useTranslation()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumbs([
            HomeItem,
            {
                label: t("Questionnaires"),
                title: t("Show all questionnaires"),
                to: "/questionnaires",
            }
        ]))
    }, [])
    return (
        <DashboardLayout>
            <QuestionnaireDatatable/>
        </DashboardLayout>
    );
};

export default QuestionnairesDashboard;
