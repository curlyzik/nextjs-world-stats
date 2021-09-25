import axios from "axios";
import { useState } from "react";
import Card from "../components/CountryCard";
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
    <>
      <Layout>
        <div className="grid md:grid-cols-2">
          <div className=" my-3 mx-0 text-gray-400">
            {countries.length} countries found
          </div>
          <Search
            placeholder="Filter by Name, Region or Subregion"
            onChange={onInputChange}
          />
        </div>
        <Card countries={filterCountry} />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get("https://restcountries.com/v2/all");
  const { data } = res;
  return {
    props: {
      countries: data,
    },
  };
};
