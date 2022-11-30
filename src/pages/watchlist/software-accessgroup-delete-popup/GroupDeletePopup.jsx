import styles from "./groupdeletepopup.module.scss";
import FilledButton from "../../../component/filled-button/FilledButton";
import { useDispatch } from "react-redux";
import {
  deleteExistingGroup,
  emptyListOfAccessCategory,
  getAllGroup,
} from "../../../redux/features/watchlist/watchListSlice";
const GroupDeletePopup = ({ handleClose, handleDelete, msg }) => {
  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.deleteHeading}>
          <p className={styles.paragraph}>{msg}</p>
          {/* <p className={styles.paragraph1}>
            This will {popupData?.group?.accessCategory} delete group
          </p> */}
          {/* <p className={styles.paragraph2}>
            Registered Software Access Groups Are you Sure?
          </p> */}
        </div>
        <div className={styles.buttonContainer}>
          <FilledButton
            title="Cancel"
            customClass={styles.cancelButton}
            handleClick={() => handleClose()}
          />
          <FilledButton
            title="Delete"
            customClass={styles.deleteButton}
            handleClick={() => handleDelete()}
          />
        </div>
      </div>
    </>
  );
};
export default GroupDeletePopup;
