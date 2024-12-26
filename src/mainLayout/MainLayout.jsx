import React, { useContext } from "react";
import NavBar from "../components/NavBar";
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
          <div className="w-11/12 mx-auto py-3">
            <NavBar />
          </div>
          <Outlet />
          <div className="w-11/12 mx-auto">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
