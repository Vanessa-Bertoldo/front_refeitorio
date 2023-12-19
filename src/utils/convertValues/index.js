import numeral from 'numeral';

export const formatMoney = (value) => numeral(value).format('R$ 0,0.00');