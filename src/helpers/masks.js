import VMasker from 'vanilla-masker';

export const createMaskDecimal = (
  options = {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: '',
    suffixUnit: '',
    zeroCents: false,
  },
) => {
  return (text) => {
    const number =
      typeof text === 'number' ? text.toFixed(options.precision) : text;
    const masked = VMasker.toMoney(number || '', options);
    return masked;
  };
};

export const maskDecimal = createMaskDecimal({ precision: 2 });
