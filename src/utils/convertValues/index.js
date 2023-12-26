import numeral from 'numeral';

export const formatMoney = (value) => numeral(value).format('R$ 0,0.00');

export function stringToArray(str) {
    if (!str.trim()) {
      return [];
    }
  
    var array = str.split(',').map(function(item) {
      return item.trim();
    });
  
    return array;
  }


export function nameMonth(numeroMes) {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    if (numeroMes >= 1 && numeroMes <= 12) {
      return meses[numeroMes - 1].toUpperCase();
    } else {
      return 'Mês inválido';
    }
  }