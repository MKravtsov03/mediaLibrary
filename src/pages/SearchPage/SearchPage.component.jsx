import { useEffect, useState } from "react";
import { Layout, Skeleton } from "antd";
import { useNavigate } from "react-router";

import { useSearchSelector } from "../../store/search/useSearchSelector";
import { routes } from "../../routing/routes";
import { HeaderComponent } from "../../components/Header.component";
import { SearchFilters } from "../../components/SearchFilters.component";
import { SearchResults } from "../../components/SearchResults.component";
import { useCollectionActions } from "../../store/collection/useCollectionActions";
import { useSearchActions } from "../../store/search/useSearchActions";

const { Content } = Layout;

export const SearchPage = () => {
  const [filters, setfilters] = useState({
    searchString: "",
    year_start: "",
    year_end: "",
    page: 1,
    page_size: 12,
  });

  const navigate = useNavigate();

  const { actionSetCollectionData } = useCollectionActions();

  const { searchResults, isLoading, error } = useSearchSelector();

  const { actionGetSearchResults } = useSearchActions();

  const goToOverview = (item) => {
    actionSetCollectionData(item?.data[0]);
    navigate(routes({ id: item?.data[0].nasa_id }).overview);
  };

  useEffect(() => {}, [filters.page, filters.page_size]);

  const updateFilters = (filter, value) => {
    setfilters((prev) => {
      return { ...prev, [filter]: value };
    });
  };

  const paginationChange = (page, page_size) => {
    updateFilters("page", page);
    updateFilters("page_size", page_size);
    actionGetSearchResults({ ...filters, page, page_size });
  };

  return (
    <Layout className="min-h-screen">
      <HeaderComponent role="header" />
      <Content className="py-10">
        <SearchFilters
          actionGetSearchResults={actionGetSearchResults}
          filters={filters}
          updateFilters={updateFilters}
        />
        {isLoading ? (
          <div className="container" data-testid="searchLoading">
            <div className="flex gap-4 flex-wrap justify-center">
              {new Array(4).fill("").map(() => (
                <Skeleton style={{ width: 270 }} active />
              ))}
            </div>
          </div>
        ) : (
          <SearchResults
            paginationChange={paginationChange}
            filters={filters}
            searchResults={searchResults}
            goToOverview={goToOverview}
          />
        )}
      </Content>
    </Layout>
  );
};
