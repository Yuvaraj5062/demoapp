// import { useCallback, useState } from "react";
// import { useEffect } from "react";
import styles from "./bonusPointCard.module.scss";


const BonusPointCard = ({ icon, points, pointTitle }) => {
  // const [count,setCount]=useState(0)
  //     const handleScollTab = useCallback(
  //       () => {
  //         setTimeout(() => {
  //           if(count<points)
  //           setCount(count+1)
  //         }, 0.5);
  //       },
  //       [count]
  //     );

  //      useEffect(() => {
  //   handleScollTab()
  //     }, [count])


  return (
    <>
      <div className={styles.bonusPointCard}>
        {/* <span> */}
        <div>

          {icon}
        </div>
        {/* </span> */}
        <div className={styles.pointInfo}>
          <span className={styles.pointText}>
            {points}
          </span>
          <span className={styles.titleText}>{pointTitle}</span>
        </div>
      </div>
    </>
  );
};

export default BonusPointCard;
