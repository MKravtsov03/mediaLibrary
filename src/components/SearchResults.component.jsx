import { Card, Pagination, Empty } from "antd";

const { Meta } = Card;

export const SearchResults = ({
  searchResults,
  goToOverview,
  filters,
  paginationChange,
}) => {
  return (
    <div className="container" data-testid="searchResultsComponent">
      <div className="flex gap-4 flex-wrap justify-center">
        {searchResults && !searchResults?.items?.length ? (
          <Empty description="No items found for your query" />
        ) : (
          searchResults?.items?.map((item) => (
            <Card
              role="itemCard"
              key={item?.data[0]?.nasa_id}
              style={{ width: 270 }}
              onClick={() => goToOverview(item)}
              hoverable
            >
              <div className="overflow-hidden">
                <div className="flex items-center justify-center  h-[210px] mb-4">
                  <img
                    className="max-w-full h-auto max-h-full object-fill"
                    src={item?.links[0]?.href}
                    alt=""
                  />
                </div>
                <Meta title={item?.data[0].title} />
                <div className="text-gray-600 mt-2">
                  {item?.data[0].location?.trim() && (
                    <p className="w-full text-xs my-2 flex gap-1">
                      Location:
                      <span className="font-semibold">
                        {item?.data[0].location?.trim()}
                      </span>
                    </p>
                  )}
                  {item?.data[0].photographer?.trim() && (
                    <p className="w-full text-xs flex gap-1">
                      Photographer:
                      <span className="font-semibold">
                        {item?.data[0].photographer?.trim()}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      {searchResults?.items?.length ? (
        <div className="flex justify-center mt-6">
          <Pagination
            data-testid="searchResultsPagination"
            pageSizeOptions={[12, 24, 48, 96]}
            total={searchResults.total}
            defaultPageSize={filters.page_size}
            defaultCurrent={filters.page}
            onChange={(page, page_size) => paginationChange(page, page_size)}
          />
        </div>
      ) : null}
    </div>
  );
};
