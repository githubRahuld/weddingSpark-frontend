import React from "react";

export default function Card({
  className,
  image,
  city,
  contact,
  price,
  description,
}) {
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl p-4">
        <figure>
          <img src={image} alt="Image" className="w-full h-auto" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-blue-500">
            City: <span className="text-slate-200">{city}</span>
          </h2>
          <h2 className="card-title text-green-500">
            Contact: <span className="text-slate-200">{contact}</span>
          </h2>
          <h2 className="card-title text-purple-500">
            Price: <span className="text-slate-200">₹{price}</span>
          </h2>
          <h2 className="card-title text-purple-500">
            About:{" "}
            <span className="text-slate-200">
              <p>{description}</p>
            </span>
          </h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Book</button>
          </div>
        </div>
      </div>
    </>
  );
}
