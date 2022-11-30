import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FilledButton from "../../../component/filled-button/FilledButton";
import Modal from "../../../component/modal/Modal";
import Popup from "../../../component/popup/Popup";
import { Cross } from "../../../component/svg-components";
import styles from "./disclaimerpopup.module.scss";
const DisclaimerPopup = ({ handleClose }) => {
  const [reportPopup, setReportPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
     navigate("/birthdayreport");
    // navigate("/dashboard")
  };

  const handleModal = () => {
    setReportPopup(!reportPopup);
  };

  return (
    <>
      <div className={styles.landingPage} onClick={() => handleNavigate()}>
        <div
          className={styles.modalContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.modalTitle}>
            Wealth Creator
            <span className={styles.crossIcon}>
              <Cross fillColor="#FFFFFF" handleClose={() => handleNavigate()} />
            </span>
          </div>

          <div className={styles.disclaimerData}>
            <p className={styles.textData}>
              <span className={styles.disText}>Disclaimer :</span> It is
              important to know past performance is not necessarily a guide to
              future performance. Daily portfolio and fund values are not
              guaranteed. While every effort has been made to ensure the
              accuracy and completeness of the information, opinions and
              recommendations contained in this online forum, they must be
              construed solely as statements of opinion and not of fact. No
              warranty, expressed or implied, as to the completeness,
              merchantability or fitness for any particular purpose of any such
              recommendation or information is given or made by Walt Capital
              Management (Pty) Ltd or any of their subsidiaries (“WCM”) in any
              form or manner whatsoever. WCM assumes no fiduciary responsibility
              or liability for any consequences, financial or otherwise arising
              from the implementation of the investment.
            </p>
            <p className={styles.textData}>
              WCM shall not be liable to the investor in any manner whatsoever
              for any loss or damage suffered by the investor arising in or out
              of the investment or in any other manner whatsoever and the
              investor hereby indemnifies WCM in respect of any such loss or
              damage by logging into and perusing the information on this online
              forum. While this document has been prepared in good faith, it is
              nonetheless recommended that independent professional legal, tax,
              accounting and other appropriate advice should be taken so as to
              consider the document in the light of the recipient’s particulars
              and unique circumstances.
            </p>
            <p className={styles.textData}>
              In some examples some back-testing and pro forma performance
              figures are shown for pure illustration purposes only and are
              based on information that WCM believes is fair. However, past
              performance is not a guarantee of future results. WCM assumes no
              liability for any errors or omissions contained herein. This
              document and online forum is subject to copyright and may not be
              produced in whole or in part without permission of Walt Capital
              Management (Pty) Ltd Walt Capital Management is an authorised
              category 2 financial services provider and is registered with the
              FSCA. Reg. number: 50218
            </p>
          </div>
          <div className={styles.modalFooter}>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="isChecked"
                className={styles.checkbox}
                value={isActive}
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <p className={styles.checkboxText}>By ticking , you are confirming that you would  like to see the disclaimer after 30 days.</p>
            </div>


            <FilledButton
              title="Ok"
              //   handleClick={navigateToReports}
              customClass={styles.okButton}
              handleClick={() => handleNavigate()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DisclaimerPopup;
