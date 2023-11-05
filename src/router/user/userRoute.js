import Home from "../../pages/user/Home"
import About from "../../pages/user/About"
import Gallery from "../../pages/user/Gallery"
import Login from "../../pages/user/Login"
import Blogs from "../../pages/user/Blogs"
import Profile from "../../pages/user/Profile"

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
        path: '/about',
        element: About,
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
        path: "/profile",
        element: Profile,
        isPrivate: true,
        hasLayout: true,
        isUserLayout: true,
        isAdminLayout: false,
        isVendorLayout: false,
    }
    

]