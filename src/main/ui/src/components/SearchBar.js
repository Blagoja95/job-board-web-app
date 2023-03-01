import React from "react";
import { Combobox } from "react-widgets";
import Button from "./Button";
const SearchBar = (props) => {
  return (
    <div className="flex flex-row gap-8 search-shadow border max-w-screen-lg m-auto -mt-9 py-7 md:py-10 px-6 border job-shadow rounded-3xl bg-white border-gray-light ">
      <Combobox placeholder={"Pretraga po lokaciji"} />

      <Combobox placeholder={"Pretraga po aražmanu"} />

      <input
        type="text w-24 border border-gray-light"
        placeholder="Pretraga po naslovu ..."
      ></input>

      <Button text={"Pretraži"} />
    </div>
  );
};

export default SearchBar;
