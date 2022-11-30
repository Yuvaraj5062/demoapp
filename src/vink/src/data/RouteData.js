import Account from "../pages/account/Account";
import BusinessAccount from "../pages/business-pages/account/BusinessAccount";
import BusinessCreditCard from "../pages/business-pages/credit-card/BusinessCreditCard";
import BusinessLoan from "../pages/business-pages/loan/BusinessLoan";
import StartMyBusiness from "../pages/business-pages/start-my-business/StartMyBusiness";
import CreditCard from "../pages/credit card/CreditCard";
import Home from "../pages/home/Home";
import Insure from "../pages/insure/Insure";
import Invest from "../pages/invest/Invest";
import Loan from "../pages/loan/Loan";
import Rewards from "../pages/rewards/Rewards";

export const routeData = [
  {
    title: "Home",
    element: Home,
    navigate: "home",
    path: "/home/*",
    accountType: ["Personal"],
    children: [
      {
        element: Account,
        path: "account",
      },
      {
        element: CreditCard,
        path: "credit-card",
      },
      {
        element: Loan,
        path: "loan",
      },
      {
        element: Invest,
        path: "invest",
      },
      {
        element: Insure,
        path: "insure",
      },
      {
        element: Rewards,
        path: "rewards",
      },
    ],
  },

  {
    title: "Home",
    element: Home,
    navigate: "home",
    path: "/business/*",
    accountType: ["Business"],
    children: [
      {
        element: StartMyBusiness,
        path: "start-my-business",
      },
      {
        element: BusinessAccount,
        path: "account",
      },
      {
        element: BusinessCreditCard,
        path: "credit-card",
      },
      {
        element: BusinessLoan,
        path: "loan",
      },
      {
        element: Insure,
        path: "insure",
      },
      {
        element: Rewards,
        path: "rewards",
      },
    ],
  },
];
