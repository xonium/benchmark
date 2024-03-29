import { Card, Col, Form, InputNumber, Row } from "antd";
import { observer, useLocalStore } from "mobx-react";
import { AmrapCalculator } from "../Components/ArmapCalculator";
import { BenchmarkGutter } from "../Global";
import { useTranslation } from "react-i18next";

export const StandaloneAmrapCalculator = observer(() => {
  const localStore = useLocalStore(() => ({
    wodLengthInMinutes: 10,
    repsPerRound: 50,
    maxNumberOfRounds: 4,
    setWodLengthInMinutes(value: number) {
      localStore.wodLengthInMinutes = value;
    },
    setRepsPerRound(value: number) {
      localStore.repsPerRound = value;
    },
    setMaxNumberOfRounds(value: number) {
      localStore.maxNumberOfRounds = value;
    },
  }));

  const { t } = useTranslation();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  return (
    <Row gutter={BenchmarkGutter}>
      <Col span={24}>
        <Card title={t("configuration")}>
          <Form {...formItemLayout} layout={"horizontal"}>
            <Form.Item
              label={t("wod_length_in_minutes")}
              className="benchmark-label"
            >
              <InputNumber
                min={1}
                max={200}
                defaultValue={localStore.wodLengthInMinutes}
                onChange={(value: number) => {
                    value === null
                    ? localStore.setWodLengthInMinutes(20)
                    : localStore.setWodLengthInMinutes(value);                    
                }}
              />
            </Form.Item>
            <Form.Item label={t("reps_per_round")} className="benchmark-label">
              <InputNumber
                min={1}
                max={100000}
                defaultValue={localStore.repsPerRound}
                onChange={(value: number) => {
                  value === null
                    ? localStore.setRepsPerRound(50)
                    : localStore.setRepsPerRound(value);
                }}
              />
            </Form.Item>
            <Form.Item label={t("max_number_of_rounds")} className="benchmark-label">
              <InputNumber
                min={1}
                max={100000}
                defaultValue={localStore.maxNumberOfRounds}
                onChange={(value: number) => {
                    value === null
                    ? localStore.setMaxNumberOfRounds(4)
                    : localStore.setMaxNumberOfRounds(value);
                }}
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Card title={t("calculator")}>
          <AmrapCalculator
            wodLengthInSeconds={localStore.wodLengthInMinutes * 60}
            repsPerRound={localStore.repsPerRound}
            maxNumberOfRounds={localStore.maxNumberOfRounds}
          />
        </Card>
      </Col>
    </Row>
  );
});
