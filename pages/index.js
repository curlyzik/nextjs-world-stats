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
        <div className=" my-3 mx-0 text-gray-500">{countries.length} found</div>
        <Search
          placeholder="Filter by Name, Region or Subregion"
          onChange={onInputChange}
        />
        <Card countries={filterCountry} />
      </Layout>
    </>
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
