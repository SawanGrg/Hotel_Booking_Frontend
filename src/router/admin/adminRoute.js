import AdminHome from "../../pages/admin/AdminHome";
import AdminHotel from "../../pages/admin/AdminHotel";
import ViewAllUser from "../../pages/admin/ViewAllUser";
import ViewAllVendor from "../../pages/admin/ViewAllVendor";
import ViewVendorIssue from "../../pages/admin/ViewVendorIssue";

export const adminRoutes= [
    {
        path: '/admin/hotel',
        element: AdminHotel,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,

    },
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
        path: "/admin/user",
        element: ViewAllUser,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/admin/vendor",
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

]