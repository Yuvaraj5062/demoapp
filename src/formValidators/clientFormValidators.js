export const clientFormValidators = 
{
  officeId: {
    required: {
      value: true,
      message: "Please Select Office",
    },
  },
  // salutation: {
  //   required: {
  //     value: true,
  //     message: "Please Select Salutation",
  //   },
  // },
  middleName: {
    required: {
      value: true,
      message: "Please Enter Middle Name",
    },
  },
  responsiblePerson: {
    required: {
      value: true,
      message: "Please Enter Title",
    },
  },
  firstName: {
    required: {
      value: true,
      message: "Please Enter First Name",
    },
  },
  lastName: {
    required: {
      value: true,
      message: "Please Enter Last Name",
    },
  },
  positionHeld: {
    required: {
      value: true,
      message: "Please Enter Position held",
    },
  },
  trustRegNo: {
    required: {
      value: true,
      message: "Please Enter Company / Trust Registration Number",
    },
  },
  // mobileNo: {
  //   required: {
  //     value: true,
  //     message: "Please Enter Mobile Number",
  //   },
  // },
  workNo: {
    required: {
      value: true,
      message: "Please Enter Work Number",
    },
  },
  email: {
    required: {
      value: true,
      message: "Please Enter Email",
    },
    pattern: {
      value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      message: "Please enter valid email address",
    },
  },
  sarstaxNo: {
    required: {
      value: true,
      message: "Please Enter Personal / Company / Trust Tax Number",
    },
  },
  streetNo: {
    required: {
      value: true,
      message: "Please Enter Street Number",
    },
  },
  // homeName: {
  //   required: {
  //     value: true,
  //     message: "Please Enter Home Name",
  //   },
  // },
  streetName: {
    required: {
      value: true,
      message: "Please Enter Street Name",
    },
  },
  suburb: {
    required: {
      value: true,
      message: "Please Enter Suburb",
    },
  },
  countryId: {
    required: {
      value: true,
      message: "Please Select Country of Residence",
    },
  },
  stateId: {
    required: {
      value: true,
      message: "Please Select Province",
    },
  },
  cityId: {
    required: {
      value: true,
      message: "Please Select City",
    },
  },
  postalCode: {
    required: {
      value: true,
      message: "Please Enter Postal Code",
    },
    custom: {
      isValid: (value) =>
        value && value.length >= 4 && value.length <= 4 ? true : false,
      message: "Postal Code Must Be 4 Digits",
    },
  },
  accountType: {
    required: {
      value: true,
      message: "Please Select Account Type",
    },
  },
  accountHolder: {
    required: {
      value: true,
      message: "Please Enter Name of Acc. Holder",
    },
  },
  bank: {
    required: {
      value: true,
      message: "Please Enter Bank",
    },
  },
  accountNo: {
    required: {
      value: true,
      message: "Please Enter Account Number",
    },
  },
  branchCode: {
    required: {
      value: true,
      message: "Please Enter Branch Code",
    },
  },
  swiftCode: {
    required: {
      value: true,
      message: "Please Enter Swift Code",
    },
  },
  maritalStatus: {
    required: {
      value: true,
      message: "Please Select Marital Status",
    },
  },
  // softwareAccessGroup: {
  //   required: {
  //     value: true,
  //     message: "Please Select Software Access Group",
  //   },
  // },
  spouseName: {
    required: {
      value: true,
      message: "Please Enter Spouse’s Name",
    },
  },
  // spouseDob:{
  //     required: {
  //         value: true,
  //         message: "Please Enter Spouse’s DOB",
  //     }
  // },
  clientType: {
    required: {
      value: true,
      message: "Please Select Client Type",
    },
  },

  personalityType: {
    required: {
      value: true,
      message: "Please Select Personality Type",
    },
  },
  waltCapConsultant: {
    required: {
      value: true,
      message: "Please Select Walt Cap. Consultant",
    },
  },
  ifa: {
    required: {
      value: true,
      message: "Please Select IFA",
    },
  },
  faserial: {
    required: {
      value: true,
      message: "Please Enter 2FA Serial",
    },
  },
  nickName: {
    required: {
      value: true,
      message: "Please Enter Nick Name",
    },
  },
};
