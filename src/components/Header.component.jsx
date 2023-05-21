import { ReactSVG } from "react-svg";
import { Layout, Typography } from "antd";

const { Title } = Typography;
const { Header } = Layout;

export const HeaderComponent = () => {
  return (
    <Header data-testid="headerComponent" className="bg-white h-auto pt-[20px] mb-4 px-0">
      <div className="container flex justify-between items-center">
        <Title className="text-center">NASA Media Library</Title>
        <ReactSVG
          className="w-[80px] mb-4"
          src={"./icons/nasa-vector-logo.svg"}
        />
      </div>
    </Header>
  );
};
