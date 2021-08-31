import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const orderBy = (countries, direction, value) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const ArrowSort = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return <MdKeyboardArrowDown className="ml-2" />;
  } else {
    return <MdKeyboardArrowUp className="ml-2" />;
  }
};

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const changeDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirections = (value) => {
    changeDirection();
    setValue(value);
  };

  const orderCountries = orderBy(countries, direction, value);
  return (
    <div>
      <div className="flex">
        <div className="heading_flag flex justify-start items-center  text-left p-5 text-gray-400 font-medium flex-4"></div>
        <button
          onClick={() => setValueAndDirections("name")}
          className="heading_name flex justify-start items-center divide text-left p-5 text-gray-400 font-medium flex-4"
        >
          <div>Name</div>
          <div>{value === "name" && <ArrowSort direction={direction} />}</div>
        </button>

        <button
          onClick={() => setValueAndDirections("population")}
          className="heading_population flex justify-center items-center p-5 text-gray-400 font-medium flex-4"
        >
          <div>Population</div>
          <div>
            {value === "population" && <ArrowSort direction={direction} />}
          </div>
        </button>

        <button
          onClick={() => setValueAndDirections("area")}
          className="hidden heading_area md:flex justify-center items-center p-5 text-gray-400 font-medium flex-4"
        >
          <div>
            Area (km<sup>2</sup>)
          </div>
          <div>{value === "area" && <ArrowSort direction={direction} />}</div>
        </button>

        <button
          onClick={() => setValueAndDirections("gini")}
          className="hidden heading_gini md:flex justify-center items-center p-5 text-gray-400 font-medium flex-4"
        >
          <div>Gini</div>
          <div>{value === "gini" && <ArrowSort direction={direction} />}</div>
        </button>
      </div>

      {orderCountries.map((country) => (
        <div
          key={country.alpha2Code}
          className="row hover:transform hover:-translate-y-1 ease-in-out
            transition duration-500 hover:shadow-xl justify-center items-center
            flex p-5 text-center bg-gray-200 rounded-lg mb-4 shadow-lg font-medium"
        >
          <div className="flag flex-4 flex-grow-1 max-w-[100px] mr-2">
            <img className="w-full rounded-sm" src={country.flag} alt={country.name} />
          </div>
          <div className="name flex-4 text-left">
            <Link href={`/country/${country.alpha3Code}`}>{country.name}</Link>
          </div>
          <div className="population flex-4">{country.population}</div>
          <div className="area flex-4">{country.area || 0}</div>
          <div className="gini flex-4">{country.gini || 0}%</div>
        </div>
      ))}
    </div>
  );
};

export default CountryTable;
