import React, { useState } from "react";
import { GiArchiveResearch } from "react-icons/gi";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  return (
    <div className="ml-5 w-full text-white flex items-center ">
      <div className="rounded-full  flex border bg-[#ff1a1a] pl-2  flex-between " >
        <GiArchiveResearch className="w-[40px] h-[40px] rounded-full cursor-pointer mr-1 "/>
        <input
          type="text"
          className="rounded-full p-2 w-[250px]"
          placeholder="Search Pokemon "
          name="search-pokemon"
          onChange={(e) => {
            setSearchValue(e.target.value.trim());
            setShowSuggestion(true);
          }}
        />
      </div>
    </div>
  );
};

export default Search;
