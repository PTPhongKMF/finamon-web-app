import { Outlet } from "react-router-dom";
import TopNavBar from "../TopNavBar";
import Footer from "../Footer";

function AppLayout() {
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

export default AppLayout;