import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);

  const data = await res.json();
  return data;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  const getBorder = async () => {
    if (country.borders) {
      const border = await Promise.all(
        country.borders.map((border) => getCountry(border))
      );
      setBorders(border);
    }
  };

  useEffect(() => {
    getBorder();
  }, [country]);

  return (
    <Layout>
      <div className="md:grid md:grid-cols-12 gap-6">
        <div className="md:col-span-4 mb-6">
          <div className="rounded-lg shadow-md md:shadow-2xl overflow-hidden">
            <img
              className="w-full"
              src={country.flags[0] || country.flags[1]}
              alt={country.name}
              loading="lazy"
            />
            <div className="p-5">
              <h1 className="text-center text-4xl font-bold mb-0">
                {country.name}
              </h1>
              <div className="text-center text-sm font-light mt-1 mb-6">
                {country.region}
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="">
                  <div className="font-semibold text-2xl">
                    {" "}
                    {!country.population
                      ? 0
                      : country.population
                      ? country.population ||
                        country.population
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                  </div>
                  <div className="text-gray-500">Population</div>
                </div>

                <div className="">
                  <div className="font-semibold text-2xl">
                    {" "}
                    {!country.area
                      ? 0
                      : country.area
                      ? country.area ||
                        country.area
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : 0}
                  </div>
                  <div className="text-gray-500">Area</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="shadow-lg rounded-lg">
            <h4 className="p-5 pb-0 m-0 text-4xl font-semibold">Detail</h4>

            <div className="flex justify-between p-5 border-b  gap-4">
              <div className="text-gray-500">Capital</div>
              <div className="font-semibold">
                {country.capital || "No Capital"}
              </div>
            </div>

            <div className=" flex justify-between p-5 border-b  gap-4">
              <div className="panel-label text-gray-500">Language</div>
              <div className="font-semibold">
                {country.languages &&
                  country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className=" flex justify-between p-5 border-b  gap-4">
              <div className="panel-label text-gray-500">Currencies</div>
              <div className="font-semibold">
                {(country.currencies &&
                  country.currencies.map(({ name }) => name).join(", ")) ||
                  "No Currency"}
              </div>
            </div>

            <div className=" flex justify-between p-5 border-b  gap-4">
              <div className="panel-label text-gray-500">Native name</div>
              <div className="font-semibold">{country.nativeName}</div>
            </div>

            <div className=" flex justify-between p-5 border-b  gap-4">
              <div className="panel-label text-gray-500">Gini</div>
              <div className="font-semibold">{country.gini || 0} %</div>
            </div>

            <div className="p-5">
              <div className="text-gray-500 mb-5">Neighbouring Countries</div>

              <div className="grid grid-cols-border gap-6 mt-3">
                {borders.map((border) => (
                  <div
                    key={border.alpha3Code}
                    className="border-country text-center"
                  >
                    <Link href={`/country/${border.alpha3Code}`}>
                      <a>
                        <img
                          className="w-full rounded"
                          src={border.flags[0] || border.flags[1]}
                          alt={border.name}
                          loading="lazy"
                        />
                      </a>
                    </Link>
                    <Link href={`/country/${border.alpha3Code}`}>
                      <a className=" mt-3">{border.name}</a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: {
      id: country.alpha3Code,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};

export default Country;
