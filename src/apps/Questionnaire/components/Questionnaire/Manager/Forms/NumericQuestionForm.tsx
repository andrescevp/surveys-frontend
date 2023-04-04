import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";

import MDEditor from "@uiw/react-md-editor";

import {NumericQuestion} from "../../../../../../@questionnaire_api";
import FormControl from "../../../../../../components/Form/FormControl";
import {NumericQuestionFormProperties} from "../../../../types/questionnaires";

const NumericQuestionForm = ({question, onChange, questionnaire, parentCodes}: NumericQuestionFormProperties) => {
    const [t] = useTranslation()
    const {
        register,
        control,
        setValue,
        formState: {errors},
        getValues,
        watch,
        reset
    } = useForm<NumericQuestion>({mode: "onChange"})

    useEffect(() => {
        reset()
        const keys = Object.keys(question) as (keyof NumericQuestion)[]
        keys.forEach(vkey => {
            setValue(vkey, question[vkey])
        })
    }, [question])
    const onFieldChange = () => {
        onChange({...getValues(), type: 'text'}, questionnaire, parentCodes)
    }

    useEffect(() => {
        const subscription = watch(() => {
            onFieldChange()
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return <div>
        <form>
            <FormControl
                input={<input className='form-input' {...register('code')} readOnly={true}/>}
                title={t('Question unique code')}
            />
            <FormControl
                errorsChildren={errors.label?.message}
                input={<Controller
                    control={control}
                    name="label"
                    render={({field}) => {
                        const handleChange = (value?: string) => {
                            setValue('label', value || '')
                        };
                        return (
                            <div>
                                <MDEditor {...field} onChange={handleChange}/>
                            </div>
                        );
                    }
                    }
                />}
                title={t('Question label')}
            />
            <FormControl
                errorsChildren={errors.alt_label?.message}
                input={<Controller
                    control={control}
                    name="alt_label"
                    render={({field}) => {
                        const handleChange = (value?: string) => {
                            setValue('alt_label', value || '')
                        };
                        return (
                            <div>
                                <MDEditor {...field} onChange={handleChange}/>
                            </div>
                        );
                    }
                    }
                />}
                title={t('Report label')}
            />
            <FormControl
                errorsChildren={errors.required?.message}
                inline={true}
                input={<input
                    type="checkbox"
                    {...register('required')}
                />}
                title={t('Is this question required?')}
            />
            <FormControl
                errorsChildren={errors.virtual?.message}
                inline={true}
                input={<input
                    type="checkbox"
                    {...register('virtual')}
                />}
                title={t('Is this question virtual?')}
            />
            <FormControl
                errorsChildren={errors.virtual?.message}
                inline={true}
                input={<input className='form-input' {...register('default_value')}/>}
                title={t('Default answer value')}
            />
        </form>
    </div>
}

export default NumericQuestionForm