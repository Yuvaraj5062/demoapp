import styles from "./uploadimage.module.scss";
import FilledButton from "../filled-button/FilledButton";
import { useState, useRef, useEffect } from "react";

const UploadImage = ({
  buttonStyle,
  browseContent,
  browseFile,
  selectedFileText,
  customClass,
  setPopupData
}) => {
  const hiddenFileInput = useRef(null);
  const onUpload = (files) => {
    fileToDataUrl(files)
    //  setPopupData(file)
  };


   async function fileToDataUrl(file) {
    // check
    const reader = new FileReader();
    let photo;
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      photo = e.currentTarget.result;
      if (photo) {
        let strings = photo.split(",");
        switch (strings[0]) {//check image's extension
          case "data:image/jpeg;base64":
            setPopupData(photo)
            break;
          case "data:image/png;base64":
            setPopupData(photo)
            break;
          case "data:image/jpg;base64":
            setPopupData(photo)
            break;
          default:
            //write error messages here
            break;
        }
      }
    };
  
    return "";
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  
  return (
    <div className={[styles.uploadContainer, customClass].join(" ")} >
      <FilledButton
        onUpload={() => onUpload()}
        title={selectedFileText}
        customClass={buttonStyle}
        handleClick={() => handleClick()}
      />
      <input
        type="file"
        accept=".jpeg, .jpg, .png"
        ref={hiddenFileInput}
        style={{ display: "none" }}
        onChange={(e) => onUpload(e.target.files[0])}
      />
    </div>
  );
};

export default UploadImage;
