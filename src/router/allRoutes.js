import { adminRoutes } from "./admin/adminRoute";
import { userRoutes } from "./user/userRoute";

export const allRoutes = [...userRoutes, ...adminRoutes];