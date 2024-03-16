// Context file: searchContext.js
"use client";
import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [isSearchVisible, setSearchVisibility] = useState(false);

  const toggleSearch = () => {
    setSearchVisibility((prevVisibility) => !prevVisibility);
  };

  const contextValue = {
    isSearchVisible,
    toggleSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
