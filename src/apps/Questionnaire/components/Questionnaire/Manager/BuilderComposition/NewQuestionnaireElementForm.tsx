import React, {FormEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import Select from "react-select";

import {faMinimize} from "@fortawesome/free-solid-svg-icons/faMinimize";
import {faUnlock} from "@fortawesome/free-solid-svg-icons/faUnlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import {ChildrenInner} from "../../../../../../@questionnaire_api";
import Button from "../../../../../../components/Button";
import {NewQuestionnaireChild} from "../../../../types/questionnaires";


export const CHILD_TYPES = {
    iterate: true,
    numeric: true,
    selection: true,
    set: true,
    text: true,
};
export const CHILD_TYPE_ARRAY = Object.keys(CHILD_TYPES) as Array<ChildrenInner['type']>;

interface NewQuestionnaireElementFormProperties {
    onAdd: (data: NewQuestionnaireChild) => void
    onCollapseBtnClick: () => void
    onBlockBtnClick: () => void
}

const NewQuestionnaireElementForm = ({
                                         onAdd,
                                         onCollapseBtnClick,
                                         onBlockBtnClick
                                     }: NewQuestionnaireElementFormProperties) => {
    const [t] = useTranslation();
    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: {errors}
    } = useForm<NewQuestionnaireChild>({defaultValues: {code: ""}})

    return (<form className='card flex-col p-1' onSubmit={handleSubmit(onAdd)}>
        <Controller control={control} name='type' render={() => {
            return (<Select
                className='w-full mb-2'
                options={CHILD_TYPE_ARRAY.map(v => ({value: v, label: v}))}
                onChange={(v) => v?.value && setValue('type', v?.value)}
            />)
        }
        }
                    rules={{required: {value: true, message: t('Element type required')}}}/>
        {errors.type && <p className='card bg-red-200 p-1 mb-2'>{errors.type.message}</p>}
        <input className={clsx('form-input mb-2')}
               placeholder={t('Element code')}
               {...register('code', {
                   required: {value: true, message: t('Code required')},
                   onChange: (e: FormEvent<HTMLInputElement>) => {
                       setValue('code', e.currentTarget.value.replace(/^[0-9_]+/, '').replace(/[^a-z0-9_]/g, ''))
                   }

               })}
        />
        {errors.code && <p className='card bg-red-200 p-1 mb-2'>{errors.code.message}</p>}
        <div className='flex gap-1'>
            <Button className='btn-default bg-blue-500 hover:bg-blue-700 text-white uppercase w-3/5'
                    title={t('Add new element')} type='submit'>{t('Add new element')}</Button>
            <Button className='tooltip btn-default bg-blue-500 hover:bg-blue-700 text-white uppercase w-1/5'
                    title={t('Collapse elements')} type='button' onClick={onCollapseBtnClick}>
                <FontAwesomeIcon icon={faMinimize}/>
            </Button>
            <Button className='tooltip btn-default bg-blue-500 hover:bg-blue-700 text-white uppercase w-1/5'
                    title={t('Unblock sorting')} type='button' onClick={onBlockBtnClick}>
                <FontAwesomeIcon icon={faUnlock}/>
            </Button>
        </div>
    </form>)
}

export default NewQuestionnaireElementForm