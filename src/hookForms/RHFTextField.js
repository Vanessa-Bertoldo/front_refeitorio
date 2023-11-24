import { TextField } from "@material-ui/core"
import { Controller, useForm, useFormContext } from "react-hook-form"

function RHFTextField({ name, label, ...other}){
    const { control } = useForm()
    return (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              variant="outlined"
              onChange={onChange}
              onBlur={onBlur}
              label={label}
              value={value}
              inputRef={ref}
              inputProps={other}
            />
          )}
        />
      );
}
export default RHFTextField