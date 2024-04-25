import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function VenderHome() {
  const data = useSelector((state) => state.auth.user);
  const type = useSelector((state) => state.auth.userType);

  console.log("user Data on home page and type : ", data, type);

  return (
    <>
      <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
        <div className="hero-content flex-col lg:flex-row-reverse w-full ">
          <img
            src="/img/venderHero.svg"
            alt="search img"
            className="w-full md:w-2/3 lg:w-1/3"
          />
          <div className="grid justify-items-center md:justify-items-start p-8 space-y-4">
            <h1 className="text-3xl md:text-3xl lg:text-3xl font-bold font-jost text-sky-400">
              List yourself as a Vendor!
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-caveat">
              10+ categories available
            </h2>
            <p className="text-lg md:text-xl font-poppins text-justify">
              Increase your visibility and reach by listing on{" "}
              <span className="text-sky-400 hover:text-sky-600">
                Wedding Sparks
              </span>
            </p>
            <div className="flex justify-center md:justify-start">
              {" "}
              {/* Center button on md devices */}
              <Link
                to="/vendors/listing"
                className="text-white bg-blue-500 hover:bg-blue-800 hover:text-white rounded-full px-5 py-3 md:px-10 md:py-6 lg:px-8 lg:py-3 font-poppins text-xl"
              >
                List Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VenderHome;
