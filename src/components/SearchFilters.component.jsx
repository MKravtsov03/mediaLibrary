import { Button, Input, Popover, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { getYearsListOptions } from "../helpers";

export const SearchFilters = ({
  filters,
  updateFilters,
  actionGetSearchResults,
}) => {
  return (
    <div data-testid="searchFiltersComponent" className="container max-w-[600px] mb-8">
      <Input
        data-testid="searchInput"
        value={filters.searchString}
        onChange={(event) => updateFilters("searchString", event.target.value)}
        size="large"
        placeholder="Enter search query"
        prefix={<SearchOutlined />}
        className="mb-4"
      />
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="shrink-0">Year from:</span>
          <Select
            data-testid="yearMin"
            onChange={(value) => updateFilters("year_start", value)}
            options={getYearsListOptions()}
            placeholder="Select a year"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="shrink-0">Year to:</span>
          <Select
            data-testid="yearMax"
            onChange={(value) => updateFilters("year_end", value)}
            options={getYearsListOptions()}
            placeholder="Select a year"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Popover content={!filters.searchString && "Please enter search query"}>
          <Button
              data-testid="searchButton"
            disabled={!filters.searchString}
            type="primary"
            className={filters.searchString && `bg-blue-500 text-white`}
            size="large"
            onClick={() => actionGetSearchResults(filters)}
          >
            Search
          </Button>
        </Popover>
      </div>
    </div>
  );
};
