import { TextField } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form"

function RHFTextField({ name, label, defaultValue, ...other}){
    const { control } = useForm()
    return (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              defaultValue={value}
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