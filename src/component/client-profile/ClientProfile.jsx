import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/profileImage.png";
import { colors } from "../../constants/Colors";
import {
  clientTooltipData,
  clientTooltiProfileData,
  InvestmentData,
} from "../../data/data";
import MeetingReminder from "../../pages/reports/reminder-popup/MeetingReminder";
import { getClientProfile } from "../../redux/features/clientprofile/clientProfileSlice";
import { multipagePDF } from "../../utils/utils";
import FilledButton from "../filled-button/FilledButton";
import UploadProfilePhoto from "../modal/upload-Profile-Photo/UploadProfilePhoto";
import Popup from "../popup/Popup";
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
import Tooltip from "../tooltip/Tooltip";
import Account from "./account/Account";
import styles from "./clientprofile.module.scss";
import Event from "./event/Event";
import PriceType from "./price-type/PriceType";

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
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  // const { id } = useParams();
  const location = useLocation();
  const id = location.state.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/clients/${id}/${item}`);
  };

  const { clientDetail } = useSelector((state) => state.clientProfile);

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
  const [value, setValue] = useState(-1);
  const handleHover = (id) => {
    setValue(id);
  };

  const handleLeave = () => {
    setValue(-1);
  };
  useEffect(() => {
    id && dispatch(getClientProfile({ userId: id }));
  }, [id]);
  console.log("clientDetail", clientDetail);
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
            popupData={clientDetail?.profilePhoto}
          />
        )}
        <div className={styles.profileContainer}>
          <div className={styles.clientContainer}>
            <div className={styles.clientDetails}>
              <div>
                <span className={styles.profileName}>Profile</span>
              </div>
              <span className={styles.accountNumber}>
                Acc. no: {clientDetail?.clientAccNo}
              </span>
              <div className={styles.clientsMainContainer}>
                <div className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={
                      clientDetail?.profilePhoto
                        ? clientDetail.profilePhoto
                        : profileImage
                    }
                    alt="clientProfileImage"
                  />
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
                    <span className={styles.clientName}>
                      {clientDetail?.firstName} {clientDetail?.lastName}
                    </span>
                  </div>
                  <span className={styles.dateContainer}>
                    Birthday : {moment(clientDetail?.dob).format("MMM-DD-YYYY")}
                  </span>
                  <p className={styles.joiningDate}>
                    Joined on :{" "}
                    {moment(clientDetail?.createdDate).format("MMMM Do YYYY")}
                  </p>

                  <div className={styles.itemContainer}>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handleNumberHover}
                      onMouseLeave={handleNumberMouseLeave}
                    >
                      <Call fillColor={colors.white} />
                      {showNumber ? (
                        <Tooltip
                          title={clientDetail?.mobileNo}
                          customText={styles.text}
                          customClass={styles.callIcon}
                        />
                      ) : null}
                    </div>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handleContactHover}
                      onMouseLeave={handleContactMouseLeave}
                    >
                      <MobileIcon fillColor={colors.white} />
                      {showContact ? (
                        <Tooltip
                          title={clientDetail?.workNo}
                          customText={styles.text}
                          customClass={styles.mobileIcon}
                        />
                      ) : null}
                    </div>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handleEmailHover}
                      onMouseLeave={handleEmailMouseLeave}
                    >
                      <Email fillColor={colors.white} />
                      {showEmail ? (
                        <Tooltip
                          title={clientDetail?.email}
                          customText={styles.text}
                          customClass={styles.emailIcon}
                        />
                      ) : null}
                    </div>
                    <div
                      className={styles.contactIcon}
                      onMouseOver={handlePrintHover}
                      onMouseLeave={handlePrintMouseLeave}
                    >
                      <Fax fillColor={colors.white} />
                      {showPrint ? (
                        <Tooltip title="Print" customClass={styles.printIcon} />
                      ) : null}
                    </div>

                    <FilledButton
                      title="Edit Profile"
                      customClass={styles.editButton}
                      handleClick={() =>
                        navigate("/crm", {
                          state: { userId: clientDetail?.id },
                        })
                      }
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
                  // customClass={styles.investmentText}
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
                  // customClass={styles.investmentText}
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
