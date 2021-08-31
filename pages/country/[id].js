import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const data = await res.json();
  return data;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  const getBorder = async () => {
    const border = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(border);
  };

  useEffect(() => {
    getBorder();
  }, []);

  return (
    <Layout>
      <div className="cointainer md:grid md:grid-cols-12 gap-6">
        <div className="container-left md:col-span-4">
          <div className="overview p-5 rounded-lg shadow-lg bg-gray-200">
            <img
              className="w-full rounded"
              src={country.flag}
              alt={country.name}
            />
            <h1 className="overview-name text-center text-4xl mb-0">
              {country.name}
            </h1>
            <div className="overview-region text-center text-sm font-light mt-1 mb-6">
              {country.region}
            </div>

            <div className="overview-number grid grid-cols-2 gap-4 text-center">
              <div className="overview-population">
                <div className="overview-value"> {country.population}</div>
                <div className="overview-label text-sm text-gray-500">
                  Population
                </div>
              </div>

              <div className="overview-area">
                <div className="overview-value"> {country.area}</div>
                <div className="overview-label">Area</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-right md:col-span-8">
          <div className="detail bg-gray-300 shadow-lg rounded-lg">
            <h4 className="detail-heading p-5 pb-0 m-0">Detail</h4>

            <div className="panel-row flex justify-between p-5 border-b border-gray-600">
              <div className="panel-label text-gray-500 font-medium">
                Capital
              </div>
              <div className="panel-value">{country.capital}</div>
            </div>

            <div className="panel-row flex justify-between p-5 border-b border-gray-600">
              <div className="panel-label text-gray-500 font-medium">
                Language
              </div>
              <div className="panel-value">
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className="panel-row flex justify-between p-5 border-b border-gray-600">
              <div className="panel-label text-gray-500 font-medium">
                Currencies
              </div>
              <div className="panel-value">
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className="panel-row flex justify-between p-5 border-b border-gray-600">
              <div className="panel-label text-gray-500 font-medium">
                Native name
              </div>
              <div className="panel-value">{country.nativeName}</div>
            </div>

            <div className="panel-row flex justify-between p-5 border-b border-gray-600">
              <div className="panel-label text-gray-500 font-medium">Gini</div>
              <div className="panel-value">{country.gini} %</div>
            </div>

            <div className="border p-5">
              <div className="panel-label text-gray-500 font-medium mb-5">
                Neighbouring Countries
              </div>

              <div className="row-border grid grid-cols-border gap-6 mt-3">
                {borders.map((border) => (
                  <div
                    key={border.alpha3Code}
                    className="border-country text-center"
                  >
                    <img
                      className="w-full rounded"
                      src={border.flag}
                      alt={border.name}
                    />
                    <div className="border-name">{border.name}</div>
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

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
