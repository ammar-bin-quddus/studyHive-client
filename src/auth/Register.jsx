import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, handleGoogleLogin, setLoading, updateUser } =
    useContext(AuthContext);

  const [error, setError] = useState({});

  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const handleRegisterForm = (e) => {
    e.preventDefault();
    const userName = e.target.name.value;
    const photoUrl = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const registerData = { userName, photoUrl, email };

    if (!regexPassword.test(password)) {
      setError({
        ...error,
        password:
          "Must have an Uppercase letter and Lowercase letter in the password also length must be at least 6 character",
      });
      return;
    }

    setLoading(true);

    handleRegister(email, password)
      .then((res) => {
        updateUser({
          displayName: userName,
          photoURL: photoUrl,
        })
          .then((res) => toast.success("Registration Successful"))
          .catch((err) => toast.error(err.code));
        setLoading(false);
        e.target.reset();
        navigate("/");

        // send data to server

        fetch("https://study-hive-server-site.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(registerData),
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
          });
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  const [isShow, setIsShow] = useState(false);

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };
  //console.log(isShow)

  const handleGoogle = () => {
    handleGoogleLogin()
      .then((res) => {
        setLoading(false);
        // send data to server

        const user = res.user;

        const userData = {
          userName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        };

        fetch("https://study-hive-server-site.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
          });

        navigate("/");
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
            Register Form
          </h2>
          <form onSubmit={(e) => handleRegisterForm(e)} className="card-body">
            {/* user name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>
            {/* photo url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Enter URL"
                className="input input-bordered"
                required
              />
            </div>
            {/* email */}
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
            </div>
            {error.password && (
              <label className="label">
                <span className="label-text text-sm text-red-500">
                  {error.password}
                </span>
              </label>
            )}
            <div className="form-control mt-6">
              <button className="btn btn-neutral">Register</button>
            </div>
          </form>
          <p className="font-semibold text-center">
            Already Have An Account ?{" "}
            <Link to="/login" className="text-red-500">
              Login
            </Link>
          </p>
          <div className="mt-6 flex items-center gap-3 justify-center">
            <span className="text-xl">Sign Up with</span>{" "}
            <button
              onClick={handleGoogle}
              className="bg-gray-100 p-2 active:scale-105 transition-transform text-2xl rounded-full hover:bg-gray-300"
            >
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

export default Register;
