import VendorDashBoard from "../../pages/vendor/VendorDashBoard";
export const vendorRoutes = [
    {
        path : '/vendor',
        element: VendorDashBoard,
        isUserLayout: false,
        hasLayout: false,
        isPrivate: true,
        isAdminLayout: false,
        isVendorLayout: true,

    }
]