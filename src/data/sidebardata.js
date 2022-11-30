import {
  Clients,
  CRM,
  Dashboard,
  GlobalFund,
  IFAs,
  Logout,
  Maintenance,
  Offshore,
  Portfolio,
  Reports,
  WatchListIcon,
} from "../component/svg-components";

const SuperAdmin = "SuperAdmin";
const ComplianceUser = "Clients";
const AdminUser = "AdminUser";
const PortfolioManager = "PortfolioManager";
const ExecutiveUser = "ExecutiveUser";

export const sideBarData = [
  {
    location: "/dashboard",
    title: "Dashboard",
    role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
    dropdown: false,
    icon: Dashboard,
    children: [
      {
        location: "",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "dashboard/daily-trade-log",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "dashboard/ppm-model-equity-portfolio",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "dashboard/ppm-tfsa-model-portfolio",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
    ],
  },
  {
    location: "/watchlist",
    dropdown: false,
    icon: WatchListIcon,
    title: "Watchlist",
    role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
    children: null,
  },
  {
    location: "/portfolio",
    dropdown: false,
    icon: Portfolio,
    title: "Portfolio",
    role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
    children: null,
  },
  {
    location: "/clients",
    dropdown: false,
    icon: Clients,
    title: "Clients",
    role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
    children: [
      {
        location: "",
        title: "Clients",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        // path: ":id",
        location: "clients/:id",
        dropdown: false,
        icon: Dashboard,
        title: "Drago Mijatović",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        // path: ":id/waltcapital",
        location: "/clients/1/waltcapital",
        dropdown: false,
        icon: Dashboard,
        title: "Walt Capital Global Fund",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        // path: ":id/taxfreeinvestment",
        location: "clients/1/taxfreeinvestment",
        dropdown: false,
        icon: Dashboard,
        title: "JSE Tax Free Investment Account at PPM Securities",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        // path: ":id/allan-gray-ra",
        location: "clients/1/allan-gray-ra",
        dropdown: false,
        icon: Dashboard,
        title: "Allan Gray - RA",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
    ],
  },
  {
    // path: "fund-administration/*",
    location: "/fund-administration",
    dropdown: false,
    icon: GlobalFund,
    title: "Fund Administration",
    role: [SuperAdmin, AdminUser, PortfolioManager],
    children: [
      {
        location: "",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/activatedeactivatefund",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/clienttransaction",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/clientlist",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/clientstatement",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/pricing",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/runfees",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/runfees/ifafeesbreakdown",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/fundbenchmark",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        location: "/factsheets",
        role: [SuperAdmin, ExecutiveUser, AdminUser, PortfolioManager],
        children: null,
      },
    ],
  },
  {
    location: "/crm",
    dropdown: false,
    icon: CRM,
    title: "CRM",
    role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
    children: [
      {
        location: "/crm",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        location: "/crm/brokergefees",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
    ],
  },
  {
    location: "/ifas",
    dropdown: false,
    icon: IFAs,
    title: "IFAs",
    role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
    children: [
      {
        location: "ifas",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
        children: null,
      },
      {
        location: "ifas/addnewifas",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
        children: null,
      },
      {
        // path: ':id',
        location: "ifas/1",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
        children: null,
      },
      {
        location: "ifas/ifaaumreport",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
        children: null,
      },
      {
        location: "ifas/ifaclientlist",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
        children: null,
      },
      {
        location: "ifas/monthlyreports",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
        children: null,
      },
      {
        location: "ifas/addnewifas/generateifainvoice",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, AdminUser],
        children: null,
      },
    ],
  },
  {
    location: "/offshore",
    dropdown: false,
    icon: Offshore,
    title: "Offshore",
    role: [SuperAdmin, ExecutiveUser, PortfolioManager],
    children: null,
  },
  {
    location: "/reports",
    dropdown: true,
    title: "Reports",
    icon: Reports,
    role: [SuperAdmin, ExecutiveUser, PortfolioManager],
    children: [
      // {

      //     location: '',

      //     role: ['SuperAdmin', 'Executive User', 'Compliance user', 'Portfolio Manager'],

      //     children: null
      // },
      {
        title: "AUM Summary",
        location: "/reports/aum-summary",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "Run fees PPM",
        location: "/reports/runfeesppm",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "Run fees for Trade Station",
        location: "/reports/runfees-tradestation",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "Run fees for IB",
        location: "/reports/run-fees-for-ib",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: " Month End Fees Template",
        location: "/reports/month-end-fees-template",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "Portfolio Manager Fee",
        location: "/reports/portfolio-manager-fee",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "IFA Fees Report",
        location: "/reports/ifa-fees-report",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "PPM Client List",
        location: "/reports/ppm-client-list",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "PPM Client List TFSA",
        location: "/reports/ppm-client-list-tfsa",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "Allen Gray Client List",
        location: "/reports/allen-gray-client-list",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "Tradestation Client List",
        location: "/reports/tradestation-client-list",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      {
        title: "Interactive Brokers Client List",
        location: "/reports/interactive-brokers-client-list",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
    ],
  },
  {
    location: "/maintenance-portal",
    dropdown: true,
    icon: Maintenance,
    title: "Maintenance Portal",
    role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
    children: [
      {
        title: "Upload CSV Data Files",
        location: "/maintenance-portal/upload-csv-data-files",
        role: [SuperAdmin, ExecutiveUser, ComplianceUser, PortfolioManager],
        children: null,
      },
      // {
      //   title: "System Access",
      //   location: "/maintenance-portal/system-access",
      //   // location: " Maintenance Portal/System Access",
      //   role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
      //   children: null,
      // },
      {
        title: "Manage Software Access",
        location: "/maintenance-portal/manage-software-access",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
      {
        title: "Manage Roles",
        location: "/maintenance-portal/manage-roles",
        role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
        children: null,
      },
    ],
  },
  {
    location: "/logout",
    dropdown: false,
    icon: Logout,
    title: "Logout",
    role: [SuperAdmin, ComplianceUser, AdminUser, PortfolioManager],
    children: null,
  },
];
