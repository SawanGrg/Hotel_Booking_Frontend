import AdminHome from "../../pages/admin/AdminHome";
import AdminHotel from "../../pages/admin/AdminHotel";

export const adminRoutes= [
    {
        path: '/admin/hotel',
        element: AdminHotel,
        hasLayout: true,
        isPrivate: true,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,

    },
    {
        path: "/admin/home",
        element: AdminHome,
        isPrivate: true,
        hasLayout: true,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    }

]