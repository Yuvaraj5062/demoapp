import { Clients, CRM, Dashboard, GlobalFund, IFAs, Logout, Maintenance, Offshore, Reports, WatchListIcon } from "../component/svg-components";


export const sideBarData = [
    {
        location: "dashboard",
        title: "Dashboard",
        role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
        dropdown: false,
        icon: Dashboard,
        children: [
            {
                location: "",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null,
            },
            {
                location: "dashboard/daily-trade-log",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null,
            },
            {
        
                location: "dashboard/ppm-model-equity-portfolio",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null,
            },
            {
                location: "dashboard/ppm-tfsa-model-portfolio",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null,
            },
        ],
    },
    {
        location: "watchlist",
        dropdown: false,
        icon: WatchListIcon,
        title: "Watchlist",
        role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
        children: null,
    },
    {
        location: "clients",
        dropdown: false,
        icon: Clients,
        title: "Clients",
        role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
        children: [
            {
                location: "",
                title: "Clients",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null,
            },
            {
                // path: ":id",
                location: "clients/:id",
                dropdown: false,
                icon: Dashboard,
                title: "Drago Mijatović",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null
            },
            {
                // path: ":id/waltcapital",
                location: "/clients/1/waltcapital",
                dropdown: false,
                icon: Dashboard,
                title: "Walt Capital Global Fund",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null
            },
            {
                // path: ":id/taxfreeinvestment",
                location: "clients/1/taxfreeinvestment",
                dropdown: false,
                icon: Dashboard,
                title: "JSE Tax Free Investment Account at PPM Securities",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null
            },
            {
                // path: ":id/allan-gray-ra",
                location: "clients/1/allan-gray-ra",
                dropdown: false,
                icon: Dashboard,
                title: "Allan Gray - RA",
                role: [
                    "Super User",
                    "Compliance user",
                    "Admin User",
                    "Portfolio Manager",
                ],
                children: null
            },
        ],
    },
    {
        // path: "fund-administration/*",
        location: "fund-administration",
        dropdown: false,
        icon: GlobalFund,
        title: "Fund Administration",
        role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
        children: [
            {             
                location: '',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
            {
                location: '/activatedeactivatefund',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
            {
                location: '/clienttransaction',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'], 
                children: null
            },
            {
                location: '/clientlist',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
            {
                location: '/clientstatement',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
            {
                location: '/pricing',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'], 
                children: null
            },
            {
                location: '/runfees',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
            {   
                location: '/runfees/ifafeesbreakdown',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
            {
                location: '/fundbenchmark',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
            {
                location: '/factsheets',
                role: ['Super User', 'Executive User', 'Admin User', 'Portfolio Manager'],
                children: null
            },
        ]
    },
    {
        location: "crm",
        dropdown: false,
        icon: CRM,
        title: "CRM",
        role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
        children: [
            {
                location: '/crm',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                location: '/crm/brokergefees',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
        ]
    },
    {
        
        location: 'ifas',
        dropdown: false,
        icon: IFAs,
        title: "IFAs",
        role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
        children: [
            {
                location: 'ifas',
                role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
                children: null
            },
            {
                location: 'ifas/addnewifas',
                role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
                children: null
            },
            {
                // path: ':id',
                location: 'ifas/1',
                role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
                children: null
            },
            {    
                location: 'ifas/ifaaumreport',
                role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
                children: null
            },
            {
                location: 'ifas/ifaclientlist',
                role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
                children: null
            },
            {
                location: 'ifas/monthlyreports',
                role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
                children: null
            },
            {
                location: 'ifas/addnewifas/generateifainvoice',
                 role: ['Super User', 'Executive User', 'Compliance user', 'Admin User'],
                children: null
            },
        ]
    },
    {

        location: "offshore",
        dropdown: false,
        icon: Offshore,
        title: "Offshore",
        role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
        children: null
    },
    {

        location: "reports",
        dropdown: true,
        title: "Reports",
        icon: Reports,
        role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
        children: [
            // {
                
            //     location: '',

            //     role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],

            //     children: null
            // },
            {
                title: "AUM Summary",
                location: 'reports/aum-summary',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "Run fees PPM",
                location: 'reports/runfeesppm',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "Run fees for Trade Station",
                location: 'reports/runfees-tradestation',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "Run fees for IB",
                location: 'reports/runfees-ib',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: " Month End Fees Template",
                location: 'reports/monthendfees-template',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "Portfolio Manager Fee",
                location: 'reports/portfoliomanagerfee',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "IFA Fees Report",
                location: 'reports/ifafeesreport',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "PPM Client List",
                location: 'reports/ppm-client-list',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "PPM Client List TFSA",
                location: 'reports/ppm-client-list-tfsa',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "Allen Gray Client List",
                location: 'reports/allan-gray-client-list',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "Tradestation Client List",
                location: 'reports/Trade Station Client List',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
            {
                title: "Interactive Brokers Client List",
                location: 'reports/interactive-brokers-client-list',
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
                children: null
            },
        ]
    },
    {
    
        location: "maintenanceportal",
        dropdown: true,
        icon: Maintenance,
        title: "Maintainance Portal",
        role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
        children: [
            {
                title: "Upload CSV Data Files", 
                location: "maintenanceportal/upload",
                role: ['Super User', 'Executive User', 'Compliance user', 'Portfolio Manager'],
       
                children: null
            },
            {
                title: "System Access",
                location:"maintenanceportal/system-access",
                role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
                children: null
            },
            {
                title: "Manage User Logins and Passwords",
                location: "maintenanceportal/manage-user-login-password",
                role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
                children: null
            },
        ]
    },
    // {
        
    //     location: 'tradingportal',
    //     dropdown: false,
    //     icon: Dashboard,
    //     title: 'Trading Portal',
    //     role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],

    //     children: null
    // },
    // {

    //     location: 'insurance-portal',
    //     dropdown: false,
    //     icon: Dashboard,
    //     title: 'Insurance Portal',
    //     role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
    //     children: null
    // },
    {

        location: '/',
        dropdown: false,
        icon: Logout,
        title: 'Logout',
        role: ["Super User", "Compliance user", "Admin User", "Portfolio Manager"],
        children: null
    },
];
