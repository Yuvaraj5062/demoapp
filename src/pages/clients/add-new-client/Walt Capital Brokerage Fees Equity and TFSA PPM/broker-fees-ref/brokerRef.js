import { useRef } from "react"


const useBrokerReference = () => {
    const other = useRef();
    const adminMonthlyFee = useRef();
    const flatBrokerageRate = useRef();
    const brokerageRate = useRef();
    const performanceFee = useRef();
    const annualManagementFee = useRef();
    const initialFee = useRef();
    const PPM=useRef()
    const dcs=useRef()

    return {
        other,
        adminMonthlyFee,
        flatBrokerageRate,
        brokerageRate,
        performanceFee,
        annualManagementFee,
        initialFee,
        PPM,
        dcs   
    }
}

export default useBrokerReference;