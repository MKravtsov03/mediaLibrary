import { useEffect } from "react";
import { Button, Layout, Skeleton, Result } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { HeaderComponent } from "../../components/Header.component";
import { routes } from "../../routing/routes";

import { useCollectionActions } from "../../store/collection/useCollectionActions";
import { useLocation, useNavigate } from "react-router";
import { useCollectionSelector } from "../../store/collection/useCollectionSelector";
import { getUniqueImagesFromCollection } from "../../helpers";

const { Content } = Layout;

export const OverviewPage = () => {
  const {
    actionGetCollection,
    actionClearCollection,
    actionGetCollectionData,
  } = useCollectionActions();

  const location = useLocation();
  const navigate = useNavigate();

  const { assets, data, isLoading, error } = useCollectionSelector();

  useEffect(() => {
    const nasa_id = location?.pathname?.split("/")?.pop();
    if (!data) {
      actionGetCollectionData(nasa_id);
    }
    actionGetCollection(nasa_id);
    return () => actionClearCollection();
  }, []);

  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content className="container py-10">
        <Button
          onClick={() => navigate(routes().main)}
          className="flex items-center"
          icon={<ArrowLeftOutlined />}
          type="link"
        >
          Back to search
        </Button>
        {error && (
          <Result
            status={error.status}
            title={error.status}
            subTitle={error.message}
            extra={
              <Button
                onClick={() => navigate(routes().main)}
                className="bg-blue-500 text-white"
                type="primary"
              >
                Back Home
              </Button>
            }
          />
        )}
        {isLoading ? (
          <div className="container ">
            <div className="flex gap-4 flex-wrap justify-center">
              <Skeleton style={{ width: 900 }} active />
            </div>
          </div>
        ) : (
          <>
            <div data-testid="collectionContent" className="my-4">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">{data?.title}</h1>
                {data?.date_created && new Date(data?.date_created) && (
                  <p>{new Date(data?.date_created)?.toLocaleDateString()}</p>
                )}
              </div>
              <div className="flex gap-6 justify-center mb-6">
                {data?.location && (
                  <p className="text-sm font-bold">
                    <span className="text-gray-600 font-normal">Location:</span>{" "}
                    {data?.location}
                  </p>
                )}
                {data?.photographer && (
                  <p className="text-sm font-bold">
                    <span className="text-gray-600 font-normal">
                      Photographer:
                    </span>{" "}
                    {data?.photographer}
                  </p>
                )}
              </div>

              {data?.keywords?.length ? (
                <div className="mb-6 text-center">
                  <p className="text-gray-600 font-normal mb-2">Keywords:</p>
                  <div className="flex gap-1.5 justify-center text-xs font-semibold flex-wrap">
                    {data?.keywords?.map((keyword) => (
                      <span>#{keyword}</span>
                    ))}
                  </div>
                </div>
              ) : null}

              <p
                className="text-center mb-8"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              {getUniqueImagesFromCollection(assets).map((url) => (
                <img role="collectionImage" alt="" src={url} />
              ))}
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
};
