import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SiteLayout from "./components/wrapper/SiteLayout";
import Blog from "./pages/blog/Blog";
import Feature from "./pages/Feature";
import Pricing from "./pages/Pricing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Logout from "./pages/auth/Logout";
import AppOverview from "./pages/app/AppOverview";
import ProtectedRoute from "./components/wrapper/ProtectedRoute";
import { Component } from "./pages/app/testOverview";
import VerifyAccount from "./pages/auth/VerifyAccount";
import DashboardLayout from "./components/wrapper/DashboardLayout";
import StaffDbOverview from "./pages/dashboard/staff/StaffDbOverview";
import StaffDbBlog from "./pages/dashboard/staff/StaffDbBlog";
import ScrollToTop from "./components/ScrollToTop";
import ProfileLayout from "./components/profile/ProfileLayout";
import UserProfile from "./pages/profile/UserProfile";
import AppJournal from "./pages/app/AppJournal";
import Test from "./pages/Test";
import AppBudget from "./pages/app/AppBudget";
import AppLayout from "./components/app/AppLayout";
import FloatScrollToTop from "./components/FloatScrollToTop";
import useUserActivityTracker from "./utils/analytic";

function App() {
  useUserActivityTracker();

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/pricings" element={<Pricing />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/logout" element={<Logout />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={["Customer", "Staff", "Admin"]} />
            }
          >
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<UserProfile />} />
            </Route>

            <Route path="/app" element={<AppLayout />}>
              <Route index element={<AppOverview />} />
              <Route path="journal" element={<AppJournal />} />
              <Route path="budget" element={<AppBudget />} />
              <Route path="t" element={<Component />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["Staff", "Admin"]} />}>
            <Route path="/dashboard/staff" element={<DashboardLayout />}>
              <Route index element={<StaffDbOverview />} />
              <Route path="blogs" element={<StaffDbBlog />} />
            </Route>
          </Route>

          {/* <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/dashboard/admin" element={<StaffDashboardLayout/>}>
              <Route index element={<AppOverview />} />
            </Route>
          </Route> */}

          <Route path="*" element={<NotFound />} />

          <Route path="/t" element={<Test />} />
        </Route>
      </Routes>

      <FloatScrollToTop />
    </>
  );
}

export default App;
