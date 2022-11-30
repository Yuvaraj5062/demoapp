export const manageroleFormValidators = {
  roleName: {
    required: {
      value: true,
      message: "Please enter Role Name",
    },
    pattern: {
      value: /^[ A-Za-z]*$/,
      message: "Please enter Valid Role Name",
    },
  },

  roleDescription: {
    required: {
      value: true,
      message: "Please enter Role Description",
    },
  },
};
