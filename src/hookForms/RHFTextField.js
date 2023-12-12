import { TextField } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"

function RHFTextField({ name, label,disabled, ...other}){
    const { control, formState: {errors} } = useFormContext()
    return (
      <>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              disabled={disabled ?? false}
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
        {errors[name] && <span style={{ color: "red", fontFamily:"Arial" }}>{errors[name].message}</span>}
      </>
      );
}
export default RHFTextField