import React, {useRef} from 'react';
import {Controller, FormProvider, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


import MDEditor from "@uiw/react-md-editor";
import type {AxiosResponse} from "axios";


import {BaseQuestionnaire, Questionnaire, QuestionnaireApi} from "../../../../@questionnaire_api";
import Button from "../../../../components/Button";
import FormControl from "../../../../components/Form/FormControl";
import Modal from "../../../../components/Modal";
import useSwaggerGeneratedApiConfig from "../../../../hooks/useSwaggerGeneratedApiConfig";

type QuestionnaireFormValues = Omit<BaseQuestionnaire, 'children'>;

const CreateQuestionnaireFormModal = () => {
    const [t] = useTranslation()
    const ref = useRef<HTMLFormElement>()
    const navigate = useNavigate()
    const config = useSwaggerGeneratedApiConfig()
    const questionnaireApi = new QuestionnaireApi(config)
    const methods = useForm<QuestionnaireFormValues>({
        mode: "onChange",
    });
    const {handleSubmit, register, formState: {errors}, control, setValue} = methods;
    const onSubmit = (data: QuestionnaireFormValues) => {
        const payload: BaseQuestionnaire = {...data, children: []}
        questionnaireApi.createQuestionnaire(payload).then((r: AxiosResponse<Questionnaire>) => {
            navigate(`/questionnaires/manage/${r.data.uuid || ''}`)
        }).catch(() => {
            toast(t('Error creating questionnaire'), {type: 'error'})
        })
    };
    return (
        <Modal
            okBtnComponent={<Button title={'Create questionnaire'}
                                    onClick={handleSubmit(onSubmit)}>{t('Create')}</Button>}
            openBtnChildren={t('Create new questionnaire')}
        >
            <FormProvider {...methods}>
                <form className='w-full'>
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
                </form>
            </FormProvider>
        </Modal>
    );
};

export default CreateQuestionnaireFormModal;
