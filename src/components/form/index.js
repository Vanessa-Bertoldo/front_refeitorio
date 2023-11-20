import { FormProvider } from "react-hook-form"
import { Form } from "react-router-dom"

function FormProvide(){
    return(
        <FormProvider methods={() => {}}>
            <Form onSubmit={() => {}}>
            </Form>
        </FormProvider>
    )
}
export default FormProvide