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
        <button
          onClick={() => setValueAndDirections("name")}
          className="heading_name flex justify-start items-center  text-left p-5 text-gray-400 font-medium flex-1"
        >
          <div>Name</div>
          <div>
            <ArrowSort direction={direction} />
          </div>
        </button>

        <button
          onClick={() => setValueAndDirections("population")}
          className="heading_population flex justify-center items-center p-5 text-gray-400 font-medium flex-1"
        >
          <div>Population</div>
          <div>
            <ArrowSort direction={direction} />
          </div>
        </button>
      </div>

      {orderCountries.map((country) => (
        <div
          key={country.alpha2Code}
          className="row hover:transform hover:-translate-y-1 ease-in-out
            transition duration-500 hover:shadow-xl
            flex p-5 text-center bg-gray-200 rounded-lg mb-4 shadow-lg font-medium"
        >
          <div className="name flex-1 text-left">
            <Link href={`/country/${country.alpha3Code}`}>{country.name}</Link>
          </div>
          <div className="population flex-1">{country.population}</div>
        </div>
      ))}
    </div>
  );
};

export default CountryTable;
