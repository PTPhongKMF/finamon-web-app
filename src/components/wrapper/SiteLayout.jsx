import { Outlet } from "react-router-dom";
import TopNavBar from "../TopNavBar";
import Footer from "../Footer";

function SiteLayout() {
  return (
    <>
      <TopNavBar />

      <main className="h-full">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default SiteLayout;