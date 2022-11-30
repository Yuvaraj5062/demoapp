import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileSizeValidator } from "../../helpers/fileSizeValidator";
import {
  addressProofUpload,
  idProofUpload,
} from "../../redux/auth/register/documentUploadSlice";
import { setDocUploadError } from "../../redux/auth/register/documentUploadSlice";
import Button from "../button/Button";
import styles from "./uploadDocument.module.scss";

const UploadDocument = ({
  buttonStyle,
  icon,
  customClassForText,
  customClassForIcon,
  // selectedFileText,
  setSelectFileName,
  selectFileName,
  buttonTitle,
  customClass,
  eve,
}) => {
  const hiddenFileInput = useRef(null);
  const [dragging, setDragging] = useState(false);
  const drop = useRef(null);
  const dispatch = useDispatch();
  const [icon1, setIcon] = useState(icon);
  const { userInfo } = useSelector((state) => state.register);
  let data = [];
  const onUpload = (files) => {
    setSelectFileName(files[0]);
    data.push(files[0]);
    handelDocUpload(data);
  };

  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);
    drop.current.addEventListener("dragenter", handleDragEnter);
    drop.current.addEventListener("dragleave", handleDragLeave);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
      drop.current?.removeEventListener("dragenter", handleDragEnter);
      drop.current?.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files && files.length) {
      onUpload(files);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handelDocUpload = (file) => {
    const fileType = file.type.split("/")[1];
    const validSize = fileSizeValidator(file.size, fileType.toUpperCase());
    /* 
    fileSize validator returns a boolean and msg 
    IN case of any error true&& msg
    */
    if (validSize.status === false) {
      dispatch(setDocUploadError(validSize.msg));
      return;
    }

    if (validSize.status) {
      const data = new FormData();
      data.append("Files", file);
      data.append("UserId", userInfo.data.userId);

      if (eve === "addressproof") {
        dispatch(addressProofUpload(data));
      }
      if (eve === "idproof") {
        dispatch(idProofUpload(data));
      }
    }
  };

  const handleChange = (e) => {
    setSelectFileName(e.target.files[0]);
    handelDocUpload(e.target.files[0]);
    data.push(e.target.files[0]);
  };

  return (
    <>
      <div
        className={[styles.uploadContainer, customClass].join(" ")}
        ref={drop}
      >
        <Button
          // onUpload={() => onUpload()}
          title={buttonTitle}
          icon={icon1}
          customClass={buttonStyle}
          customClassForText={customClassForText}
          customClassForIcon={customClassForIcon}
          handleClick={() => handleClick()}
        />
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={(e) => handleChange(e)}
          accept=".jpg, .jpeg, .png ,.pdf, .tif, .gif"
        />
      </div>
    </>
  );
};

export default UploadDocument;
