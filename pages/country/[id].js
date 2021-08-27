import React from "react";

const Country = () => {
  return <div></div>;
};

export default Country;

export const getServerSideProps = (context) => {
  console.log(context);
  return {
    props: {},
  };
};
