import React, { createContext, useContext, useMemo } from "react";

export const FilterContext = createContext<any>(null);

export const useFilter = (name: any) => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context?.[name]?.[0] || null;
};
