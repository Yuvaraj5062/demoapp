import { Cross } from "../../svg-components";
import profileImage from "../../../assets/images/profileImage.png";
import styles from "./uploadprofilephoto.module.scss";
import FilledButton from "../../filled-button/FilledButton";
const UploadProfilePhoto = ({handleClose,handleToast}) => {
  return (
    <div className={styles.profilePhotocontainer} onClick={(e)=>{e.stopPropagation()}}>
      <div className={styles.crossContainer}>
        <div className={styles.cross}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </div>
      </div>
      <div className={styles.content}>
        <img src={profileImage} alt="" className={styles.profilePhoto} />
        <div className={styles.uploadPhoto}>
          <FilledButton
            title="Upload Your Photo"
            customClass={styles.photoHeading}
            handleClick={()=>{}}
          />
        </div>
      </div>
      <div className={styles.crossSaveContainer}>
        <FilledButton title="Save" customClass={styles.saveButton} handleClick={()=>handleToast()} />
      </div>
    </div>
  )
}
export default UploadProfilePhoto;
