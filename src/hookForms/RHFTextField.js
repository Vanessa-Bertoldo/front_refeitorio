import { TextField } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"

function RHFTextField({ name, label, ...other}){
    const { control } = useFormContext()
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