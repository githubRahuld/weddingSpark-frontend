import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({
  _id,
  name,
  email,
  images,
  city,
  contact,
  price,
  description,
}) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/users/booking", { state: { data: _id } });
  };

  return (
    <div className="card lg:card-side shadow-xl p-4 font-poppins bg-neutral-900">
      <figure className="mb-4 lg:mb-0 lg:w-full lg:mr-0">
        <img src={images[0]} alt="Image" className="w-full h-auto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-rose-500">
          Name: <span className="text-slate-200">{name}</span>
        </h2>
        <h2 className="card-title text-blue-500">
          Email: <span className="text-slate-200">{email}</span>
        </h2>
        <h2 className="card-title text-blue-500">
          City: <span className="text-slate-200">{city}</span>
        </h2>
        <h2 className="card-title text-green-500">
          Contact: <span className="text-slate-200">{contact}</span>
        </h2>
        <h2 className="card-title text-purple-500">
          Price:{" "}
          <span className="text-slate-200">
            ₹{price} <span className="font-dancing">Per day</span>
          </span>
        </h2>
        <h2 className="card-title text-purple-500">
          About:{" "}
          <span className="text-slate-200">
            <p>{description}</p>
          </span>
        </h2>
        <div className="card-actions justify-start">
          <button
            onClick={handleBooking}
            className="btn text-white bg-red-600 hover:bg-red-700 md:justify-center mx-auto md:mx-0"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
