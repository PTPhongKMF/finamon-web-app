import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SiteLayout from "./components/wrapper/SiteLayout";
// import Blog from "./pages/blog/Blog";
import BlogCreate from "./pages/blog/BlogCreate";
// import BlogDetail from "./pages/blog/BlogDetail";
import BlogEdit from "./pages/blog/BlogEdit";
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
import StaffSubscription from "./pages/dashboard/staff/StaffSubscription";
import StaffDbBlog from "./pages/dashboard/staff/StaffDbBlog";
import ScrollToTop from "./components/ScrollToTop";
import ProfileLayout from "./components/profile/ProfileLayout";
import UserProfile from "./pages/profile/UserProfile";
import AppJournal from "./pages/app/AppJournal";
import Test from "./pages/Test";
import AppBudget from "./pages/app/AppBudget";
import AppLayout from "./components/app/AppLayout";
import FloatScrollToTop from "./components/FloatScrollToTop";
import useUserActivityTracker from "./hooks/analytic";
import UserSecurity from "./pages/profile/UserSecurity";
import UserSubscription from "./pages/profile/UserSubscription";
import SuccessLogoutDialog from "./components/profile/SuccessLogoutDialog";
import FloatAIChat from "./components/FloatAIChat";
import MockFeature from "./pages/MockFeature";
import MockBlog from "./pages/blog/MockBlog";
import MockBlogDetail from "./pages/blog/MockBlogDetail";
import Download from "./pages/Download";
import useTrackVisit from "./hooks/useTrackVisit";

function App() {
  useUserActivityTracker();
  useTrackVisit();

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> */}
          <Route path="/blog" element={<MockBlog />} />
          <Route path="/blog/:slug" element={<MockBlogDetail />} />
          <Route path="/blogs" element={<MockBlog />} />
          <Route path="/download" element={<Download />} />

          {/* Protected blog routes - require login */}
          <Route element={<ProtectedRoute allowedRoles={["User", "Staff", "Admin"]} />}>
            <Route path="/blog/create" element={<BlogCreate />} />
            <Route path="/blog/edit/:id" element={<BlogEdit />} />
          </Route>
          {/* <Route path="/features" element={<Feature />} /> */}
          <Route path="/features" element={<MockFeature />} />
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
              <Route path="security" element={<UserSecurity />} />
              <Route path="subscription" element={<UserSubscription />} />
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
              <Route index element={<StaffSubscription />} />
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

      <SuccessLogoutDialog />

      <FloatAIChat />
      <FloatScrollToTop />
    </>
  );
}

export default App;
