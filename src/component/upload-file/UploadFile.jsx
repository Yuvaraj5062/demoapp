import styles from "./uploadfile.module.scss";
import FilledButton from "../filled-button/FilledButton";
import { useState, useRef, useEffect } from "react";

const UploadFile = ({
  buttonStyle,
  browseContent,
  browseFile,
  selectedFileText,
  customClass,
  setFile,
  file,
  accept,
  text
}) => {
  const hiddenFileInput = useRef(null);
  const [dragging, setDragging] = useState(false);

  const drop = useRef(null);

  const onUpload = (files) => {
    setFile(files[0]);
  };

  useEffect(() => {
    drop.current?.addEventListener("dragover", handleDragOver);
    drop.current?.addEventListener("drop", handleDrop);
    drop.current?.addEventListener("dragenter", handleDragEnter);
    drop.current?.addEventListener("dragleave", handleDragLeave);

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
    // setFile(null)
  };

  const handlechangeFile = (e) => {
    setFile(e.target.files[0]);
    e.target.value = ''
  };

  return (
    <div className={[styles.uploadContainer, customClass].join(" ")} ref={drop}>
      {/* <FilledButton
        onUpload={() => onUpload()}
        title={file?.name}
        customClass={buttonStyle}
        handleClick={() => handleClick()}
      /> */}
      {/* <span>{file?.name}</span> */}

      <div
        className={[styles.uploadFileIcon, browseFile].join(" ")}
        onClick={() => handleClick()}
      >
      <span className={text?styles.text:""} >  {text}</span>
      <span >{browseContent}</span>
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        style={{ display: "none" }}
        onChange={(e) => handlechangeFile(e)}
        accept={accept ? accept : ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
      />
    </div>
  );
};

export default UploadFile;
