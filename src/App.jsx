import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/wrapper/AppLayout";
import Blog from "./pages/Blog";
import Feature from "./pages/Feature";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AuthContextProvider from "./contexts/AuthContextProvider";
import Logout from "./pages/Logout";
import Overview from "./pages/Overview";
import ProtectedRoute from "./components/wrapper/ProtectedRoute";

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/pricings" element={<Pricing />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route element={<ProtectedRoute allowedRoles={["customer", "staff", "admin"]} />}>
            <Route path="/app">
              <Route index element={<Overview />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App;
