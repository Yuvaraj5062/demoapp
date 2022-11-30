export const clientTransationValidator1 = {
  ifaupFrontFee: {
    required: {
      value: true,
      message: "Please enter IFA Upfront fee",
    },
    custom: {
      isValid: (value) => {
        const valid = value >= 0 && value <= 3 ? true : false
        return valid
      },
      message: "IFA Upfront fee must between 0 to 3",
    },
  },
  ifaAnnualFee: {
    required: {
      value: true,
      message: "Please enter IFA Annual fee",
    },
    custom: {
      isValid: (value) => {
        const valid = value >= 0 && value <= 1 ? true : false
        return valid
      },
      message: "IFA Annual fee must between 0 to 1",
    },
  },
  transactionAmount: {
    required: {
      value: true,
      message: "Please enter transaction amount",
    },
    pattern: {
      value: /^[0-9]{0,18}.[0-9]{0,3}$/,
      message: "Maximum 18 digit with 3 decimal allow",
    },
    // custom: {
    //   isValid: (value,compareValue) => {
    //     const valid =value%compareValue === 0 ? true : false
    //     return valid
    //   },
    //   message: "Transaction Amount should be in multiplies of Number of Units & Current Unit Price",
    // },
    custom2: {
      isValid: (value,compareValue) => {
        const valid =  value % compareValue?.value2 === 0 ? true : false
        return valid
      },
      message: "Transaction Amount should be in multiplies of Number of Units & Current Unit Price."
    }
  },
  numberOfUnits: {
    required: {
      value: true,
      message: "Please enter number of units",
    },
    pattern: {
      value: /^[0-9]{0,18}.[0-9]{0,3}$/,
      message: "Maximum 18 digit with 3 decimal allow",
    },
    custom: {
      isValid: (value,compareValue) => {
        const valid =value<=compareValue.value1? true : false
        return valid
      },
      message: "No of unit must be lower than Total no of units",
    },
  },
  unitType: {
    required: {
      value: true,
      message: "Please select unit type",
    }
  },
  
  // unitPrice: {
  //   required: {
  //     value: true,
  //     message: "Please enter unit price",
  //   },
  // },
};
export const clientTransationValidator2 = {
  ifaupFrontFee: {
    required: {
      value: true,
      message: "Please enter IFA Upfront fee",
    },
    custom: {
      isValid: (value) => {
        const valid = value >= 0 && value <= 3 ? true : false
        return valid
      },
      message: "IFA Upfront fee must between 0 to 3",
    },
  },
  ifaAnnualFee: {
    required: {
      value: true,
      message: "Please enter IFA Annual fee",
    },
    custom: {
      isValid: (value) => {
        const valid = value >= 0 && value <= 1 ? true : false
        return valid
      },
      message: "IFA Annual fee must between 0 to 1",
    },
  },
  transactionAmount: {
    required: {
      value: true,
      message: "Please enter transaction amount",
    },
    pattern: {
      value: /^[0-9]{0,18}.[0-9]{0,3}$/,
      message: "Maximum 18 digit with 3 decimal allow",
    },
    custom: {
      isValid: (value) => {
        const valid =  value<=999999999999999999.999 ? true : false
        return valid
      },
      message: "Maximum 18 digit with 3 decimal allow"
    },
    custom2: {
      isValid: (value,compareValue) => {
        const valid =  value % compareValue?.value2 === 0 ? true : false
        return valid
      },
      message: "Transaction Amount should be in multiplies of Number of Units & Current Unit Price."
    }
  },
  // numberOfUnits: {
  //   required: {
  //     value: true,
  //     message: "Please enter number of units",
  //   },
  //   pattern: {
  //     value: /^[0-9]{0,18}.[0-9]{0,3}$/,
  //     message: "Maximum 18 digit with 3 decimal allow",
  //   }
  // },
  unitType: {
    required: {
      value: true,
      message: "Please select unit type",
    }
  },
  
  // unitPrice: {
  //   required: {
  //     value: true,
  //     message: "Please enter unit price",
  //   },
  // },
};

