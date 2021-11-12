import { Col, Layout, Row, Space, Switch } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { useRootStore } from "../Stores/RootStoreContext";
import { Vm } from "./MainLayoutVm";
import {HomeOutlined} from '@ant-design/icons';
import { RouteNames } from "../Routes/RouteNames";

interface LayoutProps {}

export const MainLayout = (props: React.PropsWithChildren<LayoutProps>) => {
  const { UIStore, routerStore } = useRootStore();

  return (
    <Layout>
      <Header className="benchmark-fixed-header">
        <Row>
          <Col
            xs={24}
            sm={16}
            md={{ span: 14, offset: 5 }}
            lg={{ span: 10, offset: 7 }}
            xl={{ span: 10, offset: 7 }}
          >
            <div className="benchmark-language-bar">
              <HomeOutlined
                style={{ fontSize: "16px", color: "white" }}
                onClick={() => {
                  routerStore.goTo(RouteNames.Home);
                }}
              />
              <div>
                <Space>
                  <Switch
                    checkedChildren={"Kg"}
                    unCheckedChildren={"Lbs"}
                    onChange={(weightChange: boolean) =>
                      Vm.OnWeightChange(weightChange, UIStore)
                    }
                  />
                  <Switch
                    checkedChildren={"Svenska"}
                    unCheckedChildren={"English"}
                    onChange={(languageChange: boolean) =>
                      Vm.OnLanguageChange(languageChange, UIStore)
                    }
                  />
                </Space>
              </div>
            </div>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Content className="benchmark-content">
          <Row>
            <Col
              xs={24}
              sm={16}
              md={{ span: 14, offset: 5 }}
              lg={{ span: 10, offset: 7 }}
              xl={{ span: 10, offset: 7 }}
            >
              {props.children}
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};
