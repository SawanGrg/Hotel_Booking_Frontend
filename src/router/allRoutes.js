import { adminRoutes } from "./admin/adminRoute";
import { userRoutes } from "./user/userRoute";
import { vendorRoutes } from "./vendor/vendorRoute";

export const allRoutes = [...userRoutes, ...adminRoutes, ...vendorRoutes];