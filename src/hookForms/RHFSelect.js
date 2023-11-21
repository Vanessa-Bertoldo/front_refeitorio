import { MenuItem, Select } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

function RHFSelect({ name, label, onChange,onGetValue, onGetDescription, options,  ...other}){
    const { control } = useForm()

    return(
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...fieldOther}, fieldState: {error}}) => (
                <Select
                    label={label}
                    variant="outlined"
                    inputRef={ref}
                    {...fieldOther}
                    error={!!error}
                    {...other}
                >
                    {options.map((option, index) => {
                        const value = onGetValue(option, index);
                        const description = onGetDescription(option, index);
                        return(
                            <MenuItem key={value} value={value}>{description}</MenuItem>
                        )
                    })}
                </Select>
            )}
        />
    )
} 
export default RHFSelect;