import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SiteLayout from "./components/wrapper/SiteLayout";
import Blog from "./pages/Blog";
import Feature from "./pages/Feature";
import Pricing from "./pages/Pricing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import AuthContextProvider from "./contexts/AuthContextProvider";
import Logout from "./pages/auth/Logout";
import Overview from "./pages/app/Overview";
import ProtectedRoute from "./components/wrapper/ProtectedRoute";
import AppLayout from "./components/wrapper/AppLayout";
import { Component } from "./pages/app/testOverview";
import VerifyAccount from "./pages/auth/VerifyAccount";

function App() {

  return (
    <AuthContextProvider>
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

          <Route element={<ProtectedRoute allowedRoles={["Customer", "Staff", "Admin"]} />}>
            <Route path="/app" element={<AppLayout/>}>
              <Route index element={<Overview />} />
              <Route path="t" element={<Component />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App;
