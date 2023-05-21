import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { SearchFilters } from "./components/SearchFilters.component";
import { SearchPage } from "./pages/SearchPage/SearchPage.component";
import { useSearchSelector } from "./store/search/useSearchSelector";
import { SearchResults } from "./components/SearchResults.component";
import searchSlice, {
  actionGetSearchResultsSuccess,
  initialState as initialSearchState,
} from "./store/search/search.reducer";
import collectionSlice, {
  actionGetCollectionAssetsSuccess,
  actionSetCollectionData,
  initialState as initialCollectionState,
} from "./store/collection/collection.reducer";
import { OverviewPage } from "./pages/ShowPage/ShowPage.component";
import { useCollectionSelector } from "./store/collection/useCollectionSelector";

const SEARCH_RESULTS_MOCK = {
  items: [
    {
      data: [
        {
          title: "Title",
          location: "Location",
        },
      ],
      links: [{ href: "imageUrl" }],
    },
  ],
  total: 1,
};

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("./store/collection/useCollectionActions", () => ({
  useCollectionActions: () => ({
    actionSetCollectionData: jest.fn(),
    actionGetCollection: jest.fn(),
    actionClearCollection: jest.fn(),
    actionGetCollectionData: jest.fn(),
  }),
}));
jest.mock("./store/search/useSearchActions", () => ({
  useSearchActions: () => ({
    actionGetSearchResults: jest.fn(),
  }),
}));

jest.mock("./store/search/useSearchSelector", () => ({
  useSearchSelector: jest.fn(),
}));

jest.mock("./store/collection/useCollectionSelector", () => ({
  useCollectionSelector: jest.fn(),
}));

describe("Search Page", () => {
  test("renders Search page correctly", () => {
    useSearchSelector.mockImplementation(() => ({
      isLoading: false,
      error: null,
      searchResults: null,
    }));
    render(<SearchPage />);
    const searchResults = screen.getByTestId("searchResultsComponent");
    const searchFilters = screen.getByTestId("searchFiltersComponent");
    const searchResultsPagination = screen.queryByTestId(
      "searchResultsPagination"
    );
    const header = screen.getByTestId("headerComponent");
    expect(searchFilters).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(searchResults).toBeInTheDocument();
    expect(searchResultsPagination).not.toBeInTheDocument();
  });

  test("renders Search page loading state", () => {
    useSearchSelector.mockImplementation(() => ({
      isLoading: true,
      error: null,
      searchResults: null,
    }));
    render(<SearchPage />);
    const searchLoading = screen.getByTestId("searchLoading");
    const searchFilters = screen.getByTestId("searchFiltersComponent");
    const header = screen.getByTestId("headerComponent");
    expect(searchFilters).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(searchLoading).toBeInTheDocument();
  });

  test("renders search results with data", () => {
    render(
      <SearchResults
        searchResults={SEARCH_RESULTS_MOCK}
        goToOverview={jest.fn()}
        filters={{}}
        paginationChange={jest.fn()}
      />
    );

    const searchResults = screen.getByTestId("searchResultsComponent");
    const searchResultsPagination = screen.queryByTestId(
      "searchResultsPagination"
    );

    expect(searchResults).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(searchResultsPagination).toBeInTheDocument();
  });

  test("goToOverview fires after click on results item", () => {
    const goToOverview = jest.fn();
    render(
      <SearchResults
        searchResults={SEARCH_RESULTS_MOCK}
        goToOverview={goToOverview}
        filters={{}}
        paginationChange={jest.fn()}
      />
    );

    const searchResults = screen.getAllByRole("itemCard");
    fireEvent.click(searchResults[0]);
    expect(goToOverview).toBeCalledWith(SEARCH_RESULTS_MOCK.items[0]);
  });

  test("renders search results with empty data", () => {
    render(
      <SearchResults
        searchResults={[]}
        goToOverview={jest.fn()}
        filters={{}}
        paginationChange={jest.fn()}
      />
    );

    const searchResults = screen.getByTestId("searchResultsComponent");
    const searchResultsPagination = screen.queryByTestId(
      "searchResultsPagination"
    );

    expect(searchResults).toBeInTheDocument();
    expect(
      screen.getByText("No items found for your query")
    ).toBeInTheDocument();
    expect(searchResultsPagination).not.toBeInTheDocument();
  });
});

describe("Search filters", () => {
  test("renders SearchFilters correctly", () => {
    render(<SearchFilters filters={{}} updateFilters={() => null} />);
    const searchInput = screen.getByTestId("searchInput");
    const yearMin = screen.getByTestId("yearMin");
    const yearMax = screen.getByTestId("yearMax");
    const searchButton = screen.getByTestId("searchButton");
    expect(searchInput).toBeInTheDocument();
    expect(yearMin).toBeInTheDocument();
    expect(yearMax).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeDisabled();
  });

  test("able to type in search field", () => {
    render(<SearchFilters filters={{}} updateFilters={() => null} />);
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: "search query" } });
    expect(searchInput.value).toBe("search query");
  });

  test("update filters called with right value on input  change", () => {
    const updateFilters = jest.fn();
    render(<SearchFilters filters={{}} updateFilters={updateFilters} />);
    const searchInput = screen.getByTestId("searchInput");
    const searchButton = screen.getByTestId("searchButton");
    fireEvent.change(searchInput, { target: { value: "search query" } });
    fireEvent.click(searchButton);
    expect(updateFilters).toBeCalledWith("searchString", "search query");
  });
});

describe("Show Page", () => {
  test("render show page with data", () => {
    useCollectionSelector.mockImplementation(() => ({
      data: SEARCH_RESULTS_MOCK.items[0].data[0],
      assets: [{ href: "imageUrl~thumb" }, { href: "imageUrl2~thumb" }],
      isLoading: false,
      error: null,
    }));
    render(<OverviewPage />);
    const collectionContent = screen.getByTestId("collectionContent");
    expect(collectionContent).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getAllByRole("collectionImage").length).toBe(2);
  });

  test("render show page with error", () => {
    useCollectionSelector.mockImplementation(() => ({
      data: null,
      assets: [],
      isLoading: false,
      error: { status: 404, message: "Error occurred" },
    }));
    render(<OverviewPage />);
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });
});

describe("store tests", () => {
  test("searchResult updates correctly", () => {
    const data = {
      total: 1,
      items: SEARCH_RESULTS_MOCK.items,
    };

    const searchResultsUpdate = searchSlice(
      initialSearchState,
      actionGetSearchResultsSuccess(data)
    );

    expect(searchResultsUpdate).toStrictEqual({
      searchResults: data,
      isLoading: false,
      error: null,
    });
  });

  test("collection data updates correctly", () => {
    const data = {
      items: SEARCH_RESULTS_MOCK.items[0].data[0],
    };

    const collectionDataUpdate = collectionSlice(
      initialCollectionState,
      actionSetCollectionData(data)
    );

    expect(collectionDataUpdate).toStrictEqual({
      data: data,
      assets: [],
      isLoading: false,
      error: null,
    });
  });

  test("collection assets updates correctly", () => {
    const assets = [{ href: "img-1" }, { href: "img-2" }];

    const collectionAssetsUpdate = collectionSlice(
      initialCollectionState,
      actionGetCollectionAssetsSuccess(assets)
    );

    expect(collectionAssetsUpdate).toStrictEqual({
      data: null,
      assets: assets,
      isLoading: false,
      error: null,
    });
  });
});
