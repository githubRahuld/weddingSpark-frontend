import React from "react";

function VenderHome() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <img
            src="/img/venderHero.svg"
            alt="search img"
            style={{ width: "500px", height: "500px" }}
          />
          <div className="grid justify-items-start  space-y-4 space-x-4">
            <h1 className="pl-5 text-5xl font-bold text-sky-400 ">
              List yourself as Vendor!
            </h1>
            <h2 className="text-2xl">10+ categories are available</h2>

            <p className="text-pretty ">
              Increase your visiblity and reach by listing on{" "}
              <span className="hover:text-sky-400 ">Wedding Sparks</span>
            </p>
            <a
              href="/venders/list"
              className="text-white bg-blue-500 hover:bg-blue-800 hover:text-white rounded-full px-5 py-2.5"
            >
              List Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default VenderHome;
