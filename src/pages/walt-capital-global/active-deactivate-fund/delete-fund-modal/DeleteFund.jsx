import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilledButton from "../../../../component/filled-button/FilledButton";
import { ViewHideIcon, ViewIcon } from "../../../../component/svg-components";
import {
  deleteFund,
  getAllFunds
} from "../../../../redux/features/fundadministrator/addFunSlice";
import styles from "./deletefund.module.scss";

const DeleteFund = ({ handleClose, popupData }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const { fundList, msg, error } = useSelector((state) => state.addFund);
  const [exePass, setExePass] = useState("");
  const [inputType, setInputType] = useState("password");

  const handleDeleteFund = () => {
    exePass.trim() &&
      userInfo &&
      dispatch(
        deleteFund({
          fundId: popupData?.currFund?.fundId,
          userId: userInfo?.userDetail?.id,
          pwd: exePass,
        })
      ).then((e) => {
        if (e.type === "addFund/deleteFund/fulfilled") {
          popupData.setCurrFund("");
          dispatch(
            getAllFunds({ data: { isActive: false }, method: "allTypeFund" })
          );
          handleClose();
        }
      });
  };

  return (
    <div
      className={styles.mainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.crossContainer}>
        <div className={styles.deleteHeading}>
          <p className={styles.paragraph}>
            Are you sure you want to delete this fund? And all its pricing data
            and history You have an option to deactivate the funds. This option
            still keeps all the data but it will not show in the funds list
          </p>

          <div className={styles.passwordFieldContainer}>
            <label htmlFor="password" className={styles.label}>
              Executive level password:
            </label>
            <input
              type={inputType}
              value={exePass}
              onChange={(e) => setExePass(e.target.value.trim())}
              placeholder="Enter password here"
              className={styles.passwordField}
            />
            {inputType === "text" ? (
              <ViewIcon
                handleClick={() => setInputType("password")}
                customClass={styles.icon}
                onMouseLeave={() => {}}
              />
            ) : (
              <ViewHideIcon
                handleClick={() => setInputType("text")}
                customClass={styles.icon}
                onMouseLeave={() => {}}
              />
            )}
            {/* {errors?.password && (
                <div className={styles.errorText}>{errors?.password}</div>
              )} */}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <FilledButton
          title="You need a Executive level password to action DELETE FUND!"
          customClass={styles.deleteButton}
          // handleClick={() => {}}
        />
        <FilledButton
          title="Proceed to delete"
          customClass={styles.okButton}
          // handleClick={() => {}}
          handleClick={() => handleDeleteFund()}
          handleMouseLeave={() => {}}
        />
      </div>
    </div>
  );
};
export default DeleteFund;
