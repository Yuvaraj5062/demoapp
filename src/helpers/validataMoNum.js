const PNF = require("google-libphonenumber").PhoneNumberFormat;
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const validateMoNum = (num, isoCode) => {
  console.log(num, isoCode);

  const number = phoneUtil.parseAndKeepRawInput(num, isoCode);
  const isNumberValid = phoneUtil.isValidNumber(number);
  const code = isNumberValid && number.getCountryCode();
  const stdFormat = isNumberValid && phoneUtil.format(number, PNF.E164);

  return { stdFormat, isNumberValid, code };
};
