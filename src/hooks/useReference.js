import { useRef } from "react"

const useReference = () => {
    const officeId = useRef();
    const clientAccNo = useRef();
    const responsiblePerson = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const positionHeld = useRef();
    const dob = useRef();
    const trustRegNo = useRef();
    const mobileNo = useRef();
    const workNo = useRef();
    const email = useRef();
    const sarstaxNo = useRef();
    const streetNo = useRef();
    const homeName = useRef();
    const streetName = useRef();
    const suburb = useRef();
    const countryId = useRef();
    const stateId = useRef();
    const cityId =useRef();
    const postalCode = useRef();
    const accountHolder = useRef();
    const bank = useRef();
    const accountType = useRef();
    const accountNo = useRef();
    const branchCode = useRef();
    const swiftCode = useRef();
    const clientType = useRef();
    const personalityType = useRef();
    const waltCapConsultant = useRef();
    const ifa = useRef();
    const maritalStatus = useRef();
    const softwareAccessGroup = useRef();
    const spouseName = useRef();
    const faserial = useRef();
    const spouseDob = useRef();
    const nickName = useRef();
    const salutation=useRef();
    const middleName=useRef();
    return {
        nickName,
        spouseDob,
        faserial,
        spouseName,
        softwareAccessGroup,
        maritalStatus,
        ifa,
        waltCapConsultant,
        personalityType,
        clientType,
        swiftCode,
        branchCode,
        accountNo,
        accountType,
        bank,
        accountHolder,
        postalCode,
        cityId,
        stateId,
        countryId,
        suburb,
        streetName,
        homeName,
        streetNo,
        sarstaxNo,
        email,
        workNo,
        mobileNo,
        trustRegNo,
        dob,
        positionHeld,
        lastName,
        firstName,
        responsiblePerson,
        clientAccNo,
        officeId,
        salutation,
        middleName
    }
}

export default useReference;