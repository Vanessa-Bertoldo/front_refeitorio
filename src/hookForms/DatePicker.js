import { makeStyles, Typography } from '@material-ui/core';
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
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: '0.875rem',
  },
});

const RHFMultiDateKeyboardPicker = ({ name, label, ...other }) => {
  const { control, formState: { errors } } = useFormContext();
  const classes = useStyles();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DatePicker
            variant="inline"
            label={label}
            multiple
            value={value}
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
            onChange={onChange}
            format="DD/MM/YYYY"
            plugins={[
              <DatePanel />
            ]}
            className={classes.datePicker}
            onBlur={onBlur}
            {...other}
          />
        )}
      />
      {errors[name] && (
        <Typography variant="body2" className={classes.errorText}>
          {errors[name].message}
        </Typography>
      )}
    </>
  );
};

export default RHFMultiDateKeyboardPicker;
