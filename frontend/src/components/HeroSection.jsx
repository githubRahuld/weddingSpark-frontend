import React from "react";

function HeroSection() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <img
            src="/img/Peoplesearch-amico.svg"
            alt="search img"
            style={{ width: "500px", height: "500px" }}
          />
          <div className="grid justify-items-start  space-y-4 space-x-4">
            <h1 className="pl-5 text-5xl font-bold text-sky-400 ">
              Book Vendors Now!
            </h1>
            <h2 className="text-2xl">
              All your Search for Vendors In Your Local Ends Here!
            </h2>

            <p className="text-pretty hover:text-sky-400">
              Booking vendors near you became very easy with Wedding - Sparks We
              believe in making wedding easy!
            </p>
            <a
              href="/users/search"
              className="text-white bg-blue-500 hover:bg-blue-800 hover:text-white rounded-full px-5 py-2.5 "
            >
              Search Venders
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
