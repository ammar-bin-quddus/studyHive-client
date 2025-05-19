import { useContext } from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="w-full">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full sticky top-0 left-0 z-50">
            <Nav />
          </div>
          <Outlet />
          <div className="w-full">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
