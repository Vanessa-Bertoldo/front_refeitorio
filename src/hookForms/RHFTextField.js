import { TextField } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form"

function RHFTextField({ name, label, ...other}){
    const { control } = useForm()
    return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label={label}
              inputRef={ref}
              input={"true"}
              inputProps={other}
            />
          )}
        />
      );
}
export default RHFTextField