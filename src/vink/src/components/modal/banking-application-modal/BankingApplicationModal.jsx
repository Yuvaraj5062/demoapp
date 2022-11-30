import Close from "../close/Close";
import styles from "./bankingApplicationModal.module.scss";
import Button from "../../button/Button";
import UploadDocument from "../../upload-document/UploadDocument";
import { UploadDocumentIcon } from "../../svg-components";
import { closePopup, popup } from "../../../redux/popup/popupSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelError,
  closeSuccess,
  uploadDocuments,
} from "../../../redux/auth/register/documentUploadSlice";
import StatusModal from "../../status-modal/StatusModal";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import { useState } from "react";
import DocumentUploaded from "../../document-uploaded/DocumentUploaded";
import Divider from "../../divider/Divider";
import moment from "moment";
import { useEffect } from "react";
import { color } from "../../../constants/color";

const BankingApplicationModal = () => {
  const dispatch = useDispatch();
  const { userInfo, expiresOn } = useSelector((state) => state.register);
  const [selectFileName, setSelectFileName] = useState(null);
  const [selectFileName1, setSelectFileName1] = useState(null);
  //const [userInfo,setuserInfo]=useState({})
  const { loading, error, status, addUrls, idUrls } = useSelector(
    (state) => state.documentUpload
  );

  const handleClose = () => {
    dispatch(closePopup());
  };

  // useEffect(() => {
  //   setuserInfo(userInfo.data?.data?userInfo.data:userInfo)
  // }, [userInfo])

  const handelSubmitDoc = () => {
    dispatch(uploadDocuments({ userId: userInfo?.data?.userId }));
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
        <div className={styles.bankingAppContainer}>
          {/* <Close handleClose={handleClose} /> */}
          <form className={styles.mainContainer}>
            <p className={styles.signUp}>Register</p>
            <p className={styles.bankingApplication}>
              {userInfo?.data?.categoryName} {">"}{" "}
              {userInfo?.data?.subCategoryName} {">"}{" "}
              {userInfo?.data?.userAccountTypeName}
              {/* Personal account application */}
            </p>
            <p className={styles.accountNumber}>
              Account Number:{" "}
              <span className={styles.numberText}>
                {userInfo?.data?.accountNumber}
              </span>
            </p>
            <p className={styles.uploadText}>
              Be sure to upload all of your documents by{" "}
              <span className={styles.dateText}>
                {expiresOn && moment(expiresOn).format("DD-MM-yyyy")},
              </span>{" "}
              otherwise your application will expire.
            </p>
            <p className={styles.documentSize}>
              Make sure documents are A maximum size of{" "}
              <span className={styles.sizeText}>2MB</span> per document type
              PDF, JPG, TIF or GIF format Not password protected
            </p>
            <Divider customClass={styles.divider} />
            <p className={styles.selectWay}>
              Select how you want to send your documents below.
            </p>
            <p className={styles.notHaveDocument}>
              If you do not have all your documents ready right now, do not
              worry you can always{" "}
              <span className={styles.emailText}>email</span> or upload them
              here at a later stage by coming back to your application later
            </p>
            <Divider customClass={styles.divider} />
            <p className={styles.generalDocument}>General Documents</p>
            <p className={styles.copyText}>
              1. Copy of ID book or card (front & back)
            </p>
            {/* {selectFileName ? (
              <DocumentUploaded file={selectFileName} />
            ) : (
              <UploadDocument
                // selectedFileText="Upload Document"
                setSelectFileName={setSelectFileName}
                selectFileName={selectFileName}
                buttonStyle={styles.uploadDocument}
                icon={<UploadDocumentIcon />}
                customClassForText={styles.uploadDocumentText}
                customClassForIcon={styles.uploadIcon}
                action={"identityproof"}
                buttonTitle="Upload Document"
              />
            )} */}
            <UploadDocument
              // selectedFileText="Upload Document"
              setSelectFileName={setSelectFileName}
              selectFileName={selectFileName}
              buttonStyle={styles.uploadDocument}
              icon={<UploadDocumentIcon fillColor={color.green1} />}
              customClassForText={styles.uploadDocumentText}
              customClassForIcon={styles.uploadIcon}
              eve={"idproof"}
              buttonTitle="Upload Document"
            />
            {idUrls?.length > 0 && (
              <DocumentUploaded
                file={idUrls}
                doctype="idProof"
              // handleCloseClick={() => handleCloseClick()}
              />
            )}

            <p className={styles.proofText}>2. Proof of residence </p>
            <p className={styles.documents}>
              (no older than 3 months) {"  "}
              <span className={styles.documentsList}>
                E.g. municipality, Telkom or cellphone statement, rental or
                lease agreement
              </span>
            </p>
            <UploadDocument
              // selectedFileText="Upload Document"
              setSelectFileName={setSelectFileName1}
              selectFileName={selectFileName1}
              buttonStyle={styles.uploadDocument}
              icon={<UploadDocumentIcon fillColor={color.green1} />}
              customClassForText={styles.uploadDocumentText}
              customClassForIcon={styles.uploadIcon}
              eve={"addressproof"}
              buttonTitle="Upload Document"
            />
            {addUrls?.length > 0 && (
              <DocumentUploaded
                file={addUrls}
                doctype="addProof"

              // handleCloseClick={() => handleCloseClick()}
              />
            )}
            {/* {selectFileName1 ? (
              <DocumentUploaded
                file={selectFileName}
                // handleCloseClick={() => handleCloseClick()}
              />
            ) : (
              <UploadDocument
                // selectedFileText="Upload Document"
                setSelectFileName={setSelectFileName1}
                selectFileName={selectFileName1}
                buttonStyle={styles.uploadDocument}
                icon={<UploadDocumentIcon />}
                customClassForText={styles.uploadDocumentText}
                customClassForIcon={styles.uploadIcon}
                action={"addressproof"}
                buttonTitle="Upload Document"
              />
            )} */}
            <p className={styles.listOfDocuments}>
              Don't have any of these documents? See full list of accepted
              documents
            </p>
            <p className={styles.importantText}>
              Important: If you do not have proof of residence in your name you
              will need to provide a signed affidavit by the person whom you
              live with and their proof of residence. Get affidavit template
              here.
            </p>
            <Button
              title="Submit"
              customClass={styles.submitBtn}
              customClassForText={styles.submitBtnText}
              handleClick={() => {
                handelSubmitDoc();
              }}
            />
            {/* <div className={styles.btnContainer}>
              <Button
                title="Submit"
                customClass={styles.submitBtn}
                customClassForText={styles.submitBtnText}
                handleClick={() => {
                  handelSubmitDoc();
                }}
              />
              <Button
                title="Back"
                customClass={styles.backBtn}
                customClassForText={styles.backBtnText}
              />
            </div> */}
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

export default BankingApplicationModal;
