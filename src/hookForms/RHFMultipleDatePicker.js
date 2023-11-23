import { Controller, useForm } from "react-hook-form"
import DatePicker from "react-multi-date-picker";

function RHFMultipleDatePicker({name, label, ...other}){
    const { control } = useForm()
    return(
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <DatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    label={label}
                    value={value}
                    inputRef={ref}
                    inputProps={other}
                />
              )}
        />
    )
}
export default RHFMultipleDatePicker