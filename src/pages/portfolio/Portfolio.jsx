import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/profileImage.png";
import Balance from "../../component/balance/Balance";
import Account from "../../component/client-profile/account/Account";
import PriceType from "../../component/client-profile/price-type/PriceType";
import Divider from "../../component/divider/Divider";
import Loader from "../../component/loader/Loader";
import NoRecordFound from "../../component/notfound/NotFound";
import Tooltip from "../../component/tooltip/Tooltip";
import { colors } from "../../constants/Colors";
import { clientTooltipData, InvestmentData } from "../../data/data";
import {
  clearState,
  fetchAllPortfolio,
} from "../../redux/features/portfolio/portfolioSlice";
import { multipagePDF } from "../../utils/utils";
import styles from "./portfolio.module.scss";
// import { getPortfolio } from "../../redux/features/portfolio/portfolioCrud";

const Portfolio = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const { portfolioData, isLoading, clientDetail, investmentDetail } =
    useSelector((state) => state.portfolio);
  const handleBalanceNavigate = (item) => {
    item?.serviceProviderId &&
      navigate(`/dashboard/ppm-model-equity-portfolio`, {
        state: {
          id: item.serviceProviderId,
          name: item?.serviceProviderName,
          typeId: item?.serviceProviderTypeId,
        },
      });
  };

  const [value, setValue] = useState(-1);
  const handleHover = (id) => {
    setValue(id);
  };

  const handleLeave = () => {
    setValue(-1);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearState());
    dispatch(
      fetchAllPortfolio({
        clientId: location.state?.id,
      })
    );
  }, []);

  return (
    <div className={styles.portfolioMainContainer} ref={ref}>
      {/* <AlphabeticFilter title="Clients" />
      <Search
        customClass={styles.search}
        inputCustomClass={styles.input}
        placeholder="Search Clients"
      /> */}
      <div className={styles.portfolioMainContent}>
        <div className={styles.portfolioMainContentLeft}>
          <div className={styles.clientDetails}>
            <div className={styles.clientsMainContainer}>
              <div className={styles.imageContainer}>
                <img
                  src={
                    clientDetail?.photoPath
                      ? clientDetail?.photoPath
                      : profileImage
                  }
                  alt="clientProfileImage"
                  className={styles.image}
                />
              </div>

              <div className={styles.clientData}>
                <div>
                  <span className={styles.clientName}>
                    {clientDetail?.clientName}
                  </span>
                </div>
                <span className={styles.accountNumber}>
                  Acc. no:{clientDetail?.accountNo}
                </span>
                <Divider customClass={styles.divider} />
                <span className={styles.dateContainer}>
                  Birthday : {clientDetail?.birthDate}
                </span>
                <div className={styles.joiningDate}>
                  Join on {clientDetail?.joiningDate}
                </div>
                <div className={styles.itemContainer}>
                  {clientTooltipData.map((item, index) => {
                    return (
                      <div
                        className={styles.icon}
                        key={index}
                        onMouseEnter={() => handleHover(item.id)}
                        onMouseLeave={() => handleLeave()}
                      >
                        {value === index && (
                          <Tooltip
                            title={
                              clientDetail?.[item.text]
                                ? clientDetail?.[item.text]
                                : "print"
                            }
                            customClass={item.customClass}
                            customText={styles.text}
                          />
                        )}
                        <item.icon
                          fillColor={colors.white}
                          handleClick={() => multipagePDF(ref, setLoading)}
                        />
                      </div>
                    );
                  })}
                </div>
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
                  <PriceType
                    key={index}
                    type={item.type}
                    price={investmentDetail?.[item.price]}
                  />
                );
              })}
            </div>

            <div className={styles.investmentData}>
              {/* <div className={styles.investmentTypeContainer}>
                <Account
                  amount="$75,957"
                  accountname="Walt Capital Global Fund "
                  // customClass={styles.investmentText}
                  handleClick={() => {
                    navigate("/clients/1/waltcapital");
                  }}
                />
                <Account
                  amount="R201,759"
                  accountname="Tax Free Investment Account (PPM)"
                  handleClick={() => {
                    navigate("/clients/1/taxfreeinvestment");
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
                    navigate("/clients/1/allan-gray-ra");
                  }}
                />
              </div> */}

              <div className={styles.investmentTypeContainer}>
                {isLoading ? (
                  <Loader />
                ) : portfolioData.length > 0 ? (
                  portfolioData.map((item, index) => {
                    return (
                      <Account
                        amount={item?.totalAmountString}
                        accountname={item?.serviceProviderName}
                        subTitle={item?.serviceProviderTypeName}
                        handleClick={() => {
                          navigate("/clients/1/taxfreeinvestment");
                        }}
                      />
                    );
                  })
                ) : (
                  <NoRecordFound />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dataTable}>
          <div className={styles.balanceContainer}>
            {isLoading ? (
              <Loader />
            ) : portfolioData.length > 0 ? (
              portfolioData.map((item, index) => {
                return (
                  <div className={styles.balanceContent} key={index}>
                    <Balance
                      title={item?.serviceProviderName}
                      subTitle={item?.serviceProviderTypeName}
                      handleBalanceClick={() => {
                        handleBalanceNavigate(item);
                      }}
                      value={`${item?.currencyShortName} :${item?.totalAmountString}`}
                      clients={item.clientCount}
                      percentage={item.investedPercentageString}
                      // color={index <= 5 ? colors.grey4 : colors.brown}
                      customClass={
                        index <= 5
                          ? styles.border1CustomClass
                          : styles.border2CustomClass
                      }
                    />
                  </div>
                );
              })
            ) : (
              <NoRecordFound />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Portfolio;
