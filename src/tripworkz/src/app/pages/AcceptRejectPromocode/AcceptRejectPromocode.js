import React,{useEffect, useState} from 'react'
import { useLocation, useHistory } from 'react-router'
import AcceptRejectTemplate from './AcceptRejectTemplate'
import { useDispatch} from "react-redux";
import * as actions from "../../components/_redux/mainActions";
import { toAbsoluteUrl } from '../../../_metronic/_helpers';

const AcceptRejectPromocode = () => {
    const history = useHistory()
    const [success,setSuccess]=useState(false)
    const [invitationStatus,setInvitationStatus]=useState()
    const [message,setMessage]= useState({
        head:"",
        paragraph:""
    })
    const location = useLocation()
    const dispatch = useDispatch();
    

    useEffect(()=>{
        let url_str = location.search;
        let urlParams= url_str.replace("?tm=", "");
        // All three params are found here
        let getEmailId=urlParams.split("&gv=")[0]
        let getVoucherId=urlParams.split("&ar=")[0].split("&gv=")[1]
        
        let getInvitationtype= urlParams.split("&ar=")[1]

        if(getEmailId && getVoucherId && getInvitationtype){
            if(getInvitationtype==="accept"){
                setSuccess(true)
                setMessage({
                    head:"Successs",
                    paragraph:"Voucher redeemed successfully!"
                })
            }
            else{
                setSuccess(false)
                setMessage({
                    head:"Rejected",
                    paragraph:"Voucher rejected !"
                })
            }
            let body={
                "emaiL_ID":getEmailId,
                "gifT_VOUCHER_ID":getVoucherId,
                "type":getInvitationtype
            }
            dispatch(actions.giftVoucherAcceptStatus(body)).then((res)=>{
                if(res.status===200){
                    setMessage({
                        head:"Successful",
                        paragraph:res.data
                    })
                    setTimeout(()=>{
                        history.push("/")
                    },5000)
                }
                else if (res.response.status === 500){
                    setSuccess(false)
                    setMessage({
                        head:"Fail",
                        paragraph:res.response.data ,
                    })
                    setTimeout(()=>{
                        history.push("/")
                    },5000)
                }
                else{
                    setMessage({
                        head:"Fail",
                        paragraph:res.response.message
                    })
                    setSuccess(false)
                    setTimeout(()=>{
                        history.push("/")
                    },5000)
                }
            }
            )
            
        }else{
            setMessage({
                head:"Invalid link",
                paragraph:"Please enter correct link to redeem voucher."
            })
            setSuccess(false)
        }
      }
      
      ,[])

    return (
       <>
       <AcceptRejectTemplate message={message} success={success} />
       </>

    )
}

export default AcceptRejectPromocode
