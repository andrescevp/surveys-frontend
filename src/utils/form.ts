import {FormEvent} from 'react'
import {UseFormSetValue} from 'react-hook-form/dist/types'

const slugifyOnChangeTextInput = ({
                                      setValue,
                                      fieldName
                                  }: { setValue: UseFormSetValue<any>, fieldName: string }) => (e: FormEvent<HTMLInputElement>) => {
    setValue(fieldName, e.currentTarget.value.replace(/^[0-9_]+/, '').replace(/[^a-z0-9_]/g, ''))
}

export {slugifyOnChangeTextInput}
