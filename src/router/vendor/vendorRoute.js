import VendorAddRooms from "../../pages/vendor/VendorAddRooms";
import VendorDashBoard from "../../pages/vendor/VendorDashBoard";
import VendorViewAllRooms from "../../pages/vendor/VendorViewAllRooms";
import ReportIssue from "../../components/vendor/ReportIssue";

export const vendorRoutes = [
    {
        path : '/vendor',
        element: VendorDashBoard,
        isUserLayout: false,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: true,

    },
    {
        path:'/addrooms',
        element: VendorAddRooms,
        isUserLayout: false,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: true,
    },
    {
        path:'/rooms',
        element: VendorViewAllRooms,
        isUserLayout: false,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: true,
    },
    {
        path:"/report-issue",
        element: ReportIssue,
        isUserLayout: false,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: true,
    }
]