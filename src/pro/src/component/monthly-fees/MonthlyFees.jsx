import { useEffect, useState } from 'react';
import styles from './monthlyfees.module.scss';

const MonthlyFees = ({ feesData, monthlyFeesTitle, totalAmount, role }) => {
    // const pageRole = [
    //     {
    //         role:['Compliance user','Admin user'],
    //         title:'Walt Capital SA monthly fees'
    //     },
    //     {
    //         role:['Super user','Compliance user'],
    //         title:'Walt Capital Offshore monthly fees'
    //     }
    // ];
    // console.log('page role>>',pageRole,role);
    // console.log('monthley role included',pageRole.includes(role));
    // const [hasRole,setHasRole] = useState(null);
    // console.log('componenet called')
    // useEffect(()=>{
    //     console.log(monthlyFeesTitle)
    //   for(let i = 0; i<pageRole.length ; i++){
    //       console.log('condition true>>>',pageRole[i].role.includes(role) && pageRole[i].title === monthlyFeesTitle)
    //       console.log('role has',pageRole[i].role.includes(role),pageRole[i].role)
    //       console.log('path matched',pageRole[i].title === monthlyFeesTitle,pageRole[i].title)
    //       if(pageRole[i].role.includes(role) && pageRole[i].title === monthlyFeesTitle){
    //           setHasRole(true)
    //           return hasRole
    //       }
    //       else {
    //         setHasRole(false)
    //         return hasRole
    //       }
    //   }
    // },[])
    return (
        // hasRole ?
        <div className={styles.monthlyFeesContainer}>
            <div className={styles.title}><p className={styles.titleText}>{monthlyFeesTitle}</p></div>
            {
                feesData.map((item, index) => {
                    return (
                        <div key={index} className={styles.feesStructure}>
                            <span>{item.title}</span>
                            <span>{item.fees}</span>
                        </div>
                    )
                })
            }
            <div className={styles.totalAmountContainer}>
                <span>TOTAL</span>
                <span>{totalAmount}</span>
            </div>
        </div>
    )
}

export default MonthlyFees;