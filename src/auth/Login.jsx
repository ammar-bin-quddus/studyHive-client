import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { handleLogin, handleGoogleLogin, setLoading } =
    useContext(AuthContext);

  const [isShow, setIsShow] = useState(false);
  const location = useLocation();
  //console.log(location)
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    handleLogin(email, password)
      .then((res) => {
        setLoading(false);
        e.target.reset();
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  const handleGoogle = () => {
    handleGoogleLogin()
      .then((res) => {
        setLoading(false);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.code);
      });
  };

  return (
    <div>
      <div className="w-11/12 mx-auto py-3">
        <NavBar />
      </div>
      <div className="min-h-screen flex justify-center items-center my-10">
        <div className="card bg-base-100 w-full shadow-xl max-w-lg shrink-0 rounded-none p-8">
          <h2 className="text-center text-2xl font-bold underline">
            Login Form
          </h2>
          <form onSubmit={(e) => handleLoginForm(e)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={isShow ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <div
                onClick={handleShowPassword}
                className="absolute text-xl right-3 top-[52px]"
              >
                {isShow ? <FaEyeSlash /> : <FaEye />}
              </div>

              <label className="label">
                <p className="label-text-alt link link-hover">
                  Forgot password?
                </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral">Login</button>
            </div>
          </form>
          <p className="font-semibold text-center">
            Dont’t Have An Account ?{" "}
            <Link to="/register" className="text-red-500">
              Register
            </Link>
          </p>
          <div className="mt-6 flex items-center gap-3 justify-center">
            <span className="text-xl">Sign In with</span>{" "}
            <button onClick={handleGoogle} className="bg-gray-100 p-2 active:scale-105 transition-transform text-2xl rounded-full hover:bg-gray-300">
              <FcGoogle />
            </button>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
