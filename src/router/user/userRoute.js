import Home from "../../pages/user/Home"
import Gallery from "../../pages/user/Gallery"
import Login from "../../pages/user/Login"
import Blogs from "../../pages/user/Blogs"
import Profile from "../../pages/user/Profile"
import Hotel from "../../pages/user/Hotel"
import SpecificHotel from "../../components/user/SpecificHotel"
import Booking from "../../pages/user/Booking"
import PageNotFound from "../../pages/user/PageNotFound"
import UserBookings from "../../pages/user/UserBookings"
import SpecificBlog from "../../components/user/SpecificBlog"
import PostBlog from "../../components/user/PostBlog"
import Contact from "../../pages/user/Contact"
import UserRegistration from "../../pages/user/UserRegistration"

// kun layout ma rakhne bhani matra ho
//just defining the layoutes here
//layout and authenticaion will be checked in the router.js
export const userRoutes = [
    {
        path: '/login',
        element: Login,
        isUserLayout: true,
        hasLayout: false,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path: '/',
        element: Home,
        hasLayout: true,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path: '/hotel',
        element: Hotel,
        hasLayout: true,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false,

    },
    {
        path: '/gallery',
        element: Gallery,
        hasLayout: true,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path: '/blog',
        element: Blogs,
        hasLayout: true,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/specificBlog/:blogId",
        element: SpecificBlog,
        hasLayout: true,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false
    },
    {

        path: "/postBlog",
        element: PostBlog,
        hasLayout: true,
        isUserLayout: true,
        isPrivate: true,
        isAdminLayout: false,
        isVendorLayout: false

    },
    {
        path: "/contact",
        element: Contact,
        hasLayout: true,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false,

    },
    {
        path: "/profile",
        element: Profile,
        isPrivate: false,
        hasLayout: true,
        isUserLayout: true,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/user-booking",
        element: UserBookings,
        isPrivate: false,
        hasLayout: true,
        isUserLayout: true,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path: "/hotel/:hotelId",
        element: SpecificHotel,
        isPrivate: false,
        hasLayout: true,
        isUserLayout: true,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path : "/hotel/:hotelId/room/:roomId/:roomPrice",
        element :Booking,
        isPrivate: true,
        hasLayout: true,
        isUserLayout: true,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path: '*',
        element: PageNotFound,
        hasLayout: false,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false,
    },
    {
        path:"/UserRegistration",
        element: UserRegistration,
        hasLayout: false,
        isUserLayout: true,
        isPrivate: false,
        isAdminLayout: false,
        isVendorLayout: false
    }

]