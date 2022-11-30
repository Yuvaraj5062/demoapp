import { Cross, Upload } from "../../svg-components";
import profileImage from "../../../assets/images/profileImage.png";
import styles from "./uploadprofilephoto.module.scss";
import FilledButton from "../../filled-button/FilledButton";
import UploadFile from "../../upload-file/UploadFile";
import { colors } from "../../../constants/Colors";
import UploadImage from "../../upload-image/UploadImage";
const UploadProfilePhoto = ({
  handleClose,
  handleToast,
  setPopupData,
  popupData,
}) => {

  return (
    <div
      className={styles.profilePhotocontainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.crossContainer}>
        <div className={styles.cross}>
          <Cross
            fillColor="#FFFFFF"
            handleClose={() => handleClose()}
            customClass={styles.icon}
          />
        </div>
      </div>
      <div className={styles.content}>
        {/* <img src={profileImage} alt="" className={styles.profilePhoto} /> */}

        {popupData ? (
          <img
            src={popupData}
            // src={URL.createObjectURL(data)}
            alt="ProfilePhoto"
            className={styles.profilePhoto}
          />
        ) : (
          <img
            src={profileImage}
            // src={URL.createObjectURL(image)}
            alt="ProfilePhoto"
            className={styles.profilePhoto}
          />
        )}

        <div className={styles.uploadPhoto}>
          {/* <FilledButton
            title="Upload Your Photo"
            customClass={styles.photoHeading}
            handleClick={()=>{}}
          /> */}

          <UploadImage
            selectedFileText="Upload Your Photo"
            buttonStyle={styles.photoHeading}
            browseContent={<Upload fillColor={colors.white} />}
            setPopupData={setPopupData}
            type="button"
          />
        </div>
      </div>
      <div className={styles.crossSaveContainer}>
        <FilledButton
          title="Save"
          customClass={styles.saveButton}
          handleClick={() => handleToast()}
        />
      </div>
    </div>
  );
};
export default UploadProfilePhoto;
