// FormProvider.js
import React from 'react';
import { FormProvider } from 'react-hook-form';

const ReactFormProvider = ({methods, children}) => {
  return(
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}
export default ReactFormProvider;
