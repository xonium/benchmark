import { Col, Layout, Row, Switch } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { useRootStore } from "../Stores/RootStoreContext";
import { Vm } from "./MainLayoutVm";

interface LayoutProps {}

export const MainLayout = (props: React.PropsWithChildren<LayoutProps>) => {
  const { UIStore } = useRootStore();

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
              <Switch
                checkedChildren={"Svenska"}
                unCheckedChildren={"English"}
                onChange={(languageChange: boolean) =>
                  Vm.OnLanguageChange(languageChange, UIStore)
                }
              />
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
