import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import MultipleDatePicker from 'react-multiple-datepicker'

const useStyles = makeStyles({
    datePicker: {
        height: '200px', // Defina a largura desejada para o campo
        '& .react-multiple-datepicker-input': {
          fontSize: '16px', // Defina o tamanho da fonte desejado
        },
      },
})

const RHFMultiDateKeyboardPicker = ({name, ...other}) => {
    const { control, formState: {errors} } = useFormContext()
    const classes = useStyles()
    return (
        <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <MultipleDatePicker
            selectedDates={value}
            onChange={onChange}
            minDate={new Date()}
            className={classes.datePicker}
          />
          )}
      />
    )
};

export default RHFMultiDateKeyboardPicker;
