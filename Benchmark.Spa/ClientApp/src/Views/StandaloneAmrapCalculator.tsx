import { Card, Col, Form, InputNumber, Row } from "antd";
import { observer, useLocalStore } from "mobx-react";
import { AmrapCalculator } from "../Components/ArmapCalculator";
import { BenchmarkGutter } from "../Global";

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

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  return (
    <Row gutter={BenchmarkGutter}>
      <Col span={24}>
        <Card title="Configuration">
          <Form {...formItemLayout} layout={"horizontal"}>
            <Form.Item
              label="Wod length in minutes"
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
            <Form.Item label="Reps per round" className="benchmark-label">
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
            <Form.Item label="Max number of rounds" className="benchmark-label">
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
        <Card title="Calculator">
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
