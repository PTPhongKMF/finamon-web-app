import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <>
      <TopNavBar />

      <main className="min-h-150">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default PublicLayout;