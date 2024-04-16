import ViewAllHotel from "../../components/admin/ViewAllHotel";
import ViewSpecificHotel from "../../components/admin/ViewSpecificHotel";
import ViewSpecificUser from "../../components/admin/ViewSpecificUser";
import AdminHome from "../../pages/admin/AdminHome";
import ViewAllUser from "../../pages/admin/ViewAllUser";
import ViewAllVendor from "../../pages/admin/ViewAllVendor";
import ViewVendorIssue from "../../pages/admin/ViewVendorIssue";

export const adminRoutes= [
    {
        path: "/admin/home",
        element: AdminHome,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/admin/viewAllUser",
        element: ViewAllUser,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/admin/viewAllVendor",
        element: ViewAllVendor,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/admin/viewAllReport",
        element: ViewVendorIssue,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    }
    ,
    {
        path: "/admin/viewSpecificUser/:userId",
        element: ViewSpecificUser,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/admin/viewAllHotels",
        element: ViewAllHotel,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    },
    {
        path: '/admin/viewSpecificHotel/:hotelId',
        element: ViewSpecificHotel,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    }

]