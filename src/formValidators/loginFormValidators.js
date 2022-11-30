export const loginFormValidators = {
  accNO: {
    required: {
      value: true,
      message: "Account Number can not be empty",
    },
    // pattern: {
    //   // value:  /^[a-zA-Z0-9]+$/,
    //   message: "Special characters are not allowed",
    // },
  },
  password: {
    required: {
      value: true,
      message: "Passwrod can not be empty",
    },
  },
};
