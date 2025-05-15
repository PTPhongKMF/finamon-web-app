import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PublicLayout from "./components/PublicLayout";
import Blog from "./pages/Blog";
import Feature from "./pages/Feature";
import Pricing from "./pages/Pricing";

function App() {

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="features" element={<Feature />} />
        <Route path="pricings" element={<Pricing />} />

        <Route path="login" element={<Pricing />} />
        <Route path="register" element={<Pricing />} />
      </Route>
    </Routes>
  )
}

export default App;
