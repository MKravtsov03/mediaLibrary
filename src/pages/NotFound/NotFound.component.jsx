import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import { routes } from "../../routing/routes";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate(routes().main)} type="primary">
          Back Home
        </Button>
      }
    />
  );
};
