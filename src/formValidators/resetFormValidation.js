export const resetFormValidations = {
  passOne: {
    required: {
      value: true,
      message: "Password can not be empty",
    },
    custom: {
      isValid: (value) =>
        value && value.length >= 8 && value.length <= 64 ? true : false,
      message: "Username must be between 6 to 64 characters",
    },
  },
  passTwo: {
    required: {
      value: true,
      message: "Password can not be empty",
    },
    custom: {
      isValid: (value) =>
        value && value.length >= 8 && value.length <= 64 ? true : false,
      message: "Username must be between 6 to 64 characters",
    },
  },
};
