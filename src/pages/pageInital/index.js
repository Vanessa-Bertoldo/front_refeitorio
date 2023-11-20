import React from 'react';
import FormProvider from '../../components/form';
import { useForm } from 'react-hook-form';

function PageInitial(){
    const methods = useForm()

    const {
        register,
        getValues,
        setValue
    } = methods

    return(
        <FormProvider methods={methods}>

        </FormProvider>
    )
}
export default PageInitial