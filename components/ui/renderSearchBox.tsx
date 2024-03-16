"use client";
import { SearchInput } from "@/components/search-input";
import { useSearchContext } from "@/components/ui/searchContext";

export const RenderSearchBox = () => {
  const { isSearchVisible } = useSearchContext();
  return (
    <div>
      {/* Render SearchInput conditionally based on visibility */}
      {isSearchVisible && <SearchInput />}
    </div>
  );
};
