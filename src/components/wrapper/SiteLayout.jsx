import { Outlet } from "react-router-dom";
import TopNavBar from "../TopNavBar";
import Footer from "../Footer";

function SiteLayout() {
  return (
    <>
      <TopNavBar />

      <main className="min-h-170">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default SiteLayout;