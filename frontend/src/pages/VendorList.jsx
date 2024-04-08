import React from "react";
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { Selector } from "../components";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { Button, Label } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = [
  "Venue",
  "Attire Retailer",
  "Caterer",
  "Entertainment",
  "Florist/Decorator",
  "Wedding Planner/Coordinator",
  "Baker",
  "Transportation",
  "Jeweler",
  "Designer",
];

function VenderList() {
  const userEmail = useSelector((state) => state.auth.user.user.email);

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[100]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setcontact] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // wheneven the country and state change then state and city data will set
  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  //to intialise state
  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  //to initailse city
  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", userEmail);
    formData.append("category", category);
    formData.append("country", country.name);
    formData.append("state", state.name);
    formData.append("city", city.name);
    formData.append("price", price);
    formData.append("contact", contact);
    formData.append("description", description);
    formData.append("image", image);

    console.log("Form Data : ", formData);

    axios
      .post("http://localhost:3000/vendors/listing", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      })
      .then((res) => {
        console.log("res: ", res);
        console.log(formData);

        navigate("/vendors/home");
      })
      .catch((err) => console.log("error while listing: ", err.message));
  };

  return (
    <>
      <form
        className="flex justify-center max-w-md flex-col gap-4 py-10"
        encType="multipart/form-data"
      >
        {/* email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" value={userEmail} readOnly />
        </label>

        {/* Vendor name */}
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className=" w-full max-w-xs"
            placeholder="Rahul"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Address */}
        <select
          className="select select-bordered w-full max-w-xs mt-10"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled selected>
            Select Category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Label htmlFor="address" value="Select Address " />
        <div className="flex flex-col gap-4">
          <div>
            <Selector
              data={countryData}
              selected={country}
              setSelected={setCountry}
              className={"bg-gray-700"}
            />
          </div>
          <div>
            {state && (
              <Selector
                data={stateData}
                selected={state}
                setSelected={setState}
                className={"bg-gray-700"}
              />
            )}
          </div>
          <div>
            {city && (
              <Selector
                data={cityData}
                selected={city}
                setSelected={setCity}
                className={"bg-gray-700"}
              />
            )}
          </div>
        </div>

        <label className="input input-bordered flex items-center gap-2">
          Price
          <input
            type="Number"
            className=" w-full max-w-xs"
            placeholder=" ₹/Day"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        {/* phone number */}
        <Label htmlFor="number" value="Phone Number" />
        <PhoneInput
          placeholder="Enter phone number"
          value={contact}
          onChange={setcontact}
          className="bg-gray-700 rounded-md"
        />
        {/* upload image */}
        <Label htmlFor="image" value="Upload Photos" />
        <input
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* description */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-text"
          >
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default VenderList;
