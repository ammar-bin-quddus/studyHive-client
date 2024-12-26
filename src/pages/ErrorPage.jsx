import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <DotLottieReact className="w-[800px] h-[500px]" src='./error.json' loop autoplay />
      <Link to="/"><button className="btn btn-neutral">Go Back</button></Link>
    </div>
  );
};

export default ErrorPage;
