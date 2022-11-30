import Button from "../../button/Button";
import Close from "../close/Close";
import styles from "./uploadProfilePictureModal.module.scss";
import profilePictureImage from "../../../assests/images/profilePictureImage.png";
import { UploadPicture } from "../../svg-components";
import { color } from "../../../constants/color";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelError,
  setImageUploadError,
  uploadUserImage,
} from "../../../redux/auth/register/userImageSlice";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import StatusModal from "../../status-modal/StatusModal";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import { fileSizeValidator } from "../../../helpers/fileSizeValidator";

const UploadProfilePictureModal = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.register);

  const hiddenFileInput = useRef(null);
  const drop = useRef(null);
  const [selectFile, setSelectFile] = useState();
  const [image, setImage] = useState("");
  const { error, loading } = useSelector((state) => state.userImage);

  const handleUpload = () => {
    hiddenFileInput.current.click();
  };

  const handleUploadProfile = () => {
    const fromData = new FormData();
    fromData.append("UserId", userInfo?.data?.userId);
    fromData.append("Files", selectFile);
    userInfo?.data?.userId && selectFile && dispatch(uploadUserImage(fromData));
  };

  const handleClose = () => {
    dispatch(closePopup());
  };

  //  let photo;
  const handleFileChnage = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split("/")[1];
    const validSize = fileSizeValidator(file.size, fileType.toUpperCase());
    /* 
    fileSize validator returns a boolean and msg 
    IN case of any error true&& msg
    */
    if (validSize.status === false) {
      dispatch(setImageUploadError(validSize.msg));
      return;
    }
    setSelectFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      //photo = e.currentTarget.result;
      setImage(e.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <StatusModal
          status="Error!"
          statusDetail={error}
          buttonText="Retry"
          action={cancelError()}
        />
      ) : (
        <div className={styles.uploadPhotoContainer}>
          {/* <Close handleClose={handleClose} /> */}
          <form className={styles.fieldContainer}>
            <p className={styles.register}>Register</p>
            <p className={styles.uploadPicture}>Upload your Profile Picture</p>
            <div className={styles.imageContainer}>
              <img
                src={image ? image : profilePictureImage}
                className={styles.imageStyle}
              />
              <div className={styles.iconContainer}>
                <UploadPicture
                  fillColor={color.blue1}
                  customClass={styles.uploadIconStyle}
                  handleUpload={() => handleUpload()}
                  ref={drop}
                />
                <input
                  type="file"
                  ref={hiddenFileInput}
                  accept="image/jpg, image/jpeg, image/png"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChnage(e)}
                />
              </div>
            </div>
            <Button
              title="Let’s Continue"
              customClass={styles.continueBtn}
              customClassForText={styles.continueText}
              handleClick={handleUploadProfile}
            />
            <p className={styles.accText}>
              Already have an account?
              <span
                className={styles.signIn}
                onClick={() => dispatch(popup("LoginScreen"))}
              >
                {" "}
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadProfilePictureModal;
