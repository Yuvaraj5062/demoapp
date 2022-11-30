import CircleLoader from "../../../component/circle-loader/CircleLoader";
import styles from "./allowaccesspopup.module.scss";
const AllowAccess = ({ handleClose }) => {
  return (
    <>
    <div className={styles.cf}>



      <div className={styles.mainContainer}>
    
        <div className={styles.mainData}>
          <div className={styles.loader}>
            <CircleLoader />
          </div>
          <span className={styles.text}>
            please allow access from your mobile app.
          </span>
        </div>
      </div>

      </div>
    </>
  );
};
export default AllowAccess;
