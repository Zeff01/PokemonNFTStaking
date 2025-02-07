import React, { useState } from "react";
import { GiArchiveResearch } from "react-icons/gi";

const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex items-center border bg-[#ff1a1a] rounded-full pl-3 pr-2 py-1 shadow-lg">
        <GiArchiveResearch className="w-6 h-6 text-white cursor-pointer mr-2" />
        <input
          type="text"
          className="rounded-full p-2 w-[250px] text-black focus:outline-none"
          placeholder="Search Pokemon"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Search;
