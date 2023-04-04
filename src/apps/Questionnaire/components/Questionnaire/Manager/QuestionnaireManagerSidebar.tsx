import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {faCaretLeft} from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons/faCaretRight";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";


import {BaseQuestionnaire, Questionnaire} from "../../../../../@questionnaire_api";
import {setCollapsed} from "../../../../../redux/questionnaire_manager_sidebar/slice";
import {RootState} from "../../../../../redux/store";
import IDBWrapper, {IdbOptions} from "../../../../../utils/IndexedDB";
import QuestionnaireRootElementBuilder from "./BuilderComposition/QuestionnaireRootElementBuilder";

export interface QuestionnaireManagerSidebarItemProps {
    collapsed: boolean,
    icon: React.ReactNode,
    title: string,
    text: string,
    onClick?: () => void,
}

export const QuestionnaireManagerSidebarItem = ({
                                                    collapsed,
                                                    icon,
                                                    text,
                                                    title,
                                                    onClick
                                                }: QuestionnaireManagerSidebarItemProps) => {
    return ((
        <button className={clsx('btn-navbar p-2 ml-0 w-full transition', collapsed ? 'text-center' : 'text-left')}
                title={title}
                onClick={onClick && onClick}>
            <span className='mr-2'>{icon}</span> {!collapsed && text}
        </button>))
}

export type QuestionnaireManagerSidebarProps = {
    maxCollapsedWidth: string;
    maxExpandedWidth: string;
    itemsSetup: Omit<QuestionnaireManagerSidebarItemProps, 'collapsed'>[]
    questionnaire: Questionnaire | BaseQuestionnaire
    setQuestionnaire: Dispatch<SetStateAction<Questionnaire | undefined>>
};


const QuestionnaireManagerSidebar: React.FC<QuestionnaireManagerSidebarProps> = ({
                                                                                     maxCollapsedWidth,
                                                                                     maxExpandedWidth,
                                                                                     itemsSetup,
                                                                                     questionnaire,
                                                                                     setQuestionnaire
                                                                                 }) => {
    const idbWrapper = new IDBWrapper(IdbOptions);
    const [tabIndex, setTabIndex] = useState(0);
    const dispatch = useDispatch();
    const collapsed = useSelector((state: RootState) => state.questionnaire_manager_sidebar.collapsed);
    const [t] = useTranslation()
    const toggleSidebar = () => {
        dispatch(setCollapsed(!collapsed));
        idbWrapper.setItem('questionnaire_manager_sidebar', !collapsed).then(() => {
        }).catch(() => {
        })
    };

    useEffect(() => {
        idbWrapper.getItem('questionnaire_manager_sidebar').then((v) => {
            dispatch(setCollapsed(v as boolean));
        }).catch(() => console.log('Error fetching idb value'))
    }, [])

    return (
        <div className='flex h-full'>
            <div
                className={clsx(collapsed ? maxCollapsedWidth : maxExpandedWidth, 'h-full p-4 bg-gray-100 border-r border-gray-300 darkeable')}
            >
                <div className="space-y-2 h-full">
                    <Tabs
                        forceRenderTabPanel={true}
                        selectedIndex={tabIndex}
                        selectedTabClassName={'border-b-primary-700 border-b-2 bg-primary-600 text-white font-semibold'}
                        onSelect={(index) => setTabIndex(index)}
                    >
                        <TabList className={'grid grid-cols-2 text-center'}>
                            <Tab className='btn-default rounded-r-none rounded-b-none'>{t('Setup')}</Tab>
                            <Tab className='btn-default rounded-l-none rounded-b-none'>{t('Structure')}</Tab>
                        </TabList>
                        <TabPanel>
                            <div className='card border-t-0 rounded-t-none p-1'>
                                {itemsSetup.map(v => <QuestionnaireManagerSidebarItem key={v.title}
                                                                                      collapsed={collapsed} {...v}/>)}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='card border-t-0 rounded-t-none p-1'>
                                <QuestionnaireRootElementBuilder questionnaire={questionnaire}
                                                                 setQuestionnaire={setQuestionnaire}/>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            <button
                className='rounded-full shadow border-gray-300 border-1 p-2 h-10 -ml-3.5 darkeable-light shadow-gray-400 mt-2'
                title={collapsed ? t("Expand") : t("Collapse")}
                onClick={toggleSidebar}>
                {collapsed ? <FontAwesomeIcon icon={faCaretRight}/> : <FontAwesomeIcon icon={faCaretLeft}/>}
            </button>
        </div>
    );
};

export default QuestionnaireManagerSidebar;
