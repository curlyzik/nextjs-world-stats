import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const orderBy = (countries, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? 1 : -1
    );
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? -1 : 1
    );
  }
};

const SortArrows = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className="heading-arrow flex items-center justify-center">
        <MdKeyboardArrowDown />
      </div>
    );
  } else {
    return (
      <div className="heading-arrow flex items-center justify-center">
        <MdKeyboardArrowUp />
      </div>
    );
  }
};

const CountryTable = ({ countries }) => {
  const orderCountries = orderBy(countries, "desc");

  return (
    <div>
      <div className="flex ">
        <button className="heading_name flex justify-start items-center  text-left p-5 text-gray-400 font-medium flex-1">
          <div>Name</div>
          <SortArrows />
        </button>

        <button className="heading_population flex justify-center items-center p-5 text-gray-400 font-medium flex-1">
          <div>Population</div>
          <SortArrows direction="desc" />
        </button>
      </div>

      {orderCountries.map((country) => (
        <div
          className="row hover:transform hover:-translate-y-1 ease-in-out
            transition duration-500 hover:shadow-xl
            flex p-5 text-center bg-gray-200 rounded-lg mb-4 shadow-lg font-medium"
        >
          <div className="name flex-1 text-left">{country.name}</div>
          <div className="population flex-1">{country.population}</div>
        </div>
      ))}
    </div>
  );
};

export default CountryTable;
