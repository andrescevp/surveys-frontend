import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";


import {Questionnaire, QuestionnaireApi} from "../../../../@questionnaire_api";
import useSwaggerGeneratedApiConfig from "../../../../hooks/useSwaggerGeneratedApiConfig";
import CreateQuestionnaireFormModal from "../Questionnaire/CreateQuestionnaireFormModal";


const QuestionnaireDatatable = () => {
    const [t] = useTranslation();
    const apiConfig = useSwaggerGeneratedApiConfig()
    const questionnaireApi = new QuestionnaireApi(apiConfig)
    const navigate = useNavigate();
    const [questionnairesData, setQuestionnairesData] = useState<Questionnaire[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const columns = [
        {
            name: t('Title'),
            selector: (row: Questionnaire) => row.title || '',
        },
        {
            name: t('Code'),
            selector: (row: Questionnaire) => row.code || '',
        },
        {
            name: t('Actions'),
            cell: (row: Questionnaire) => (
                <Link className='btn-default' to={`/questionnaires/manage/${row.uuid || ""}`}>{t('Manage')}</Link>),
            button: true,
            sortable: false
        },
    ];

    useEffect(() => {
        if (loaded || loading) {
            return
        }
        setLoading(true)
        questionnaireApi.getQuestionnaires().then(list => {
            setQuestionnairesData(list.data.data)
            setLoaded(true)
            setLoading(false)
        }).catch(() => {
            setLoaded(true)
            setLoading(false)
        })
    })


    return (
        <>
            <DataTable
                actions={(<CreateQuestionnaireFormModal/>)}
                columns={columns}
                data={questionnairesData}
                highlightOnHover
                progressPending={loading}
                title={t('Questionnaires')}
            />

        </>
    );
};

export default QuestionnaireDatatable;
