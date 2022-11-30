import React, { useEffect, useState } from "react";
import Close from "../close/Close";
import styles from "./personalAccountModal.module.scss";
import Divider from "../../divider/Divider";
import Button from "../../button/Button";
import { CheckBox, Uncheck } from "../../svg-components";
import { popup } from "../../../redux/popup/popupSlice";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../../../redux/popup/popupSlice";
import {
  cancelError,
  closeSuccess,
  getUsersServices,
  updateUserServices,
} from "../../../redux/auth/register/registerSlice";
import LoadingScreen from "../../loading-screen/LoadingScreen";
import StatusModal from "../../status-modal/StatusModal";

const PersonalAccountModal = () => {
  const dispatch = useDispatch();

  const { userServices, userInfo, error, loading, status, refreceNumber } =
    useSelector((state) => state.register);

  const [newServices, setNewServices] = useState([...userServices]);

  const handleCheck = (itemId) => {
    const services = newServices.map((item) => {
      if (item.id === itemId) {
        item = { ...item, check: !item.check };
      }
      return item;
    });
    setNewServices(services);
  };

  const handleSubmit = () => {
    const serviceIds = newServices
      .filter((item) => item.check)
      .map((e) => e.id);
    // const userId = userInfo?.data?.userId;
    const userId = userInfo?.data?.userId;

    if (userId && serviceIds) {
      const payload = { userId, serviceIds };
      dispatch(updateUserServices(payload));
    }
  };

  const handleClose = () => {
    dispatch(closePopup());
  };

  useEffect(() => {
    dispatch(getUsersServices({}));
  }, []);

  useEffect(() => {
    setNewServices(userServices); //check
  }, [userServices]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : //  status ? <StatusModal status='Successful' statusDetail={status} buttonText="OK" action={closeSuccess()} />:
      error ? (
        <StatusModal
          status="Error!"
          statusDetail={error}
          buttonText="Retry"
          action={cancelError()}
        />
      ) : (
        <div className={styles.mainContainer}>
          {/* <Close handleClose={handleClose} /> */}
          <form className={styles.detailContainer}>
            <p className={styles.signUp}>Register</p>
            <p className={styles.applicationText}>Personal Account</p>
            <p className={styles.referenceText}>
              Reference ID:{" "}
              <span className={styles.refNumber}>{refreceNumber}</span>
            </p>
            <p className={styles.welcomeText}>
              Welcome to your Premium Banking Account
            </p>
            <p className={styles.monthlyFeeText}>
              Monthly fee: <span className={styles.feeText}>R0.00 pm</span>
            </p>
            <p className={styles.priceEstimate}>
              The pricing estimate for this account is based on the features you
              have chosen and the information you have provided. The final cost
              of the account will depend on how many transaction you make.
            </p>
            <Divider customClass={styles.divider} />
            <p className={styles.addValue}>Added value for your account</p>

            {newServices.map((item, index) => {
              return (
                <p key={index} className={styles.rewardsText}>
                  <span
                    onClick={() => {
                      handleCheck(item.id);
                    }}
                  >
                    {item.check ? <CheckBox /> : <Uncheck />}
                  </span>
                  <span className={styles.rewards}>
                    {item.serviceName}
                    {item.serviceDesc}
                  </span>
                </p>
              );
            })}

            <Button
              handleClick={handleSubmit}
              title="Let’s Continue"
              customClass={styles.continueBtn}
              customClassForText={styles.continueText}
            />
            {/* <div className={styles.btnContainer}>
              <Button
                handleClick={handleSubmit}
                title="Let’s Continue"
                customClass={styles.continueBtn}
                customClassForText={styles.continueText}
              />
              <Button
                title="Back"
                customClass={styles.backBtn}
                customClassForText={styles.backText}
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

export default PersonalAccountModal;
