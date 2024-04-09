import React, { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/get-booking")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error while fetching booking data: ", err);
      });
  }, []);

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg text-gray-800">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Booking Information
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{booking.name}</p>
            </div>
            <div>
              <p className="font-semibold">Location:</p>
              <p>{booking.location}</p>
            </div>
            <div>
              <p className="font-semibold">From Date:</p>
              <p>{new Date(booking.fromDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">To Date:</p>
              <p>{new Date(booking.toDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Vendor Name:</p>
              <p>{booking.vendorName}</p>
            </div>
            <div>
              <p className="font-semibold">Vendor Email:</p>
              <p>{booking.vendorEmail}</p>
            </div>
            <div colSpan="2">
              <p className="font-semibold">Confirmation Status:</p>
              <p>{booking.confirmationStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
