import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [vendorName, setVendorName] = React.useState("");
  const [vendorEmail, setVendorEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      from,
      to,
      location,
      vendorName,
      vendorEmail,
    });
  };

  // Get location object to access state data
  const userId = useLocation();
  const _id = userId.state.data;

  useEffect(() => {
    axios
      .post("http://localhost:3000/users/search", { _id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-lg shadow-lg m-4 w-full max-w-md font-poppins uppercase">
        <h2 className="font-poppins text-2xl font-bold mb-4 text-cyan-500 underline">
          Book Your Vendor Now
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold text-black">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full h-12"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold text-black">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full h-12"
              required
            />
          </div>
          <div>
            <label htmlFor="from" className="block font-semibold text-black">
              From:
            </label>
            <input
              type="date"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input w-full h-12"
              required
            />
          </div>
          <div>
            <label htmlFor="to" className="block font-semibold text-black">
              To:
            </label>
            <input
              type="date"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input w-full h-12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block font-semibold text-black"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              placeholder="Event Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input w-full h-12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="vendorName"
              className="block font-semibold text-black"
            >
              Vendor Name:
            </label>
            <input
              type="text"
              id="vendorName"
              placeholder="Vendor's Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="input w-full h-12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="vendorEmail"
              className="block font-semibold text-black"
            >
              Vendor Email:
            </label>
            <input
              type="email"
              id="vendorEmail"
              placeholder="Vendor's Email"
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
              className="input w-full h-12"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
