import { Col, Drawer, Form, Layout, Row, Select, Switch } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { useRootStore } from "../Stores/RootStoreContext";
import { Vm } from "./MainLayoutVm";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { RouteNames } from "../Routes/RouteNames";
import { useTranslation } from "react-i18next";
import { observer, useLocalStore } from "mobx-react";

interface LayoutProps {}

const { Option } = Select;
export const MainLayout = observer(
  (props: React.PropsWithChildren<LayoutProps>) => {
    const { UIStore, routerStore } = useRootStore();
    const localStore = useLocalStore(() => ({
      showDrawer: false,
      setShowDrawer(value: boolean) {
        localStore.showDrawer = value;
      },
    }));
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
                  <SettingOutlined
                    style={{ fontSize: "16px", color: "white" }}
                    onClick={() => {
                      localStore.setShowDrawer(!localStore.showDrawer);
                    }}
                  />
                  <Drawer
                    title={t("settings")}
                    visible={localStore.showDrawer}
                    onClose={() => {
                      localStore.setShowDrawer(false);
                    }}
                  >
                    <Form layout={"vertical"}>
                      <Form.Item label={t("gender")} extra={t("gender_extra")}>
                        <Select
                          defaultValue={UIStore.gender}
                          onChange={(value) => {
                            UIStore.setGender(value);
                          }}
                        >
                          <Option value="Male">{t("male")}</Option>
                          <Option value="Female">{t("female")}</Option>
                          <Option value="Undecided">{t("undecided")}</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label={t("weight_measurement")} extra={t("weight_measurement_extra")}>
                        <Switch
                          checkedChildren={"Kg"}
                          unCheckedChildren={"Lbs"}
                          checked={UIStore.weight === "Kg"}
                          onChange={(weightChange: boolean) =>
                            Vm.OnWeightChange(weightChange, UIStore)
                          }
                        />
                      </Form.Item>
                      <Form.Item label={t("language")} extra={t("language_extra")}>
                        <Switch
                          checkedChildren={"Svenska"}
                          unCheckedChildren={"English"}
                          checked={UIStore.language === "Sv"}
                          onChange={(languageChange: boolean) =>
                            Vm.OnLanguageChange(languageChange, UIStore)
                          }
                        />
                      </Form.Item>
                    </Form>
                  </Drawer>
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
  }
);
