import ClientProfile from "../../component/client-profile/ClientProfile";
import AccountSummary from "../../pages/clients/account-summary/AccountSummary";
import AddNewClient from "../../pages/clients/add-new-client/AddNewClient";
import BrokergeFees from "../../pages/clients/add-new-client/Walt Capital Brokerage Fees Equity and TFSA PPM/BrokergeFees";
import AllClients from "../../pages/clients/AllClients";
import ClientDetails from "../../pages/clients/client-details/ClientDetails";
import Clients from "../../pages/clients/Clients";
import TaxFreeInvestment from "../../pages/clients/tax-free-investment/TaxFreeInvestment";
import CRM from "../../pages/crm/CRM";
import IfaClientList from "../../pages/crm/ifa-client-list/IfaClientList";
import DailyTradeLog from "../../pages/daily-trade-log/DailyTradeLog";
import Dashboard from "../../pages/dashboard/Dashboard";
import Maindashboard from "../../pages/dashboard/main-dashboard/MainDashboard";
import AddNewIFAs from "../../pages/ifas/add-new-ifas/AddNewIFAs";
import GenerateIfaInvoice from "../../pages/ifas/generate-ifa-invoice/GenerateIfaInvoice";
import IfaAumReport from "../../pages/ifas/ifa-aum-report/IfaAumReport";
import Ifa from "../../pages/ifas/Ifas";
import MainIfas from "../../pages/ifas/MainIfas";
import MonthlyReports from "../../pages/ifas/monthly-reports/MonthlyReports";
import MainPortalMaintenance from "../../pages/maintenance-portal/MainPortalMaintenance";
import MaintenancePortal from "../../pages/maintenance-portal/MaintenancePortal";
import ManageUserLoginPassword from "../../pages/maintenance-portal/manage-user-login-password/ManageUserLoginPassword";
import OffshoreClientList from "../../pages/offshore/offshore-client-list/OffshoreClientList";
import InsurancePortal from "../../pages/portal-insurance/InsurancePortal";
import ModelEquityPortfolio from "../../pages/portfolio/ppm-model-equity-portfolio/PpmModelEquityPortfolio";
import PpmTfsaModelPortfolio from "../../pages/portfolio/ppm-tfsa-model-portfolio/PpmTfsaModelPortfolio";
import AllenGrayClientList from "../../pages/reports/allen-gray-client-list/AllenGrayClientList";
import AumSummary from "../../pages/reports/aum-summary/AumSummary";
import BirthdayReport from "../../pages/reports/birthday-report/BirthdayReport";
import IfaFeesReport from "../../pages/reports/ifa-fees-report/IfaFeesReport";
import InteractiveBrokers from "../../pages/reports/interactive-brokers/InteractiveBrokers";
import MonthEndFees from "../../pages/reports/month-end-fees/MonthEndFees";
import PortfolioManagerFee from "../../pages/reports/portfolio-manager-fee/PortfolioManagerFee";
import PpmClientListTfsa from "../../pages/reports/ppm-client-list-tfsa/PpmClientListTfsa";
import PpmClientList from "../../pages/reports/ppm-client-list/PpmClientList";
import Reports from "../../pages/reports/Reports";
import RunFeesIb from "../../pages/reports/run-fees-ib/RunFeesIb";
import RunFeesPPM from "../../pages/reports/run-fees-ppm/RunFeesPPM";
import RunFeesTradeStation from "../../pages/reports/run-fees-trade-station/RunFeesTradeStation";
import TradeStation from "../../pages/reports/trade-station/TradeStation";
import TradingPortal from "../../pages/trading-portal/TradingPortal";
import ActivateDeactivateFund from "../../pages/walt-capital-global/active-deactivate-fund/ActivateDeactivateFund";
import ClientList from "../../pages/walt-capital-global/client-list/ClientList";
import ClientStatement from "../../pages/walt-capital-global/client-statement/ClientStatement";
import ClientTransaction from "../../pages/walt-capital-global/client-transaction/ClientTransaction";
import FactSheets from "../../pages/walt-capital-global/fact-sheets/FactSheets";
import FundAdministration from "../../pages/walt-capital-global/fund-administration/FundAdministration";
import FundBenchmark from "../../pages/walt-capital-global/fund-benchmark/FundBenchmark";
import Pricing from "../../pages/walt-capital-global/pricing/Pricing";
import IFABreakDownPage from "../../pages/walt-capital-global/run-fees/ifa-breakdownpage/IFABreakDown";
import RunFees from "../../pages/walt-capital-global/run-fees/RunFees";
import WaltCapitalGlobal from "../../pages/walt-capital-global/WaltCapitalGlobal";
import Watchlist from "../../pages/watchlist/Watchlist";



export const routeData = [
  {
    path: "dashboard/*",
    location: "",
    element: Maindashboard,
    header: "Dashboard",
    role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    breadcrumb: null,
    children: [
      {
        path: "",
        location: "/dashboard",
        element: Dashboard,
        header: "Dashboard",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: null,
        children: null,
      },
      {
        path: "daily-trade-log",
        location: "/dashboard/daily-trade-log",
        element: DailyTradeLog,
        header: "Daily Trade Log",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Dashboard /",
            navigation: "",
          },
          {
            label: " Daily Trade Log ",
            navigation: "daily-trade-log",
          },
        ],
        children: null,
      },
      {
        path: "ppm-model-equity-portfolio",
        element: ModelEquityPortfolio,
        location: "/dashboard/ppm-model-equity-portfolio",
        header: "PPM Model Equity Portfolio",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Dashboard /",
            navigation: "",
          },
          {
            label: " PPM Model Equity Portfolio ",
            navigation: "ppm-model-equity-portfolio",
          },
        ],
        children: null,
      },
      {
        path: "ppm-tfsa-model-portfolio",
        element: PpmTfsaModelPortfolio,
        location: "/dashboard/ppm-tfsa-model-portfolio",
        header: "PPM TFSA Model Portfolio",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Dashboard /",
            navigation: "",
          },
          {
            label: " PPM TFSA Model Portfolio ",
            navigation: "ppm-tfsa-model-portfolio    ",
          },
        ],
        children: null,
      },
    ],
  },
  {
    path: "watchlist",
    location: "/watchlist",
    element: Watchlist,
    header: "Watchlist",
    role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    breadcrumb: null,
    children: null,
  },
  {
    path: "clients/*",
    location: "/clients",
    element: Clients,
    header: "Clients",
    role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    breadcrumb: null,
    children: [
      {
        path: "",
        location: "/clients",
        element: AllClients,
        header: "Clients",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Clients",
            navigation: "",
          },
        ],
        children: null,
      },
      {
        path: ":id",
        location: "/clients/1",
        // location: `/clients/${id}`,
        // location: "/clients/:id",
        element: ClientProfile,
        header: "Drago Mijatović",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Clients /",
            navigation: "",
          },
          {
            label: ' Drago Mijatović',
            navigation: '1'
          }
        ],
        children: null
      },
      {
        path: ":id/waltcapital",
        location: "/clients/1/waltcapital",
        // location: `/clients/${id}`,
        // location: "/clients/:id",
        element: ClientDetails,
        header: "Walt Capital Global Fund",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Clients /",
            navigation: "",
          },
          {
            label: ' Drago Mijatović / ',
            navigation: '1'
          },
          {
            label: ' Walt Capital Global Fund',
            navigation: '1/waltcapital'
          }
        ],
        children: null
      },
      {
        path: ":id/taxfreeinvestment",
        location: "/clients/1/taxfreeinvestment",
        // location: `/clients/${id}`,
        // location: "/clients/:id",
        element: TaxFreeInvestment,
        header: "JSE Tax Free Investment Account at PPM Securities",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Clients /",
            navigation: "",
          },
          {
            label: ' Drago Mijatović / ',
            navigation: '1'
          },
          {
            label: '  JSE Tax Free Investment Account at PPM Securities',
            navigation: '1/taxfreeinvestment'
          }
        ],
        children: null
      },
      {
        path: ":id/allan-gray-ra",
        location: "/clients/1/allan-gray-ra",
        // location: `/clients/${id}`,
        // location: "/clients/:id",
        element: AccountSummary,
        header: "Allan Gray - RA",
        role: [
          "Super User",
          "Compliance user",
          "Admin User",
          "Portfolio Manager",
        ],
        breadcrumb: [
          {
            label: "Clients /",
            navigation: "",
          },
          {
            label: ' Drago Mijatović / ',
            navigation: '1'
          },
          {
            label: '  Allan Gray RA',
            navigation: '1/allan-gray-ra'
          }
        ],
        children: null
      },
    ],
  },
  {
    path: "fund-administration/*",
    location: "/fund-administration",
    element: WaltCapitalGlobal,
    header: "Fund Administration",
    role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
    breadcrumb: null,
    children: [
      {
        path: '',
        location: '/fund-administration',
        element: FundAdministration,
        header: 'Fund Administration',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: null,
        children: null
      },
      {
        path: 'activatedeactivatefund',
        location: '/fund-administration/activatedeactivatefund',
        element: ActivateDeactivateFund,
        header: ' Activate or Deactivate funds',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Activate or Deactivate funds',
            navigation: 'activatedeactivatefund'
          },
        ],
        children: null
      },
      {
        path: 'clienttransaction',
        location: '/fund-administration/clienttransaction',
        element: ClientTransaction,
        header: 'Client Transaction',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Client Transaction',
            navigation: 'clienttransaction'
          },
        ],
        children: null
      },
      {
        path: 'clientlist',
        location: '/fund-administration/clientlist',
        element: ClientList,
        header: 'Client List',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Client List',
            navigation: 'clientlist'
          },
        ],
        children: null
      },
      {
        path: 'clientstatement',
        location: '/fund-administration/clientstatement',
        element: ClientStatement,
        header: 'Client Statement',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Client Statement',
            navigation: 'clientstatement'
          },
        ],
        children: null
      },
      {
        path: 'pricing',
        location: '/fund-administration/pricing',
        element: Pricing,
        header: 'Pricing',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Pricing',
            navigation: 'pricing'
          },
        ],
        children: null
      },
      {
        path: 'runfees',
        location: '/fund-administration/runfees',
        element: RunFees,
        header: 'Run Fees',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Run Fees',
            navigation: 'runfees'
          },
        ],
        children: null
      },
      {
        path: 'runfees/ifafeesbreakdown',
        location: '/fund-administration/runfees/ifafeesbreakdown',
        element: IFABreakDownPage,
        header: 'Run Fees',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Run Fees /',
            navigation: 'runfees'
          },
          {
            label: ' IFA Fee Breakdown',
            navigation: 'runfees/ifafeesbreakdown'
          },
        ],
        children: null
      },
      {
        path: 'fundbenchmark',
        location: '/fund-administration/fundbenchmark',
        element: FundBenchmark,
        header: 'Fund Benchmark',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Fund Benchmark',
            navigation: 'fundbenchmark'
          },
        ],
        children: null
      },
      {
        path: 'factsheets',
        location: '/fund-administration/factsheets',
        element: FactSheets,
        header: 'Fact Sheet',
        role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Fund Administration /',
            navigation: ''
          },
          {
            label: ' Fact Sheet',
            navigation: 'factsheets'
          },
        ],
        children: null
      },
    ]
  },
  {
    path: "crm/*",
    location: "/crm",
    element: CRM,
    header: "Add New Client",
    role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
    breadcrumb: null,
    children: [
      {
        path: "",
        location: '/crm',
        element: AddNewClient,
        header: "Add New Client",
        role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Clients /',
            navigation: '/clients',
          },
          {
            label: ' Add New Client',
            navigation: ''
          }
        ],
        children: null
      },
      {
        path: "brokergefees",
        location: '/crm/brokergefees',
        element: BrokergeFees,
        header: "Add New Client",
        role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
        breadcrumb: [
          {
            label: 'Clients /',
            navigation: '/clients',
          },
          {
            label: ' Add New Client /',
            navigation: ''
          },
          {
            label: ' Walt Capital Brokerage Fees Equity and TFSA PPM',
            navigation: 'brokergefees'
          }
        ],
        children: null
      },
    ]
  },
  {
    path: "ifas/*",
    location: '/ifas',
    element: MainIfas,
    header: "IFAs",
    role: ['Super User','Executive User','Compliance user','Admin User'],
    breadcrumb: null,
    children: [
      {
        path:'',
        location:'/ifas',
        element:Ifa,
        header:'IFAs',
        role: ['Super User','Executive User','Compliance user','Admin User'],
        breadcrumb:null,
        children:null
      },
      {
        path:'addnewifas',
        location:'/ifas/addnewifas',
        element:AddNewIFAs,
        header:'Add New IFAs',
        role: ['Super User','Executive User','Compliance user','Admin User'],
        breadcrumb:[
          {
            label:'IFAs /',
            navigation:''
          },
          {
            label:' Add New IFAs',
            navigation:'addnewifas'
          }
        ],
        children:null
      },
      {
        path:':id',
        location:'/ifas/1',
        element:AddNewIFAs,
        header:'Add New IFAs',
        role: ['Super User','Executive User','Compliance user','Admin User'],
        breadcrumb:[
          {
            label:'IFAs /',
            navigation:''
          },
          {
            label:' Add New IFAs',
            navigation:'1'
          }
        ],
        children:null
      },
      {
        path:'ifaaumreport',
        location:'/ifas/ifaaumreport',
        element:IfaAumReport,
        header:'Add New IFAs',
        role: ['Super User','Executive User','Compliance user','Admin User'],
        breadcrumb:[
          {
            label:'IFAs /',
            navigation:''
          },
          {
            label:' IFA John Snow AUM Summary',
            navigation:'ifaaumreport'
          }
        ],
        children:null
      },
      {
        path:'ifaclientlist',
        location:'/ifas/ifaclientlist',
        element:IfaClientList,
        header:'IFA Client List',
        role: ['Super User','Executive User','Compliance user','Admin User'],
        breadcrumb:[
          {
            label:'IFAs /',
            navigation:''
          },
          {
            label:'  IFA Client List',
            navigation:'ifaclientlist'
          }
        ],
        children:null
      },
      {
        path:'monthlyreports',
        location:'/ifas/monthlyreports',
        element:MonthlyReports,
        header:'Monthly Commission Report',
        role: ['Super User','Executive User','Compliance user','Admin User'],
        breadcrumb:[
          {
            label:"IFA's /",
            navigation:''
          },
          {
            label:'  Add new IFAs / ',
            navigation:'addnewifas'
          },
          {
            label:'  Personal Data Continue / ',
            navigation:'addnewifas'
          },
          {
            label:'  Generate IFA Invoice  ',
            navigation:'monthlyreports'
          }
        ],
        children:null
      },
      {
        path:'addnewifas/generateifainvoice',
        location:'/ifas/addnewifas/generateifainvoice',
        element:GenerateIfaInvoice,
        header:'Generate IFA Invoice',
        role: ['Super User','Executive User','Compliance user','Admin User'],
        breadcrumb:[
          {
            label:"IFA's /",
            navigation:''
          },
          {
            label:'  Add new IFAs / ',
            navigation:'addnewifas'
          },
          {
            label:'  Personal Data Continue / ',
            navigation:'addnewifas'
          },
          {
            label:'  Generate IFA Invoice  ',
            navigation:'addnewifas/generateifainvoice'
          }
        ],
        children:null
      },
    ]
  },
  {
    path: "offshore",
    location: "/offshore",
    element: OffshoreClientList,
    header: "Offshore",
    role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
    breadcrumb: null,
    children: null
  },
  {
    path: "reports/*",
    location: "/reports",
    element: Reports,
    header: "Birthday Report and Daily Events/Task",
    role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
    breadcrumb: null,
    children: [
      {
        path:'',
        location:'/reports',
        element:BirthdayReport,
        header:'Birthday Report and Daily Events/Task',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'aum-summary',
        location:'/reports/aum-summary',
        element:AumSummary,
        header:'AUM Summary',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'runfeesppm',
        location:'/reports/runfeesppm',
        element:RunFeesPPM,
        header:'Run Fees PPM',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'runfees-tradestation',
        location:'/reports/runfees-tradestation',
        element:RunFeesTradeStation,
        header:'Run Fees for Trade Station',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'runfees-ib',
        location:'/reports/runfees-ib',
        element:RunFeesIb,
        header:'Run Fees for Interactive Brokers',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'monthendfees-template',
        location:'/reports/monthendfees-template',
        element:MonthEndFees,
        header:'Month End Fees Template',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'portfoliomanagerfee',
        location:'/reports/portfoliomanagerfee',
        element:PortfolioManagerFee,
        header:'Portfolio Manager Fee',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'ifafeesreport',
        location:'/reports/ifafeesreport',
        element:IfaFeesReport,
        header:'IFA Fees Report',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'ppm-client-list',
        location:'/reports/ppm-client-list',
        element:PpmClientList,
        header:'PPM Client List',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'ppm-client-list-tfsa',
        location:'/reports/ppm-client-list-tfsa',
        element:PpmClientListTfsa,
        header:'PPM Client List TFSA',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'allan-gray-client-list',
        location:'/reports/allan-gray-client-list',
        element:AllenGrayClientList,
        header:'Allen Gray Client List',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'trade-station-client-list',
        location:'/reports/Trade Station Client List',
        element:TradeStation,
        header:'Trade Station Client List',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
      {
        path:'interactive-brokers-client-list',
        location:'/reports/interactive-brokers-client-list',
        element:InteractiveBrokers,
        header:'Interactive Brokers Client List',
        role: ['Super User','Executive User','Compliance user','Portfolio Manager'],
        breadcrumb:null,
        children:null
      },
    ]
  },
  {
    path: "maintenanceportal/*",
    location: "/maintenanceportal",
    element: MainPortalMaintenance,
    header: "Maintainance Portal",
    role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    breadcrumb: null,
    children: [
      {
        path:'upload',
        location:"/maintenanceportal/upload",
        element:MaintenancePortal,
        header:"Upload CSV Data Files",
        role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
        breadcrumb:null,
        children:null
      },
      {
        path:'manage-user-login-password',
        location:"/maintenanceportal/manage-user-login-password",
        element:ManageUserLoginPassword,
        header:"Manage User Logins and Passwords",
        role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
        breadcrumb:null,
        children:null
      },
    ]
  },
  {
    path:'tradingportal',
    location:'/tradingportal',
    element:TradingPortal,
    header:'Trading Portal',
    role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    breadcrumb:null,
    children:null
  },
  {
    path:'insurance-portal',
    location:'/insurance-portal',
    element:InsurancePortal,
    header:'Insurance Portal',
    role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    breadcrumb:null,
    children:null
  },
];
