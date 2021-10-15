import React, { useState } from "react";
import { IoPeople } from "react-icons/io5";
import { AiOutlineAreaChart } from "react-icons/ai";
import Link from "next/link";
import Fade from "react-reveal/Fade";
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
    return <MdKeyboardArrowDown className="text-lg" />;
  } else {
    return <MdKeyboardArrowUp className="text-lg" />;
  }
};

const Card = ({ countries }) => {
  const [value, setValue] = useState();
  const [direction, setDirection] = useState();
  
  const changeDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    setValue(value);
    changeDirection();
  };

  const orderCountries = orderBy(countries, direction, value);
  return (
    <div>
      <div>
        <p className="text-center mt-8 font-bold">Sort By</p>
        <div className="flex items-center justify-around pt-5 text-gray-400 border-b pb-5">
          <button
            onClick={() => setValueAndDirection("name")}
            className="hover:text-gray-600 transition duration-300 flex gap-2 items-center"
          >
            <div>Name</div>
            <div>{value === "name" && <ArrowSort direction={direction} />}</div>
          </button>

          <button
            onClick={() => setValueAndDirection("population")}
            className="hover:text-gray-600 transition duration-300 flex gap-2 items-center"
          >
            <div>Population</div>
            <div>
              {value === "population" && <ArrowSort direction={direction} />}
            </div>
          </button>

          <button
            onClick={() => setValueAndDirection("area")}
            className="hover:text-gray-600 transition duration-300 hidden md:flex gap-2 items-center"
          >
            <div>Area</div>
            <div>{value === "area" && <ArrowSort direction={direction} />}</div>
          </button>

          <button
            onClick={() => setValueAndDirection("gini")}
            className="hover:text-gray-600 transition duration-300 hidden md:flex gap-2 items-center"
          >
            <div>Gini</div>
            <div>{value === "gini" && <ArrowSort direction={direction} />}</div>
          </button>
        </div>
      </div>
      <div className="grid justify-center items-center gap-x-9 gap-y-9 mt-8 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:justify-start md:items-stretch">
        {orderCountries.map((country) => (
          <Fade bottom cascade key={country.alpha3Code}>
            <div
              key={country.alpha3Code}
              className="rounded-xl overflow-hidden shadow-xl transform hover:shadow-2xl transition-shadow duration-500"
            >
              <div>
                <Link href={`/country/${country.alpha3Code}`}>
                  <a>
                    <img
                      src={country.flags.svg || country.flags.png}
                      alt=""
                      className="w-full"
                      loading="lazy"
                    />
                  </a>
                </Link>
              </div>
              <div className="p-6 flex flex-col">
                <h2 className="font-bold uppercase sm:text-2xl md:text-3xl md:capitalize">
                  <Link href={`/country/${country.alpha3Code}`}>
                    <a>{country.name}</a>
                  </Link>
                </h2>
                <ul className="flex flex-col gap-6 p-6">
                  <li className="flex justify-between items-center sm:text-sm lg:text-base">
                    <span className="flex justify-center items-center gap-3 mr-3">
                      <IoPeople className="text-xl" />
                      Population
                    </span>{" "}
                    <span className="font-semibold">
                      {!country.population
                        ? 0
                        : country.population
                        ? country.population
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
                          country.population
                        : 0}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex justify-center items-center gap-2">
                      <img
                        src="/gini-logo.svg"
                        alt=""
                        className="h-4 flex items-center mt-1 brightness-0 contrast-50"
                      />
                      Gini
                    </span>{" "}
                    <span className="font-semibold">{country.gini || 0} %</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex justify-center items-center gap-3">
                      <AiOutlineAreaChart className="text-xl" />
                      <span>
                        Area m<sup className=" text-[10px]">2</sup>
                      </span>
                    </span>{" "}
                    <span className="font-semibold">
                      {!country.area
                        ? 0
                        : country.area
                        ? country.area
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
                          country.area
                        : 0}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Card;
