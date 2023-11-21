import { KeyboardDatePicker } from "@material-ui/pickers"
import { Controller, useForm } from "react-hook-form"

function RHFDatePicket({name, label, format, ...other}){
    const { control } = useForm()
    return(
        <Controller
            name={name}
            control={control}
            render={({field: { onChange, value, ref }}) => {
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
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