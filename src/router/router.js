import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "../layouts/user/LandingLayout";
import { allRoutes } from "./allRoutes";
import UserWrapper from "./user/userWrapper";
import AdminWrapper from "./admin/adminWrapper";

// checking if the page has layout or not
//checking if the user, admin, vendor exists or not
const UserRouteWrapper = ({ route, children }) => {
  
  const AppLayoutWrapper = route.hasLayout ? LandingLayout : Fragment;
  const PrivateLayoutWrapper = route.isPrivate ? UserWrapper : Fragment;

  return (
    <PrivateLayoutWrapper>
      <AppLayoutWrapper>{children}</AppLayoutWrapper>
    </PrivateLayoutWrapper>
  );
};

const AdminRouteWrapper = ({ route, children }) => {
 
  const AppLayoutWrapper = route.hasLayout ? LandingLayout : Fragment;
  const AdminPrivateWrapper = route.isPrivate ? AdminWrapper : Fragment;

  return (
    <AdminPrivateWrapper>
      <AppLayoutWrapper>{children}</AppLayoutWrapper>
    </AdminPrivateWrapper>
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.isUserLayout ? (
                <UserRouteWrapper route={route}>
                  <route.element />
                </UserRouteWrapper>
              ) : route.isAdminLayout ? (
                <AdminRouteWrapper route={route}>
                  <route.element />
                </AdminRouteWrapper>
              ) : (
                route.isVendorLayout && (
                  <UserRouteWrapper route={route}>
                    <route.element />
                  </UserRouteWrapper>
                )
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}