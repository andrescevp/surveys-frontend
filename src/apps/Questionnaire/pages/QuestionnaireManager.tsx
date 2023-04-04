import React, {lazy, Suspense, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {Navigate, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {toast} from "react-toastify";

import {faGears} from "@fortawesome/free-solid-svg-icons/faGears";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import {BaseQuestionnaire, ChildrenInner, Questionnaire, QuestionnaireApi} from "../../../@questionnaire_api";
import {HomeItem} from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import DashboardLayout from "../../../components/DashboardLayout";
import Loader from "../../../components/Loader";
import useSwaggerGeneratedApiConfig from "../../../hooks/useSwaggerGeneratedApiConfig";
import {set as setBreadcrumbs} from "../../../redux/breadcrumbs/slice";
import ElementFormFactory from "../components/Questionnaire/Manager/Forms/ElementFormFactory";
import QuestionnaireManagerSidebar, {
    QuestionnaireManagerSidebarItemProps
} from "../components/Questionnaire/Manager/QuestionnaireManagerSidebar";


const GeneralConfigQuestionnaireForm = lazy(() => import("../components/Questionnaire/Manager/GeneralConfig/GeneralConfigQuestionnaireForm"));


const SidebarSetupMenu = ({
                              t,
                              uuid,
                              navigate
                          }: {
    uuid: string,
    t: (v: string) => string,
    navigate: NavigateFunction
}): Omit<QuestionnaireManagerSidebarItemProps, 'collapsed'>[] => ([
    {
        title: t('General config'),
        text: t('General config'),
        onClick: () => navigate(`/questionnaires/manage/${uuid}`),
        icon: <FontAwesomeIcon icon={faGears}/>,
    },
])

const QuestionnaireManager = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | BaseQuestionnaire>();
    // const questionnaire = useSelector((state) => state.questionnaire.questionnaire);
    const dispatch = useDispatch();
    const [t] = useTranslation();
    const {uuid} = useParams<{ uuid: string }>()
    const apiConfig = useSwaggerGeneratedApiConfig()
    const questionnaireApi = new QuestionnaireApi(apiConfig)
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const sidebarSetupMenu = (currentQuestionnaire: Questionnaire) => (SidebarSetupMenu({
        t,
        uuid: currentQuestionnaire.uuid || "",
        navigate
    }))

    useEffect(() => {
        if (questionnaire) {
            const breadcrumbTitle = `${t("Manage questionnaire")}: ${questionnaire.title} (${questionnaire.code})`
            dispatch(setBreadcrumbs([
                HomeItem,
                {
                    label: t("Questionnaires"),
                    title: t("Show all questionnaires"),
                    to: "/questionnaires",
                },
                {
                    label: breadcrumbTitle,
                    title: breadcrumbTitle,
                    to: currentUrl,
                }
            ]))
        }
    }, [questionnaire])

    useEffect(() => {
        if (!uuid || loaded) {
            return
        }
        questionnaireApi.getQuestionnaire(uuid).then(response => {
            setQuestionnaire(response.data)
        }).catch(() => {
            toast('Error loading questionnaire data', {type: "error"})
        })
            .finally(() => {
                setLoaded(true)
            })
    }, [uuid])


    const saveQuestionnaire = () => {
        if (!questionnaire || !uuid) {
            return
        }
        questionnaireApi.updateQuestionnaire(uuid, questionnaire).then(() => {
            toast('Questionnaire saved!', {type: "success"})
        }).catch(() => {
            toast('Error saving questionnaire!', {type: "error"})
        })
    }

    const SimulateCall = () => {
        if (!questionnaire || !uuid) {
            return
        }
        questionnaireApi.simulateCall(uuid).then(() => {
            toast('Call simulation sent!', {type: "success"})
        }).catch(() => {
            toast('Error creating simulation!', {type: "error"})
        })
    }
    if (!uuid) {
        return <Navigate to={'/'}/>
    }
    return questionnaire ? (
        <DashboardLayout>
            <div className="flex gap-2 h-full">
                <div className='max-w-64'>
                    {questionnaire &&
                        <QuestionnaireManagerSidebar itemsSetup={sidebarSetupMenu(questionnaire)}
                                                     maxCollapsedWidth={'w-16'}
                                                     maxExpandedWidth={'w-64'}
                                                     questionnaire={questionnaire}
                                                     setQuestionnaire={setQuestionnaire}
                        />}
                </div>
                <div className='my-2 w-full mr-2'>
                    <div className='mb-2 border-b-2 border-gray-600 pb-2 grid grid-cols-2 gap-2'>
                        <div>
                            <span className='font-semibold text-gray-500'>{t('Questionnaire')}: </span>
                            <h2 className='font-bold text-lg overflow-visible'
                                style={{whiteSpace: 'normal'}}>{questionnaire.code}: {questionnaire.title}
                            </h2>
                        </div>
                        <div className='flex items-center'>
                            <div className='inline-flex gap-1 ml-auto' role="group">
                                <Button title={t('Save changes')}
                                        onClick={saveQuestionnaire}><FontAwesomeIcon
                                    className='mr-2'
                                    icon={faSave}/>{t('Save')}
                                </Button>
                                <Button title={t('Simulate call')}
                                        onClick={SimulateCall}><FontAwesomeIcon
                                    className='mr-2'
                                    icon={faPhone}/>{t('Simulate call')}
                                </Button>
                            </div>
                        </div>
                    </div>


                    {('uuid' in questionnaire) && <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route
                                element={<GeneralConfigQuestionnaireForm questionnaire={questionnaire}/>}
                                path='/'
                            />
                            <Route element={<ElementFormFactory
                                questionnaire={questionnaire}
                                onChange={(_question: ChildrenInner, _questionnaire, parenCodes) => {
                                    const newChildren = [...(_questionnaire.children || [])]
                                    const updatedChildrenIndex = newChildren.findIndex((children) => children.code === _question.code)
                                    newChildren[updatedChildrenIndex] = _question
                                    _questionnaire.children = newChildren
                                    setQuestionnaire(_questionnaire)
                                }
                                }
                            />}
                                   path='/builder/element/:code'/>
                        </Routes>
                    </Suspense>}
                </div>
            </div>
        </DashboardLayout>
    ) : <Loader/>;
};

export default QuestionnaireManager;
