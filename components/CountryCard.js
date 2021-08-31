import React from "react";
import { IoPeople } from "react-icons/io5";
import { AiOutlineAreaChart } from "react-icons/ai";
import Link from "next/link";

const Card = ({ countries }) => {
  return (
    <div>
      <div className="grid justify-center items-center gap-x-9 gap-y-9 mt-8 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:justify-start md:items-stretch">
        {countries.map((country) => (
          <div
            key={country.alpha3Code}
            className="rounded-xl overflow-hidden shadow-xl transform hover:shadow-2xl transition-shadow duration-500"
          >
            <div>
              <Link href={`country/${country.alpha3Code}`}>
                <a>
                  <img
                    src={country.flag}
                    alt=""
                    className="w-full"
                    loading="lazy"
                  />
                </a>
              </Link>
            </div>
            <div className="p-6 flex flex-col">
              <h2 className="font-bold uppercase sm:text-2xl md:text-3xl md:capitalize">
                <Link href={`country/${country.alpha3Code}`}>
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
                    {country.population.toLocaleString("en-US")}
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
                  <span className="font-semibold">{country.area}</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
