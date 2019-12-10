export const isNumber = number => {
  return /^\d+$/.test(number);
};

export const isCharacters = characters => {
  return !/[^a-z]/i.test(characters);
};

export const isEmail = email => {
  var regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const validateInput = (
  data,
  inputType,
  minLength = 0,
  maxLength = 0
) => {
  if (minLength > 0) {
    if (data.length < minLength) return 'To short';
  }
  if (maxLength > 0) {
    if (data.length > maxLength) return 'To long';
  }
  if (inputType === 'textOnly') {
    if (!isCharacters(data))
      return 'Invalid character(s), please use A-Z or a-z';
  }
  if (inputType === 'numberOnly') {
    if (!isNumber(data)) return "Invalid value, please only use 0-9's";
  }
  if (inputType === 'email') {
    if (!isEmail(data)) return 'Improperly formed email address';
  }
  return '';
};
