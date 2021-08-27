import axios from "axios";
import Head from "next/head";
import CountryTable from "../components/CountryTable";
import Layout from "../components/Layout";
import Search from "../components/Search";

export default function Home({ countries }) {
  console.log(countries);
  return (
    <div className="p-6 min-h-screen grid grid-rows-3-auto">
      <Layout>
        <div className=" my-3 mx-0 text-gray-500">{countries.length} found</div>
        <Search placeholder="filter by Name, Region or SubRegion" />
        <CountryTable countries={countries} />
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
