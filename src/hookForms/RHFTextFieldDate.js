import { TextField } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form"

function RHFTextFieldDate({name, label, ...other}){
    const { control } = useForm()
    return(
        <Controller
            name={name}
            control={control}
            render={({field: { onChange, value, onBlur, ref }}) => {   
                <TextField
                    label={label}
                    type="date"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    defaultValue="dd/mm/yyyy"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            }}
        />
    )
}
export default RHFTextFieldDate