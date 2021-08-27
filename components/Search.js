import React from "react";
import { HiSearch } from "react-icons/hi";

const Search = ({ ...rest }) => {
  return (
    <div className=" flex items-center bg-gray-200 pl-4">
      <HiSearch className=" text-gray-400" />
      <input
        {...rest}
        className=" p-4 w-full h-full bg-transparent outline-none placeholder-gray-400"
      />
    </div>
  );
};

export default Search;
