// FormProvider.js
import React from 'react';

const FormContext = React.createContext();

export const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('configure o useFormContext');
  }
  return context;
};

const FormProvider = ({ children, methods }) => {
  return <FormContext.Provider value={methods}>
            {children}
         </FormContext.Provider>;
};

export default FormProvider;
