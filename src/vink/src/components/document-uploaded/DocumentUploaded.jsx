import { useDispatch, useSelector } from "react-redux";
import { color } from "../../constants/color";
import {
  editUrls,
  removeDocument,
  setImages,
} from "../../redux/auth/register/documentUploadSlice";
import Divider from "../divider/Divider";
import {
  DeleteIcon,
  UploadCheckIcon,
  UploadCloseIcon,
  UploadFileIcon,
  ViewIcon,
} from "../svg-components";
import styles from "./documentUploaded.module.scss";

const DocumentUploaded = ({ file, doctype }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.register);
  const viewDoc = (file) => {
    window.open(`https://${file}`, "_blank");
  };

  const deleteFile = (files) => {
    dispatch(
      removeDocument({
        userId: userInfo?.data?.userId,
        documentId: files.documentId,
      })
    ).then((e) => {
      e.type === "documentUpload/removeDocument/fulfilled" &&
        dispatch(editUrls({ doctype, id: files.documentId }));
    });
  };

  return (
    <>
      {file.map((item, index) => {
        return (
          <>
            <div className={styles.mainContainer}>
              <ol className={styles.listContainer}>
                <li className={styles.listData}>
                  <span className={styles.spanText}>{index + 1}.</span>
                  {item.fileName}
                </li>
              </ol>
              <div>
                <ViewIcon
                  fillColor={color.blue1}
                  customClass={styles.viewBtn}
                  handleView={() => {
                    viewDoc(item.documentPath);
                  }}
                />

                <DeleteIcon
                  fillColor={color.red2}
                  customClass={styles.deleteBtn}
                  handleDelete={() => {
                    deleteFile(item);
                  }}
                />
              </div>
            </div>
            <Divider customClass={styles.dividerStyle} />
          </>
        );
      })}
    </>
  );
};

export default DocumentUploaded;
