import React from "react";
import { Link } from "react-router-dom";
import { ImageCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const data = useSelector((state) => state.auth.user);
  const type = useSelector((state) => state.auth.userType);
  console.log("user Data on home page and type : ", data, type);
  return (
    <>
      {/* carousel */}
      <div className="carousel rounded-box">
        <ImageCard src="/img/carousel/Venue.jpg" />
        <ImageCard src="/img/carousel/dhool.jpg" />
        <ImageCard src="/img/carousel/photographer.jpg" />
        <ImageCard src="/img/carousel/travel.jpg" />
        <ImageCard src="/img/carousel/designer.jpg" />
        <ImageCard src="/img/carousel/dj.jpg" />
        <ImageCard src="/img/carousel/catering.jpg" />
      </div>

      {/* Hero section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex flex-col lg:flex-row-reverse">
          <img
            src="/img/Peoplesearch-amico.svg"
            alt="search img"
            className="w-full max-h-[500px] md:max-h-[500px] lg:max-h-[600px] object-cover md:w-3/5 lg:w-1/2"
          />
          <div className="flex flex-col space-y-4 px-4 lg:pl-16 lg:pr-8">
            <h1 className="text-5xl font-bold text-sky-400 text-center lg:text-left font-jost">
              Book Vendors Now!
            </h1>
            <h2 className="text-2xl text-center lg:text-left font-caveat">
              All your Search for Vendors In Your Local Ends Here!
            </h2>
            <p className="text-pretty hover:text-sky-400 text-center lg:text-left font-poppins">
              Booking vendors near you became very easy with Wedding - Sparks We
              believe in making wedding easy!
            </p>
            <Link
              to="/users/search"
              className="text-white bg-blue-500 hover:bg-blue-800 hover:text-white rounded-full px-5 py-2.5 self-center lg:self-start"
            >
              Search Venders
            </Link>
          </div>
        </div>
      </div>

      {/* Our services */}
      <div className="bg-base-200">
        <h1 className="pl-5 text-5xl font-bold text-amber-500 underline font-jost">
          Our Services
        </h1>
      </div>
      <div className="hero  bg-base-200 ">
        <div className="hero-content flex flex-col lg:flex-row items-center justify-center lg:justify-start">
          <img
            src="/img/service-user.svg"
            alt="service img"
            className="w-full md:w-auto lg:w-1/2 xl:w-2/5 mb-8 md:mb-0"
          />
          <div className="flex flex-col items-center lg:items-start justify-center lg:justify-center lg:ml-8 xl:ml-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-400 mb-4 font-jost">
              For Local User
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl mb-4 font-caveat">
              Searching Catering, DJ, Sound & Decoration Explore Now!
            </h2>
            <p className="text-pretty hover:text-sky-400 text-center lg:text-left font-poppins">
              We take care of all the things so that you can enjoy your wedding.
              Book the vendors now!
            </p>
            <Link
              to="/users/search"
              className="text-white bg-blue-500 hover:bg-blue-800 hover:text-white rounded-full px-5 py-2.5 text-sm md:text-base lg:text-lg mt-4"
            >
              Search Vendors
            </Link>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-start">
          <img
            src="/img/service-vender.svg"
            alt="service img"
            className="w-full md:w-auto lg:w-1/2 xl:w-2/5 mb-8 md:mb-0"
          />
          <div className="flex flex-col items-center lg:items-start justify-center lg:justify-center lg:mr-8 xl:mr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-400 mb-4 font-jost">
              For Vendor
            </h1>
            <h2 className="text-2xl text-center lg:text-left font-caveat">
              List yourself as Caterer, DJ, Sound & Decorator and many more.
            </h2>
            <p className="text-pretty hover:text-sky-400 text-center lg:text-left font-poppins mt-4">
              We take care of all the things so that you can expand your
              business. List yourself now!
            </p>
            <Link
              to="/vendors/login"
              className="text-white bg-blue-500 hover:bg-blue-800 hover:text-white rounded-full px-5 py-2.5 text-sm md:text-base lg:text-lg mt-4"
            >
              List as Vendor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
