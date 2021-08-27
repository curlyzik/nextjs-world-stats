import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import CountryTable from "../components/CountryTable";
import Layout from "../components/Layout";
import Search from "../components/Search";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filterCountry = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className="p-6 min-h-screen grid grid-rows-3-auto">
      <Layout>
        <div className=" my-3 mx-0 text-gray-500">{countries.length} found</div>
        <Search
          placeholder="Filter by Name, Region or Subregion"
          onChange={onInputChange}
        />
        <CountryTable countries={filterCountry} />
      </Layout>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get("https://restcountries.eu/rest/v2/all");
  const { data } = res;
  return {
    props: {
      countries: data,
    },
  };
};
