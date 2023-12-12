import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

const useStyles = makeStyles({
    datePicker: {
      height: '100%', 
      '& .react-multiple-datepicker-input': {
        fontSize: '16px', 
      },
    },
    datePainel: {
      width: "100%"
    }
})

const RHFMultiDateKeyboardPicker = ({name, label, ...other}) => {
    const { control, formState: {errors} } = useFormContext()
    const classes = useStyles()
    return (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker
              variant="inline "
              label={label}
              multiple
              value={value}
              onChange={onChange}
              format="YYYY/MM/DD"
              plugins={[
                  <DatePanel/>
              ]}
              className={classes.datePicker}
              onBlur={onBlur}
              {...other}            
            />
            )}
      />
    )
};

export default RHFMultiDateKeyboardPicker;
