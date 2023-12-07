import React, { useState } from 'react';
import moment from 'moment';

const DateConverter = () => {
  const [inputDate, setInputDate] = useState('');
  const [convertedDate, setConvertedDate] = useState('');

  const handleDateConversion = () => {
    // Faz a conversão usando Moment.js
    const convertedDate = moment(inputDate, 'DD/MM/YYYY').format('YYYY/MM/DD');
    setConvertedDate(convertedDate);
  };

  return (
    <div>
      <label htmlFor="inputDate">Digite a data (dd/mm/yyyy):</label>
      <input
        type="text"
        id="inputDate"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button onClick={handleDateConversion}>Converter</button>

      {convertedDate && (
        <div>
          <p>Data convertida:</p>
          <p>{convertedDate}</p>
        </div>
      )}
    </div>
  );
};

export default DateConverter;
