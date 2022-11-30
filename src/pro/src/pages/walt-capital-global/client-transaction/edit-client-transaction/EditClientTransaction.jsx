import { useEffect, useState, useRef } from "react";
import styles from "./editclienttransaction.module.scss";
import FilledButton from "../../../../component/filled-button/FilledButton";
import {
  Cross,
  DropdownIcon2,
  UpArrow,
} from "../../../../component/svg-components";
import TextField from "../../../../component/text-field/TextField";
import DropDown from "../../../../component/dropdown/DropDown";
import { tabledata } from "../../../../data/data";
import RadioButton from "../../../../component/radio-button/RadioButton";
import InputBoxField from "./input-box-field/InputBoxField";

const EditClientTransaction = ({ handleClose }) => {
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const [click, setClick] = useState(false);
  const [ifaOpen, setIfaOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [upfrontIncrease, setUpfrontIncrease] = useState(1);
  const [upfrontDecrease, setUpfrontDecrease] = useState(1);
  const [upfrontMain, setUpfrontMain] = useState(2);
  const [annualIncrease, setAnnualIncrease] = useState(1);
  const [annualDecrease, setAnnualDecrease] = useState(1);
  const [annualMain, setAnnualMain] = useState(2);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (click) {
        if (click && ref3.current && !ref3.current.contains(e.target)) {
          setClick(false);
        }
      } else if (ifaOpen) {
        if (ifaOpen && ref1.current && !ref1.current.contains(e.target)) {
          setIfaOpen(false);
        }
      } else if (buyOpen) {
        if (buyOpen && ref2.current && !ref2.current.contains(e.target)) {
          setBuyOpen(false);
        }
      } else {
        if (allocateOpen && ref.current && !ref.current.contains(e.target)) {
          setAllocateOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [click, ifaOpen, allocateOpen, buyOpen]);

  const tabledataName = tabledata.map((item) => item.name);

  useEffect(() => {}, [upfrontMain]);
  return (
    <div
      className={styles.modalMainContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.modalTitle}>
        Client Transaction
        <span className={styles.crossIcon}>
          <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
        </span>
      </div>

      <div className={styles.table}>
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Fund name:"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />

        <div className={styles.selectFieldContainer}>
          <p className={styles.label}>Client: </p>
          <div
            className={styles.selectlistContent}
            ref={ref3}
            onClick={() => setClick((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>John snow</span>
                <div className={styles.dropdownIconContainer}>
                  <div className={styles.dropdownIcon}>
                    <DropdownIcon2 fillColor="#FFFFFF" />
                  </div>
                </div>
              </div>
              <div>
                {click ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.selectFieldContainer}>
          <div className={styles.label}>IFA: </div>
          <div
            className={styles.selectlistContent}
            onClick={() => setIfaOpen((prevState) => !prevState)}
            ref={ref1}
          >
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>None</span>
                <div className={styles.dropdownIconContainer}>
                  <div className={styles.dropdownIcon}>
                    <DropdownIcon2 fillColor="#FFFFFF" />
                  </div>
                </div>
              </div>
              <div>
                {ifaOpen ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.textBoxField}>
          <p className={styles.label}>IFA upfront fee(%):</p>
          <div className={styles.inputField}>
            <InputBoxField
              customClassIcon={styles.icon}
              customClassInputIcon={styles.customClassInputIcon}
              setIncrease={setAnnualIncrease}
              setMain={setAnnualMain}
              value={annualIncrease}
              mainValue={annualMain}
              icon={<UpArrow fillColor="#FFFFFF" />}
              type="increase"
              customClassInput={styles.customInput1}
            />
            <InputBoxField
              customClassIcon={styles.icon}
              customClassInputIcon={styles.customClassInputIcon}
              type="main"
              value={annualMain}
              setUpfrontMain={setAnnualMain}
              customClassInput={styles.customInput1}
              icon={<DropdownIcon2 fillColor="#0b6aab" />}
            />
            <InputBoxField
              customClassInputIcon={styles.customClassInputIcon}
              type="decrease"
              setDecrease={setAnnualDecrease}
              setMain={setAnnualMain}
              value={annualDecrease}
              mainValue={annualMain}
              icon={<DropdownIcon2 fillColor="#FFFFFF" />}
            />
          </div>
        </div>

        <div className={styles.textBoxField}>
          <p className={styles.label}>IFA annual fee(% p.a):</p>
          <div className={styles.inputField}>
            <InputBoxField
              customClassIcon={styles.icon}
              customClassInputIcon={styles.customClassInputIcon}
              setIncrease={setUpfrontIncrease}
              setMain={setUpfrontMain}
              value={upfrontIncrease}
              mainValue={upfrontMain}
              icon={<UpArrow fillColor="#FFFFFF" />}
              type="increase"
              customClassInput={styles.customInput1}
            />
            <InputBoxField
              customClassIcon={styles.icon}
              customClassInputIcon={styles.customClassInputIcon}
              type="main"
              value={upfrontMain}
              setUpfrontMain={setUpfrontMain}
              customClassInput={styles.customInput1}
              icon={<DropdownIcon2 fillColor="#0b6aab" />}
            />

            <InputBoxField
              customClassInputIcon={styles.customClassInputIcon}
              type="decrease"
              setDecrease={setUpfrontDecrease}
              setMain={setUpfrontMain}
              value={upfrontDecrease}
              mainValue={upfrontMain}
              icon={<DropdownIcon2 fillColor="#FFFFFF" />}
            />
          </div>
        </div>

        <div className={styles.selectFieldContainer}>
          <div className={styles.label}>Buy/Sell: </div>
          <div
            className={styles.selectlistContent}
            ref={ref2}
            onClick={() => setBuyOpen((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>Buy</span>
                <div className={styles.dropdownIconContainer}>
                  <div className={styles.dropdownIcon}>
                    <DropdownIcon2 fillColor="#FFFFFF" />
                  </div>
                </div>
              </div>
              <div>
                {buyOpen ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Transaction date:"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <div className={styles.radionButton}>
          <div className={styles.radionButtonGroup}>
            <RadioButton label="Units" name="rupeesType" />
            <RadioButton label="Dollars" name="rupeesType" />
          </div>
        </div>

        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Transaction amount:"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label="Number of units:"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />

        <TextField
          customClassContainer={styles.textFieldContainer}
          label=" Unit Price (R):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label=" HWM (R):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <TextField
          customClassContainer={styles.textFieldContainer}
          label=" Contingent Redemption (R):"
          customClass={styles.title}
          customClassInput={styles.customInput}
        />
        <div className={styles.selectFieldContainer}>
          <div className={styles.label}>Allocate to: </div>
          <div
            className={styles.selectlistContent}
            ref={ref}
            onClick={() => setAllocateOpen((prevState) => !prevState)}
          >
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownContainerItems}>
                <span className={styles.dropdownContent}>Bank</span>
                <div className={styles.dropdownIconContainer}>
                  <div className={styles.dropdownIcon}>
                    <DropdownIcon2 fillColor="#FFFFFF" />
                  </div>
                </div>
              </div>
              <div>
                {allocateOpen ? (
                  <DropDown
                    dropdownItems={tabledataName}
                    customClassForContent={styles.dropdownListContent1}
                    customClassForItems={styles.dropdownListItems}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <div className={styles.modalFooterButton}>
          <FilledButton
            title="Add"
            customClass={styles.saveButton}
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default EditClientTransaction;
