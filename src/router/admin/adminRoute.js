import AdminSpecificBlog from "../../components/admin/AdminSpecificBlog";
import ViewAllHotel from "../../components/admin/ViewAllHotel";
import ViewSpecificHotel from "../../components/admin/ViewSpecificHotel";
import ViewSpecificUser from "../../components/admin/ViewSpecificUser";
import AdminHome from "../../pages/admin/AdminHome";
import ViewAllBlogs from "../../pages/admin/ViewAllBlogs";
import ViewAllUser from "../../pages/admin/ViewAllUser";
import ViewAllUserMessage from "../../pages/admin/ViewAllUserMessage";
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
    ,
    {
        path: '/admin/viewAllBlogs',
        element: ViewAllBlogs,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    }
    ,{
        path: '/admin/blog/:blogId',
        element: AdminSpecificBlog,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,        
    },
    {
        path: '/admin/viewAllUserMessages',
        element: ViewAllUserMessage,
        hasLayout: true,
        isPrivate: false,
        isAdminLayout: true,
        isUserLayout: false,
        isVendorLayout: false,
    }

]