import { useDispatch } from "react-redux";
import useForm from "../../../../hooks/useForm";
import { getSavedApplication } from "../../../../redux/auth/register/registerSlice";
import { popup } from "../../../../redux/popup/popupSlice";
import Button from "../../../button/Button";
import TextField from "../../../text-field/TextField";
import styles from "./savedApplication.module.scss";

const SavedApplication = ({ setHide }) => {
  const dispatch = useDispatch();

  const handleSavedApplication = (data) => {
    dispatch(getSavedApplication(data)).then((e) => {
      if (e.type === "register/getSavedApplication/fulfilled") {
        setHide(true);
      }
    });
  };

  const { handleChange, handleSubmit, data, errors } = useForm({
    validations: {
      registrationId: {
        required: {
          value: true,
          message: "Please enter  reference number",
        },
        pattern: {
          value: /^[a-zA-Z0-9]+$/,
          message: "Special characters are not allowed",
        },
      },
      referenceId: {
        required: {
          value: true,
          message: "Please enter  identity number ",
        },
        pattern: {
          value: /^[a-zA-Z0-9]+$/,
          message: "Special characters are not allowed",
        },
      }
    },
    onSubmit: () => handleSavedApplication(data),
  });

  return (
    <>
      <form
        className={styles.savedApplicationContainer}
        onSubmit={handleSubmit}
      >
        <p className={styles.enterRefNo}>Enter Reference Number & ID Number.</p>
        <div className={styles.textFieldContainer}>

        <TextField
            type="text"
            placeholder="Reference Number"
            customClass={styles.inputField}
            handleChange={handleChange("registrationId")}
            error={errors.registrationId}
          />

          <TextField
            type="text"
            placeholder="ID Number"
            customClass={styles.inputField1}
            handleChange={handleChange("referenceId")}
            error={errors.referenceId}
          />
        
        </div>
        <Button
          type="submit"
          title="Let's Continue"
          customClass={styles.continueBtn}
          customClassForText={styles.btnText}
        />
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
    </>
  );
};

export default SavedApplication;
