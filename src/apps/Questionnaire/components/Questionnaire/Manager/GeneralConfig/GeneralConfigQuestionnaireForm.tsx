import React, {MutableRefObject, useRef} from 'react'
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';

import MDEditor from "@uiw/react-md-editor";
import type {AxiosResponse} from "axios";

import {BaseQuestionnaire, Questionnaire, QuestionnaireApi} from '../../../../../../@questionnaire_api';
import Button from "../../../../../../components/Button";
import FormControl from "../../../../../../components/Form/FormControl";
import useSwaggerGeneratedApiConfig from "../../../../../../hooks/useSwaggerGeneratedApiConfig";
import {set as setQuestionnaire} from "../../../../../../redux/questionnaires/slice";


type QuestionnaireFormValues = Omit<Questionnaire, 'children'>;

type QuestionnaireFormProps = {
    questionnaire: QuestionnaireFormValues;
    ref?: MutableRefObject<HTMLFormElement>
};

const GeneralConfigQuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
                                                                              questionnaire,
                                                                          }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const config = useSwaggerGeneratedApiConfig()
    const questionnaireApi = new QuestionnaireApi(config)
    const [t] = useTranslation();
    const methods = useForm<QuestionnaireFormValues>({
        defaultValues: questionnaire,
        mode: "onChange",
    });
    const {handleSubmit, register, formState: {errors}, control, setValue} = methods;
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (data: QuestionnaireFormValues) => {
        if (!questionnaire.uuid) {
            return
        }
        const payload: BaseQuestionnaire = {
            code: data.code,
            alt_title: data.alt_title,
            title: data.title,
            description: data.description,
            children: []
        }
        questionnaireApi.updateQuestionnaire(questionnaire.uuid, payload).then((r: AxiosResponse<Questionnaire>) => {
            dispatch(setQuestionnaire(r.data))
            toast(t('Update success'), {type: "success"})
        }).catch(() => {
            toast(t('Error updating questionnaire'), {type: 'error'})
        })
    };

    return (
        <FormProvider {...methods}>
            <form ref={formRef} className='w-full card' onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                    errorsChildren={errors.code?.message}
                    input={<input className='form-input' type="text" {...register('code', {
                        required: {
                            value: true,
                            message: t('Code required')
                        }
                    })} />}
                    required={true}
                    title={t('Questionnaire Code')}
                />
                <FormControl
                    errorsChildren={errors.title?.message}
                    input={<input className='form-input' type="text" {...register('title', {
                        required: {
                            value: true,
                            message: t('Title required')
                        }
                    })} />}
                    required={true}
                    title={t('Questionnaire Title')}
                />
                <FormControl
                    errorsChildren={errors.alt_title?.message}
                    input={<input className='form-input' type="text" {...register('alt_title')} />}
                    title={t('Questionnaire Title Alternative')}
                />
                <FormControl
                    errorsChildren={errors.description?.message}
                    input={<Controller
                        control={control}
                        name="description"
                        render={({field}) => {
                            const handleChange = (value?: string) => {
                                setValue('description', value || '')
                            };
                            return (
                                <div>
                                    <MDEditor {...field} onChange={handleChange}/>
                                </div>
                            );
                        }
                        }
                    />}
                    title={t('Questionnaire Description')}
                />
                <Button title={t('Update questionnaire')} type={'submit'}>{'Update'}</Button>
            </form>
        </FormProvider>
    );
};

export default GeneralConfigQuestionnaireForm;
