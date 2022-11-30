export const ifaFormValidation = {
    // registrationNo: {
    //     required: {
    //         value: true,
    //         message: "Please Enter FSCA Registration No",
    //     },
    // },
    // clientAccNo: {
    //     required: {
    //         value: true,
    //         message: "Please Enter IFA Practise No",
    //     },
    // },

    responsiblePersonTitle: {
        required: {
            value: true,
            message: "Please Enter Key Individual – Responsible Person",
        },
    },

    title: {
        required: {
            value: true,
            message: "Please Select Responsible Person Title",
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
            message: "Please Enter Surname",
        },
    },

    positionHeld: {
        required: {
            value: true,
            message: "Please Enter Position held",
        },
    },

    dob: {
        required: {
            value: true,
            message: "Please Select Date of Birth",
        },
    },


    companyName: {
        required: {
            value: true,
            message: "Please Enter Company Name",
        },
    },


    compRegNumber: {
        required: {
            value: true,
            message: "Please Enter Comp. Reg. Number",
        },
    },

    sarstaxNo: {
        required: {
            value: true,
            message: "Please Enter SARS Tax Number",
        },
    },

    vatno: {
        required: {
            value: true,
            message: "Please Enter VAT Number",
        },
    },

    lastDateChecked: {
        required: {
            value: true,
            message: "Please Select Last Date Checked",
        },
    },

    workNo: {
        required: {
            value: true,
            message: "Please Enter Work Number",
        },
        pattern: {
            value: /^[0-9]*$/,
            message: 'Please Enter Valid Work Number'
        }
    },

    // notes: {
    //     required: {
    //         value: true,
    //         message: "Please Enter Note",
    //     },
    // },

    floorandOfficeNo: {
        required: {
            value: true,
            message: "Please Enter Floor And Office Number",
        },
    },

    // streetNo: {
    //     required: {
    //         value: true,
    //         message: "Please Enter Street Number",
    //     },
    //  },
    buildingName: {
        required: {
            value: true,
            message: "Please Enter Building Name",
        },
    },
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
    officeId: {
        required: {
            value: true,
            message: "Please Select Office",
        },
    },

    registrationNo: {
        required: {
            value: true,
            message: "Please Enter FSCA Registration No",
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
    email: {
        required: {
            value: true,
            message: "Please Enter Email",
        },
        pattern: {
            value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            message: "Please Enter valid email address",
        },
    },
    mobileNo: {
        required: {
            value: true,
            message: "Please Enter Mobile Number",
        },
        pattern: {
            value: /^[0-9]*$/,
            message: 'Please Enter Valid Mobile Number'
        }

    },
    accessCategory: {
        required: {
            value: true,
            message: "Please Select Software Access Group ",
        },
    }, 
    role: {
        required: {
            value: true,
            message: "Please Select Role ",
        },
    },

}


export const ifaPhase1FormValidation = {
    initialFees: {
        required: {
            value: true,
            message: "Please Enter initial fees",
        },
    }, annualAdvisorFees: {
        required: {
            value: true,
            message: "Please Enter annual advisor fees",
        },
    }, performanceFees: {
        required: {
            value: true,
            message: "Please Enter performance fees",
        },
    },
    other: {
        required: {
            value: true,
            message: "Please Enter other fees",
        },
    },


}