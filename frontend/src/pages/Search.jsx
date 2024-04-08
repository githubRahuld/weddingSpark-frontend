import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { Card, Selector } from "../components";
import { Form } from "react-router-dom";
import axios from "axios";

const App = () => {
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[100]);
  const [state, setState] = useState();
  let [city, setCity] = useState();

  const [vendors, setVendors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    city = city.name;
    axios
      .post("http://localhost:3000/users/search", {
        country,
        state,
        city,
      })
      .then((res) => {
        console.log("Searched vendors: ", res.data);
        setVendors(res.data.data);
        setSearchClicked(true);
      })
      .catch((err) => console.log("search failed: ", err));
  };

  useEffect(() => {
    if (!searchClicked) {
      axios
        .get("http://localhost:3000/users/all-vendors")
        .then((res) => {
          console.log("List of all vendors: ", res.data);
          setVendors(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [searchClicked]);

  return (
    <>
      <section className="min-h-screen px-3 grid place-items-center  selection:text-white bg-base-200 my-0">
        <div>
          <h1 className="pl-5 text-2xl font-bold text-white ">
            Find the vendor who is best fit for your wedding functions
          </h1>
        </div>
        <Form>
          <div className="flex flex-wrap gap-3 bg-teal-600 rounded-lg p-8">
            <div>
              <p className="text-black text-xl font-semibold">Country :</p>
              <Selector
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </div>
            {state && (
              <div>
                <p className="text-black text-xl font-semibold">State :</p>
                <Selector
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
            {city && (
              <div>
                <p className="text-black text-xl font-semibold">City :</p>
                <Selector
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
          </div>

          <button
            className="text-white bg-blue-500 hover:bg-blue-800 hover:text-white rounded-full px-10 py-2.5 my-5 text-xl "
            type="submit"
            onClick={handleSubmit}
          >
            Search
          </button>
        </Form>
      </section>

      <div className="grid grid-cols-2 gap-4">
        {vendors.length > 0 &&
          vendors.map((list) => (
            <Card
              key={list._id}
              _id={list._id}
              name={list.name}
              email={list.email}
              image={list.image}
              city={list.city}
              contact={list.contact}
              price={list.price}
              description={list.description}
            />
          ))}
      </div>
    </>
  );
};

export default App;
