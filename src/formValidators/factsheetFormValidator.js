export const factsheetFormValidator = {
  investmentObjective: {
    required: {
      value: true,
      message: "Please enter investment objective",
    },
  },
  portfolioManager: {
    required: {
      value: true,
      message: "Please enter portfolio manager",
    },
  },
  email: {
    required: {
      value: true,
      message: "Please enter email",
    },
    pattern: {
      value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      message: "Please enter valid email address",
    },
  },
  fsp: {
    required: {
      value: true,
      message: "Please enter fsp number",
    },
  },
  telephone: {
    required: {
      value: true,
      message: "Please enter telephone number",
    },
    pattern: {
      value:/^[\d ()+]+$/,
      message: "Telephone number allows digits, () and + only",
    },
    // custom: {
    //   isValid: (value) =>
    //     value && value.length >= 8 && value.length <= 15 ? true : false,
    //   message: "Telephone number must be between 8 to 15 digits",
    // },
  },
  sector: {
    required: {
      value: true,
      message: "Please enter sector",
    },
  },
  target: {
    required: {
      value: true,
      message: "Please enter target returns",
    },
  },
  participatoryStructure: {
    required: {
      value: true,
      message: "Please enter Possible participatory structures",
    },
  },
  minInvestment: {
    required: {
      value: true,
      message: "Please enter minimum investment",
    },
  },
  recommended: {
    required: {
      value: true,
      message: "Please enter recommended investment",
    },
  },
  // performanceFee: {
  //   required: {
  //     value: true,
  //     message: "Please enter performance fee benchmark",
  //   },
  // },
  baseFee: {
    required: {
      value: true,
      message: "Please enter base fees",
    },
  },
  annualFeesUnitA: {
    required: {
      value: true,
      message: "Please enter Annual Fees For Unit A",
    },
    custom: {
      isValid: (value) =>{ 
       const valid = value && value>=0 && value<=100 ? true : false
       return valid
      },
      message: "Percentage must between 0 to 100",
    },
  },
  annualFeesUnitB: {
    required: {
      value: true,
      message: "Please enter Annual Fees For  Unit B",
    },
    custom: {
      isValid: (value) =>{ 
       const valid = value && value>=0 && value<=100 ? true : false
       return valid
      },
      message: "Percentage must between 0 to 100",
    },
  },
  // annualFeesUnitC: {
  //   required: {
  //     value: true,
  //     message: "Please enter Annual Fees For Unit C",
  //   },
  //   custom: {
  //     isValid: (value) =>{  
  //      const valid = value && value>=0 && value<=100 ? true : false
  //      return valid
  //     },
  //     message: "Percentage must between 0 to 100",
  //   },
  // },
  // sharingRatio: {
  //   required: {
  //     value: true,
  //     message: "Please enter sharing ratio",
  //   },
  // },
  feeHurdle: {
    required: {
      value: true,
      message: "Please enter fee hurdle",
    },
  },
  performanceFeesUnitA: {
    required: {
      value: true,
      message: "Please enter Performance Fees For Unit A",
    },
    custom: {
      isValid: (value) =>{
       const valid = value && value>=0 && value<=100 ? true : false
       return valid
      },
      message: "Percentage must between 0 to 100",
    },
  },
  performanceFeesUnitB: {
    required: {
      value: true,
      message: "Please enter Performance Fees For Unit B",
    },
    custom: {
      isValid: (value) =>{
       const valid = value && value>=0 && value<=100 ? true : false
       return valid
      },
      message: "Percentage must between 0 to 100",
    },
  },
  // performanceFeesUnitC: {
  //   required: {
  //     value: true,
  //     message: "Please enter Performance Fees For Unit C",
  //   },
  //   custom: {
  //     isValid: (value) =>{
  //      const valid = value && value>=0 && value<=100 ? true : false
  //      return valid
  //     },
  //     message: "Percentage must between 0 to 100",
  //   },
  // },
  feeExample: {
    required: {
      value: true,
      message: "Please enter fee example",
    },
  },
  method: {
    required: {
      value: true,
      message: "Please enter method of calculating",
    },
  },
  shortCommentary: {
    required: {
      value: true,
      message: "Please enter short commentary detail",
    },
  },
  disclaimer: {
    required: {
      value: true,
      message: "Please enter disclaimer",
    },
  },
};
