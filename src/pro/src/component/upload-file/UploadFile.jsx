import styles from "./uploadfile.module.scss";
import FilledButton from "../filled-button/FilledButton";
import { useState, useRef, useEffect } from "react";

const UploadFile = ({
  buttonStyle,
  browseContent,
  browseFile,
  selectedFileText,
  customClass,
}) => {
  const hiddenFileInput = useRef(null);
  const [dragging, setDragging] = useState(false);
  const drop = useRef(null);
  const onUpload = (files) => {
    setSelectFile(files[0].name);
  };

  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);
    drop.current.addEventListener("dragenter", handleDragEnter);
    drop.current.addEventListener("dragleave", handleDragLeave);

    return () => {
      drop.current.removeEventListener("dragover", handleDragOver);
      drop.current.removeEventListener("drop", handleDrop);
      drop.current.removeEventListener("dragenter", handleDragEnter);
      drop.current.removeEventListener("dragleave", handleDragLeave);
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
  const [selectFile, setSelectFile] = useState(selectedFileText);
  return (
    <div className={[styles.uploadContainer, customClass].join(" ")} ref={drop}>
      <FilledButton
        onUpload={() => onUpload()}
        title={selectFile}
        customClass={buttonStyle}
        handleClick={() => handleClick()}
      />

      <div
        className={[styles.uploadFileIcon, browseFile].join(" ")}
        onClick={() => handleClick()}
      >
        {browseContent}
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        style={{ display: "none" }}
        onChange={(e) => setSelectFile(e.target.files[0].name)}
      />
    </div>
  );
};

export default UploadFile;
