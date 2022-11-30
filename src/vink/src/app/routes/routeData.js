import Account from "../../pages/personal-pages/account/Account";
import CreditCard from "../../pages/personal-pages/credit card/CreditCard";
import Home from "../../pages/home/Home";
import Insure from "../../pages/personal-pages/insure/Insure";
import Invest from "../../pages/personal-pages/invest/Invest";
import Loan from "../../pages/personal-pages/loan/Loan";
import Personal from "../../pages/personal-pages/Personal";
import Rewards from "../../pages/personal-pages/rewards/Rewards";
import Business from "../../pages/business-pages/Business";
import StartMyBuisness from "../../pages/business-pages/start-my-business/StartMyBusiness";
import BusinessAccount from "../../pages/business-pages/account/BusinessAccount";
import BuisnessCreditCard from "../../pages/business-pages/credit-card/BusinessCreditCard";
import BuisnessLoan from "../../pages/business-pages/loan/BusinessLoan";
import BuisnessInvest from "../../pages/business-pages/invest/BusinessInvest";
import BuisnessInsure from "../../pages/business-pages/insure/BusinessInsure";
import BuisnessManage from "../../pages/business-pages/manage-business/BusinessManage";
import Corporate from "../../pages/corporate-pages/Corporate";
import CorporateAccount from "../../pages/corporate-pages/corporate-account/CorporateAccount";
import CorporateCreditCard from "../../pages/corporate-pages/corporate-credit-card/CorporateCreditCard";
import CorporateLoan from "../../pages/corporate-pages/corporate-loan/CorporateLoan";
import CorporateApi from "../../pages/corporate-pages/corporate-api/CorporateApi";
import ContactUs from "../../pages/contact-us/ContactUs";
import ConnectUs from "../../components/connect-us/ConnectUs";
import LocateUs from "../../components/locate-us/LocateUs";
import Feedback from "../../components/feedback-us/Feedback";
import GetHelp from "../../pages/get-help/GetHelp";
import BusinessInternational from "../../pages/business-pages/international/BusinessInternational";
import SocialResponsibility from "../../pages/corporate-pages/social-responsibility/SocialResponsibility";
import CorporateEvents from "../../pages/corporate-pages/corporate-events/CorporateEvents";
import Studio from "../../pages/business-pages/studio/Studio";
import AboutVms from "../../pages/about-vms/AboutVms";
import PersonalBanking from "../../pages/personal-banking/PersonalBanking";
import WealthManagement from "../../pages/wealth-investment-management/WealthMangement";
import InvestorRealation from "../../pages/investor-relation/InvestorRelation";
import BoardOfDirector from "../../components/boardOfDirector/BoardOfDirector";
import Management from "../../components/management/Management";
import BoardCommittee from "../../components/board-committee/BoardCommittee";
import Responsibilities from "../../components/responsibilities/Responsibilities";
export const routeData = [
  {
    path: "",
    element: Home,
    role: ["personal", "business", "corporate", "marketplace"],
    children: null,
  },
  {
    path: "/gethelp",
    element: GetHelp,
    role: ["personal", "business", "corporate", "marketplace"],
    children: null,
  },
  {
    path: "contactus/*",
    element: ContactUs,
    role: ["personal", "business", "corporate", "marketplace"],
    children: [
      {
        path: "",
        element: ConnectUs,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
      {
        path: "connect",
        element: ConnectUs,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
      {
        path: "locateus",
        element: LocateUs,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
      {
        path: "feedback",
        element: Feedback,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
    ],
  },
  {
    path: "aboutvms/*",
    element: AboutVms,
    role: ["personal", "business", "corporate", "marketplace"],
    children: null,
  },
  {
    path: "investorrelation/*",
    element: InvestorRealation,
    role: ["personal", "business", "corporate", "marketplace"],
    children: [
      {
        path: "",
        element: BoardOfDirector,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
      {
        path: "boardofdirectors",
        element: BoardOfDirector,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
      {
        path: "management",
        element: Management,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
      {
        path: "boardcommittees",
        element: BoardCommittee,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
      {
        path: "responsibilities",
        element: Responsibilities,
        role: ["personal", "business", "corporate", "marketplace"],
        children: null,
      },
    ],
  },
  {
    path: "/peronalbanking",
    element: PersonalBanking,
    role: ["personal", "business", "corporate", "marketplace"],
    children: null,
  },
  {
    path: "/wealthinvestmentmanagement",
    element: WealthManagement,
    role: ["personal", "business", "corporate", "marketplace"],
    children: null,
  },
  {
    path: "personal/*",
    element: Personal,
    role: ["personal"],
    children: [
      {
        path: "",
        // element:Account,
        // role:['personal'],
        // children:null,
        redirect: "/personal/account",
      },
      {
        path: "account",
        element: Account,
        role: ["personal"],
        children: null,
      },
      {
        path: "credit-card",
        element: CreditCard,
        role: ["personal"],
        children: null,
      },
      {
        path: "loan",
        element: Loan,
        role: ["personal"],
        children: null,
      },
      {
        path: "invest",
        element: Invest,
        role: ["personal"],
        children: null,
      },
      {
        path: "insure",
        element: Insure,
        role: ["personal"],
        children: null,
      },
      {
        path: "rewards",
        element: Rewards,
        role: ["personal"],
        children: null,
      },
      // {
      //     path:'*',
      //     element:NotFound,
      //     role:['personal','business','corporate','marketplace'],
      //     children:null,
      // },
    ],
  },
  {
    path: "business/*",
    element: Business,
    role: ["business"],
    children: [
      {
        path: "",
        // element:StartMyBuisness,
        // role:['business'],
        // children:null,
        redirect: "/business/start-my-business",
      },
      {
        path: "start-my-business",
        element: StartMyBuisness,
        role: ["business"],
        children: null,
      },
      {
        path: "account",
        element: BusinessAccount,
        role: ["business"],
        children: null,
      },
      {
        path: "credit-card",
        element: BuisnessCreditCard,
        role: ["business"],
        children: null,
      },
      {
        path: "loan",
        element: BuisnessLoan,
        role: ["business"],
        children: null,
      },
      {
        path: "invest",
        element: BuisnessInvest,
        role: ["business"],
        children: null,
      },
      {
        path: "insure",
        element: BuisnessInsure,
        role: ["business"],
        children: null,
      },
      {
        path: "manage-my-business",
        element: BuisnessManage,
        role: ["business"],
        children: null,
      },
      {
        path: "international",
        element: BusinessInternational,
        role: ["business"],
        children: null,
      },
      {
        path: "studio",
        element: Studio,
        role: ["business"],
        children: null,
      },
      {
        path: "news",
        element: StartMyBuisness,
        role: ["business"],
        children: null,
      },
      // {
      //     path:'*',
      //     element:NotFound,
      //     role:['personal','business','corporate','marketplace'],
      //     children:null,
      // },
    ],
  },
  {
    path: "corporate/*",
    element: Corporate,
    role: ["corporate"],
    children: [
      {
        path: "",
        // element:CorporateAccount,
        // role:['corporate'],
        // children:null
        redirect: "/corporate/account",
      },
      {
        path: "account",
        element: CorporateAccount,
        role: ["corporate"],
        children: null,
      },
      {
        path: "solutions-credit-cards",
        element: CorporateCreditCard,
        role: ["corporate"],
        children: null,
      },
      {
        path: "loan",
        element: CorporateLoan,
        role: ["corporate"],
        children: null,
      },
      {
        path: "api",
        element: CorporateApi,
        role: ["corporate"],
        children: null,
      },
      {
        path: "events",
        element: CorporateEvents,
        role: ["corporate"],
        children: null,
      },
      {
        path: "social-responsibility",
        element: SocialResponsibility,
        role: ["corporate"],
        children: null,
      },
    ],
  },
  // {
  //     path:'notfound',
  //     element:NotFound,
  //     role:['personal','business','corporate','marketplace'],
  //     children:null,
  // },
  // {
  //     path:'*',
  //     element:NotFound,
  //     role:['personal','business','corporate','marketplace'],
  //     children:null,
  // },
];
