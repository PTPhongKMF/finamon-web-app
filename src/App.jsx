import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/PublicLayout";
import Blog from "./pages/Blog";
import Feature from "./pages/Feature";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/pricings" element={<Pricing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/app" element={} />} /> */}
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>

  )
}

export default App;
