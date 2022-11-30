import { useDispatch, useSelector } from "react-redux";
import Divider from "../../../component/divider/Divider";

import FilledButton from "../../../component/filled-button/FilledButton";
import {
    Cross, DeleteIcon, ViewIcon,
} from "../../../component/svg-components";
import { removeDocs } from "../../../redux/features/crm/crmSlice";

import styles from "./clientDocsList.module.scss";

const ClientDocumentList = ({ handleClose, popupData }) => {
    const {
        docs,
    } = useSelector((state) => state.crm)
    const dispatch = useDispatch()
    const viewDoc = (item) => {
        let fileType = item.file.split(',')[0]
        if (fileType.includes('image')) {
            let image = new Image();
            image.src = item.file
            let w = window.open("");
            w.document.write(image.outerHTML);
        }
        else if (fileType === 'data:application/pdf;base64') {
            const downloadLink = document.createElement("a");
            const fileName = item.fileName
            downloadLink.href = item.file;
            downloadLink.download = fileName;
            downloadLink.click()
        }
        else {
            window.open(item.file)
        }
    };
    return (
        <>
            <div
                className={styles.mainContainer}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >


                <div className={styles.modalTitle}>
                    Documents list
                    <span className={styles.crossIcon}>
                        <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
                    </span>
                </div>
                <div className={styles.tableContent}>

                    <div className={styles.mainTable}>
                        {docs.length > 0 &&
                            docs.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={styles.tabelRow}
                                            key={index}
                                        >
                                            <div>{item.fileName}</div>

                                            <div className={styles.iconContainer}>
                                                <ViewIcon
                                                    fillColor="#0B6AAB"
                                                    customClass={styles.viewIcon}
                                                    handleClick={() => viewDoc(item)}
                                                />
                                                <DeleteIcon
                                                    customClass={styles.deleteIcon}
                                                    handleClick={() => dispatch(removeDocs(index))}
                                                />
                                            </div>
                                        </div>
                                        <Divider customClass={styles.divider2} />
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <FilledButton
                        // disabled={data.officeName || data.selectedOffice ? false : true}
                        title='Save & Update'
                        customClass={styles.saveButton}
                        handleClick={() => {
                            handleClose()
                        }}
                    />
                </div>
            </div>
        </>
    );
};
export default ClientDocumentList;
