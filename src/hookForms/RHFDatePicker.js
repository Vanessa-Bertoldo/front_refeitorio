import { KeyboardDatePicker } from "@material-ui/pickers"
import { Controller, useForm } from "react-hook-form"

function RHFDatePicket({name, label, format, ...other}){
    const { control } = useForm()
    return(
        <Controller
            name={name}
            control={control}
            render={({field: { onChange, value, onBlur, ref }}) => {   
                <KeyboardDatePicker
                    disableToolbar
                    id="date-picker-inline"
                    variant="inline"
                    onBlur={onBlur}
                    format={format}
                    label={label}
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }}
                />
            }}
        />
    )
}
export default RHFDatePicket