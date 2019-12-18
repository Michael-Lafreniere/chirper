export const isNumber = number => {
  return /^\d+$/.test(number);
};

export const isCharacters = characters => {
  return !/[^a-z ]/i.test(characters);
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
    if (data.length < minLength) return `To short, min: ${minLength}`;
  }
  if (maxLength > 0) {
    if (data.length > maxLength) return `To long, max: ${maxLength}`;
  }
  if (inputType === 'textOnly' && data.length > 0) {
    if (!isCharacters(data)) return 'Please use A-Z or a-z only';
  }
  if (inputType === 'numberOnly' && data.length > 0) {
    if (!isNumber(data)) return "Please only use 0-9's";
  }
  if (inputType === 'email' && data.length > 0) {
    if (!isEmail(data)) return 'Invalid email address';
  }
  return '';
};
