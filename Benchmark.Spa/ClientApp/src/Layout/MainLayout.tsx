import { Col, Layout, Row, Select, Space, Switch } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { useRootStore } from "../Stores/RootStoreContext";
import { Vm } from "./MainLayoutVm";
import {HomeOutlined} from '@ant-design/icons';
import { RouteNames } from "../Routes/RouteNames";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

interface LayoutProps {}

const { Option } = Select;
export const MainLayout = observer((props: React.PropsWithChildren<LayoutProps>) => {
  const { UIStore, routerStore } = useRootStore();
  const { t } = useTranslation();

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
                  <Select defaultValue={UIStore.gender} onChange={(value) => {UIStore.setGender(value)}}>
                    <Option value="Male">{t("male")}</Option>
                    <Option value="Female">{t("female")}</Option>
                    <Option value="Undecided">{t("undecided")}</Option>
                  </Select>
                  <Switch
                    checkedChildren={"Kg"}
                    unCheckedChildren={"Lbs"}
                    checked={UIStore.weight === "Kg"}
                    onChange={(weightChange: boolean) =>
                      Vm.OnWeightChange(weightChange, UIStore)
                    }
                  />
                  <Switch
                    checkedChildren={"Svenska"}
                    unCheckedChildren={"English"}
                    checked={UIStore.language === "Sv"}
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
});
