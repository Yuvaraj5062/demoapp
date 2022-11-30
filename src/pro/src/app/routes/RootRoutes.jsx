import { Route, Routes, useLocation } from "react-router-dom";
import ClientProfile from "../../component/client-profile/ClientProfile";
import BirthdayReport from "../../pages/reports/birthday-report/BirthdayReport";
import Dashboard from "../../pages/dashboard/Dashboard";
import Login from "../../pages/login/Login";
import Main from "../../pages/main/Main";
import Clients from "../../pages/clients/Clients";
import AddNewClient from "../../pages/clients/add-new-client/AddNewClient";
import WaltCapitalGlobal from "../../pages/walt-capital-global/WaltCapitalGlobal";
import FundAdministration from "../../pages/walt-capital-global/fund-administration/FundAdministration";
import ClientTransaction from "../../pages/walt-capital-global/client-transaction/ClientTransaction";
import RunFees from "../../pages/walt-capital-global/run-fees/RunFees";
import Watchlist from "../../pages/watchlist/Watchlist";
import FundBenchmark from "../../pages/walt-capital-global/fund-benchmark/FundBenchmark";
import FactSheets from "../../pages/walt-capital-global/fact-sheets/FactSheets";
import ClientList from "../../pages/walt-capital-global/client-list/ClientList";
import Ifas from "../../pages/ifas/Ifas";
import AddNewIFAs from "../../pages/ifas/add-new-ifas/AddNewIFAs";
import AuthRoute from "../../component/auth-route/AuthRoute";
import TaxFreeInvestment from "../../pages/clients/tax-free-investment/TaxFreeInvestment";
import Pricing from "../../pages/walt-capital-global/pricing/Pricing";
import MaintenancePortal from "../../pages/maintenance-portal/MaintenancePortal";
import ClientDetails from "../../pages/clients/client-details/ClientDetails";
import ActivateDeactivateFund from "../../pages/walt-capital-global/active-deactivate-fund/ActivateDeactivateFund";
import Snapshot from "../../pages/snapshot/Snapshot";
import PpmClientList from "../../pages/reports/ppm-client-list/PpmClientList";
import PpmClientListTfsa from "../../pages/reports/ppm-client-list-tfsa/PpmClientListTfsa";
import TradeStation from "../../pages/reports/trade-station/TradeStation";
import InteractiveBrokers from "../../pages/reports/interactive-brokers/InteractiveBrokers";
import RunFeesPPM from "../../pages/reports/run-fees-ppm/RunFeesPPM";
import MonthEndFees from "../../pages/reports/month-end-fees/MonthEndFees";
import PortfolioManagerFee from "../../pages/reports/portfolio-manager-fee/PortfolioManagerFee";
import Reports from "../../pages/reports/Reports";
import AllenGrayClientList from "../../pages/reports/allen-gray-client-list/AllenGrayClientList";
import AllClients from "../../pages/clients/AllClients";
import AccountSummary from "../../pages/clients/account-summary/AccountSummary";
import EditClient from "../../pages/clients/edit-client/EditClient";
import MainIfas from "../../pages/ifas/MainIfas";
import MainPortalMaintenance from "../../pages/maintenance-portal/MainPortalMaintenance";
import OffshoreClientList from "../../pages/offshore/offshore-client-list/OffshoreClientList";
import Offshore from "../../pages/offshore/OffShore";
import ModelEquityPortfolio from "../../pages/portfolio/ppm-model-equity-portfolio/PpmModelEquityPortfolio";
import WaltCapitalGlobalFundInvestor from "../../pages/portfolio/wcgf-investors/WaltCapitalGlobalFundInvestor";
// import ModelEquityPortfolio from "../../pages/ppm-model-equity-portfolio/PpmModelEquityPortfolio";
import AumSummary from "../../pages/reports/aum-summary/AumSummary";
import MonthlyReports from "../../pages/ifas/monthly-reports/MonthlyReports";
import IFABreakDownPage from "../../pages/walt-capital-global/run-fees/ifa-breakdownpage/IFABreakDown";
import GenerateIfaInvoice from "../../pages/ifas/generate-ifa-invoice/GenerateIfaInvoice";
import PpmTfsaModelPortfolio from "../../pages/portfolio/ppm-tfsa-model-portfolio/PpmTfsaModelPortfolio";
import Portfolio from "../../pages/portfolio/Portfolio";
import DailyTradeLog from "../../pages/daily-trade-log/DailyTradeLog";
import ClientStatement from "../../pages/walt-capital-global/client-statement/ClientStatement";
import RunFeesTradeStation from "../../pages/reports/run-fees-trade-station/RunFeesTradeStation";
import RunFeesIb from "../../pages/reports/run-fees-ib/RunFeesIb";
import BrokergeFees from "../../pages/clients/add-new-client/Walt Capital Brokerage Fees Equity and TFSA PPM/BrokergeFees";
import IfaClientList from "../../pages/crm/ifa-client-list/IfaClientList";
import IfaFeesReport from "../../pages/reports/ifa-fees-report/IfaFeesReport";
import TradingPortal from "../../pages/trading-portal/TradingPortal";
import IfaAumReport from "../../pages/ifas/ifa-aum-report/IfaAumReport";
import InsurancePortal from "../../pages/portal-insurance/InsurancePortal";
import ManageUserLoginPassword from "../../pages/maintenance-portal/manage-user-login-password/ManageUserLoginPassword";

const RootRoutes = () => {
  // const {token} = useToken
  const path = useLocation().pathname;
  // useEffect(()=>{
  //   if(token){
  //     return <Navigate to='/dashboard'/>
  //   }
  // },[path])
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <AuthRoute path={path}>
              <Main>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route
                    path="portfolio/*"
                    element={
                      <Portfolio>
                        <Routes>
                          <Route
                            path="ppm-model-equity-portfolio"
                            element={<ModelEquityPortfolio />}
                          />
                          <Route
                            path="walt-capital-global-fund-investor"
                            element={<WaltCapitalGlobalFundInvestor />}
                          />
                          <Route
                            path="ppm-tfsa-model-portfolio"
                            element={<PpmTfsaModelPortfolio />}
                          />
                        </Routes>
                      </Portfolio>
                    }
                  />

                  <Route path="watchlist" element={<Watchlist />} />

                  {/* <Route path="clients" element={<AllClients />} /> */}
                  <Route
                    path="clients/*"
                    element={
                      <Clients>
                        <Routes>
                          <Route path="" element={<AllClients />} />
                          <Route
                            path="addnewclient"
                            element={<AddNewClient />}
                          />
                          <Route path="/:id" element={<ClientProfile />} />
                        </Routes>
                      </Clients>
                    }
                  />
                  <Route
                    path="crm/*"
                    element={
                      <Clients>
                        <Routes>
                          <Route path="" element={<AddNewClient />} />
                          {/* <Route path="edit" element={<AddNewClient />} /> */}
                          <Route
                            path="brokergefees"
                            element={<BrokergeFees />}
                          />
                          {/* <Route
                            path="addnewclient"
                            element={<AddNewClient />}
                          /> */}
                          {/* <Route path="/:id" element={<ClientProfile />} /> */}
                        </Routes>
                      </Clients>
                    }
                  />
                  <Route
                    path="reports/*"
                    element={
                      <Reports>
                        <Routes>
                          <Route path="" element={<BirthdayReport />} />
                          <Route path="aum-summary" element={<AumSummary />} />
                          <Route path="runfeesppm" element={<RunFeesPPM />} />
                          <Route
                            path="runfees-tradestation"
                            element={<RunFeesTradeStation />}
                          />
                          <Route path="runfees-ib" element={<RunFeesIb />} />
                          <Route
                            path="ppm-client-list"
                            element={<PpmClientList />}
                          />
                          <Route
                            path="ppm-client-list-tfsa"
                            element={<PpmClientListTfsa />}
                          />
                          <Route
                            path="trade-station-client-list"
                            element={<TradeStation />}
                          />
                          <Route
                            path="interactive-brokers-client-list"
                            element={<InteractiveBrokers />}
                          />
                          <Route
                            path="monthendfees-template"
                            element={<MonthEndFees />}
                          />
                          <Route
                            path="portfoliomanagerfee"
                            element={<PortfolioManagerFee />}
                          />
                          <Route
                            path="ifafeesreport"
                            element={<IfaFeesReport />}
                          />
                          <Route
                            path="allan-gray-client-list"
                            element={<AllenGrayClientList />}
                          />
                        </Routes>
                      </Reports>
                    }
                  />

                  {/* <Route
                    path="clients/addnewclient"
                    element={<AddNewClient />}
                  /> */}

                  {/* <Route path="clients/:id" element={<ClientProfile />} /> */}
                  <Route
                    path="clients/:id/taxfreeinvestment"
                    element={<TaxFreeInvestment />}
                  />

                  <Route
                    path="clients/:id/waltcapital"
                    element={<ClientDetails />}
                  />
                  <Route
                    path="clients/:id/allan-gray-ra"
                    element={<AccountSummary />}
                  />
                  <Route
                    path="fund-administration/*"
                    element={
                      <WaltCapitalGlobal>
                        <Routes>
                          <Route path="" element={<FundAdministration />} />

                          <Route
                            path="clienttransaction"
                            element={<ClientTransaction />}
                          />
                          <Route path="runfees" element={<RunFees />} />
                          <Route
                            path="runfees/ifafeesbreakdown"
                            element={<IFABreakDownPage />}
                          />
                          <Route
                            path="fundbenchmark"
                            element={<FundBenchmark />}
                          />
                          <Route path="factsheets" element={<FactSheets />} />
                          <Route path="clientlist" element={<ClientList />} />
                          <Route
                            path="clientstatement"
                            element={<ClientStatement />}
                          />
                          <Route path="pricing" element={<Pricing />} />
                          <Route
                            path="activatedeactivatefund"
                            element={<ActivateDeactivateFund />}
                          />
                        </Routes>
                      </WaltCapitalGlobal>
                    }
                  />
                  {/* <Route path="ifas" element={<Ifas />} />
                  <Route path="ifas/addnewifas" element={<AddNewIFAs />} /> */}
                  <Route
                    path="ifas/*"
                    element={
                      <MainIfas>
                        <Routes>
                          <Route path="" element={<Ifas />} />
                          <Route path="addnewifas" element={<AddNewIFAs />} />
                          <Route path="/:id" element={<AddNewIFAs />} />
                          <Route
                            path="ifaclientlist"
                            element={<IfaClientList />}
                          />
                          <Route
                            path="ifaaumreport"
                            element={<IfaAumReport />}
                          />
                          <Route
                            path="monthlyreports"
                            element={<MonthlyReports />}
                          />
                          {/* <Route
                            path="addnewclient"
                            element={<AddNewClient />}
                          /> */}
                          {/* <Route path="/:id" element={<ClientProfile />} /> */}
                        </Routes>
                      </MainIfas>
                    }
                  />
                  <Route
                    path="ifas/:id/generateifainvoice"
                    element={<GenerateIfaInvoice />}
                  />

                  <Route
                    path="ifas/:id/monthlyreports"
                    element={<MonthlyReports />}
                  />

                  {/* <Route
                    path="maintenanceportal"
                    element={<MaintenancePortal />}
                  /> */}
                  <Route
                    path="maintenanceportal/*"
                    element={
                      <MainPortalMaintenance>
                        <Routes>
                          <Route
                            path="upload"
                            element={<MaintenancePortal />}
                          />
                          <Route
                            path="manage-user-login-password"
                            element={<ManageUserLoginPassword />}
                          />
                        </Routes>
                      </MainPortalMaintenance>
                    }
                  />

                  <Route path="snapshot" element={<Snapshot />} />
                  {/* <Route path='crm/*' element={<AddNewClient/>}/> */}
                  <Route
                    path="offshore/*"
                    element={
                      <Offshore>
                        <Routes>
                          <Route path="" element={<OffshoreClientList />} />
                        </Routes>
                      </Offshore>
                    }
                  />
                  <Route path="daily-trade-log" element={<DailyTradeLog />} />
                  <Route path="tradingportal" element={<TradingPortal />} />
                  <Route
                    path="insurance-portal"
                    element={<InsurancePortal />}
                  />
                </Routes>
              </Main>
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
};
export default RootRoutes;
