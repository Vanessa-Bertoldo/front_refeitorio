import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

function RHFSelect({ name, label, onGetValue, onGetDescription, options,  ...other}){
    const { control } = useFormContext()

    return(
        <Controller
            name={name}
            control={control}
            render={({field: {ref, ...fieldOther}, fieldState: {error}}) => (
                <FormControl variant="outlined" >
                    <InputLabel id={label}>{label}</InputLabel>
                    <Select
                        labelId={label}
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
                    <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    )
} 
export default RHFSelect;
