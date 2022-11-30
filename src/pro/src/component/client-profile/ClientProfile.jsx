import styles from "./clientprofile.module.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import profileImage from "../../assets/images/profileImage.png";
import {
  AlarmClock,
  ArchiveIcon,
  Call,
  Edit,
  Email,
  Fax,
  MobileIcon,
  NewMeeting,
  Notes,
} from "../svg-components";
import Event from "./event/Event";
import Account from "./account/Account";
import PriceType from "./price-type/PriceType";
import { colors } from "../../constants/Colors";
import {
  InvestmentData,
  accountData,
  annualBalanceData,
} from "../../data/data";
import Tooltip from "../tooltip/Tooltip";
import FilledButton from "../filled-button/FilledButton";
import MeetingReminder from "../../pages/reports/reminder-popup/MeetingReminder";
import Popup from "../popup/Popup";
import UploadProfilePhoto from "../modal/upload-Profile-Photo/UploadProfilePhoto";

const ClientProfile = () => {
  const [reminderColor, setReminderColor] = useState(colors.black);
  const [newMeetingColor, setNewMeetingColor] = useState(colors.black);
  const [notesColor, setNotesColor] = useState(colors.black);
  const [fileColor, setFileColor] = useState(colors.black);
  const [showEmail, setShowEmail] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [modal, setModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(`/clients/${id}/${item}`);
  };

  const handleNumberHover = () => {
    setShowNumber(true);
  };

  const handleNumberMouseLeave = () => {
    setShowNumber(false);
  };

  const handleEmailHover = () => {
    setShowEmail(true);
  };

  const handleEmailMouseLeave = () => {
    setShowEmail(false);
  };

  const handlePrintHover = () => {
    setShowPrint(true);
  };

  const handlePrintMouseLeave = () => {
    setShowPrint(false);
  };

  const handleContactHover = () => {
    setShowContact(true);
  };
  const handleContactMouseLeave = () => {
    setShowContact(false);
  };

  const handleOpen = () => {
    setModal(!modal);
  };
  const handleModal = () => {
    setModal(!modal);
  };

  const handleOpen1 = () => {
    setUploadModal(!uploadModal);
  };
  const handleModal1 = () => {
    setUploadModal(false);
  };

  return (
    <>
      <div className={styles.clientProfileContainer}>
        {modal && (
          <Popup Children={MeetingReminder} handleClose={() => handleModal()} />
        )}
        {uploadModal && (
          <Popup
            Children={UploadProfilePhoto}
            handleClose={() => handleModal1()}
          />
        )}
        <div className={styles.profileContainer}>
          <div className={styles.clientContainer}>
            <div className={styles.clientDetails}>
              <div>
                <span className={styles.profileName}>Profile</span>
              </div>
              <span className={styles.accountNumber}>Acc. no: 111708</span>
              <div className={styles.clientsMainContainer}>
                <div className={styles.imageContainer}>
                  <img src={profileImage} alt="clientProfileImage" />
                  <span className={styles.editProfileIcon}>
                    <Edit
                      fillColor="#FFFFFF"
                      width="18"
                      height="18"
                      handleClick={() => {
                        handleOpen1();
                      }}
                    />
                  </span>
                </div>

                <div className={styles.clientData}>
                  <div>
                    <span className={styles.clientName}>Drago Mijatović</span>
                  </div>
                  <span className={styles.dateContainer}>
                    Birthday : 18 May 1986
                  </span>
                  <p className={styles.joiningDate}>
                    Join on Wednesday, 5 February 2020
                  </p>

                  {showNumber ? (
                    <Tooltip title="99999" customClass={styles.numberTooltip} />
                  ) : null}
                  {showContact ? (
                    <Tooltip
                      title="44225876321"
                      customClass={styles.contactTooltip}
                    />
                  ) : null}
                  {showEmail ? (
                    <Tooltip title="DragoMijatovic@rhyta.com" />
                  ) : null}
                  {showPrint ? (
                    <Tooltip title="Print" customClass={styles.printTooltip} />
                  ) : null}
                  <div className={styles.iconContainer}>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handleNumberHover}
                      onMouseLeave={handleNumberMouseLeave}
                    >
                      <Call fillColor={colors.white} />
                    </div>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handleContactHover}
                      onMouseLeave={handleContactMouseLeave}
                    >
                      <MobileIcon fillColor={colors.white} />
                    </div>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handleEmailHover}
                      onMouseLeave={handleEmailMouseLeave}
                    >
                      <Email fillColor={colors.white} />
                    </div>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handlePrintHover}
                      onMouseLeave={handlePrintMouseLeave}
                    >
                      <Fax fillColor={colors.white} />
                    </div>
                    <FilledButton
                      title="Edit Profile"
                      customClass={styles.editButton}
                      handleClick={() => navigate("/crm")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.clientMeeting}>
              <div className={styles.eventContainer}>
                <Event
                  icon={<AlarmClock fillColor={reminderColor} />}
                  title="Set Reminder"
                  handleMouseEnter={() => setReminderColor(colors.white)}
                  handleMouseOut={() => setReminderColor(colors.black)}
                  handleClick={() => handleOpen()}
                />
                <Event
                  customClass={styles.eventDetail}
                  icon={<NewMeeting fillColor={newMeetingColor} />}
                  title="New Meeting Note"
                  handleMouseEnter={() => setNewMeetingColor(colors.white)}
                  handleMouseOut={() => setNewMeetingColor(colors.black)}
                />
              </div>
              <div className={styles.eventContainerSecond}>
                <Event
                  icon={<Notes fillColor={notesColor} />}
                  title="Meeting Archive Notes"
                  handleMouseEnter={() => setNotesColor(colors.white)}
                  handleMouseOut={() => setNotesColor(colors.black)}
                />
                <Event
                  customClass={styles.eventDetail}
                  icon={<ArchiveIcon fillColor={fileColor} />}
                  title="File Archive"
                  handleMouseEnter={() => setFileColor(colors.white)}
                  handleMouseOut={() => setFileColor(colors.black)}
                />
              </div>
            </div>
          </div>
          <div className={styles.investmentContainer}>
            <p className={styles.investmentTitle}>
              Total value of investments held with WCM:
            </p>
            <div className={styles.priceContainer}>
              {InvestmentData.map((item, index) => {
                return (
                  <PriceType key={index} type={item.type} price={item.price} />
                );
              })}
            </div>

            <div className={styles.investmentData}>
              <div className={styles.investmentTypeContainer}>
                <Account
                  amount="$75,957"
                  accountname="Walt Capital Global Fund "
                  customClass={styles.investmentText}
                  handleClick={() => {
                    navigate("waltcapital");
                  }}
                />
                <Account
                  amount="R201,759"
                  accountname="Tax Free Investment Account (PPM)"
                  handleClick={() => {
                    navigate("taxfreeinvestment");
                  }}
                />
              </div>
              <div className={styles.investmentTypeContainer}>
                <Account
                  amount="R659,998"
                  accountname="JSE Equity SA Share Portfolio (PPM)"
                  // handleClick={() => {
                  //   navigate("jseequity");
                  // }}
                />
                <Account
                  amount="R3,351,007"
                  accountname="Allan Gray RA"
                  customClass={styles.investmentText}
                  handleClick={() => {
                    navigate("allan-gray-ra");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProfile;
