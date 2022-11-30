import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeData } from "../../app/routes/routeData";
import useRole from "../../hooks/useRole";
// import WaltValuation from "../walt-valuation/WaltValuation";
import styles from "./globalfundcard.module.scss";
const GlobalFundCard = ({ title }) => {
  const navigate = useNavigate();
  const {role} = useRole();
  const [pageRole,setPageRole] = useState([]);
  useEffect(()=>{
      routeData.map((item)=>{
        if(item.location === '/fund-administration'){
          setPageRole(item.role)
        }
        return pageRole
      })
  },[pageRole])
  return (
    
      pageRole.includes(role) ? (
        <div onClick={()=>navigate('/fund-administration')} className={styles.globalFundCardContainer}>
        <div className={styles.globalfundcard}>
          <div className={styles.globalFundContentLeft}>
            <p className={styles.title}>{title}</p>
            <p className={styles.usdValue}>USD: 5,744,509</p>
            {/* <WaltValuation waltValue="USD: 5,744,509" customClass={styles.waltValuation} /> */}
          </div>
  
          <div className={styles.globalFundContent}>
            <div className={styles.trustText}>(CI) Trusts: 15</div>
            <div className={styles.llcText}>(CI) LLCs: 2</div>
            <div className={styles.privateInvestorsText}>
              Private investors: 31
            </div>
          </div>
        </div>
  
        <div className={styles.clientsData}>
          <span>
            Private Clients = <span className={styles.value}>256</span>
          </span>
          <span>
            CI Trusts = <span className={styles.value}>26</span>
          </span>
          <span>
            CI LLC’s = <span className={styles.value}>7</span>
          </span>
        </div>
      </div>
      ) : null
    
   
  );
};

export default GlobalFundCard;
