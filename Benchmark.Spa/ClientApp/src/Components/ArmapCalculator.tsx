import {
  Avatar,
  Col,
  Form,
  InputNumber,
  Row,
  Statistic,
  Table,
} from "antd";
import { BenchmarkGutter } from "../Global";
import { IAthleteReps } from "../Types/types";

export interface IAmrapCalculatorProps {
  rounds: number;
  reps: number;
  wodLengthInSeconds: number;
  repsPerRound: number;
  maxNumberOfRounds: number;
  onRoundsChange: (value: number) => void;
  onRepsChange: (value: number) => void;
  athleteReps?: IAthleteReps[] | undefined;
}

export const AmrapCalculator = (props: IAmrapCalculatorProps) => {
  const fmtMSS = (s: number) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  };

  const generateDataSource = (repsPerThirtySeconds: number) => {
    var dataSource = [];

    for (let index = 1; index <= 10; index++) {
      dataSource.push({
        key: index,
        time: fmtMSS(index * 30),
        round: Math.floor((repsPerThirtySeconds * index) / 60),
        reps: Math.ceil((repsPerThirtySeconds * index) % 60),
        totalReps: Math.ceil(repsPerThirtySeconds * index),
      });
    }

    return dataSource;
  };

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Round",
      dataIndex: "round",
      key: "round",
    },
    {
      title: "Reps",
      dataIndex: "reps",
      key: "reps",
    },
    {
      title: "Total reps",
      dataIndex: "totalReps",
      key: "totalReps",
    },
  ];

  const totalReps = (props: IAmrapCalculatorProps) => props.rounds * props.repsPerRound + props.reps;

  const repsStyle = { display: "inline-block", width: "20%", borderLeft: "1px solid #f0f0f0", padding: "3px" };
  const repNumberStyle = { marginBottom: "4px" };
  const repsBorderStyle = { borderTop: "3px solid #d3adf7" };

  const fetchAthletes = (reps: number, athleteReps: IAthleteReps[]) => {
    var filtered = athleteReps.filter((x) => x.Reps === reps);

    if (filtered.length === 0) {
      return (
        <div className="ant-avatar-group">
          <span className="ant-avatar ant-avatar-square ant-avatar-image"></span>
        </div>
      )
    }

    return (
      <Avatar.Group maxCount={1}>
        {filtered.map((x) => {
          return x.Athletes.map((a) => {
            return <Avatar alt={a.Name} shape="square" src={a.ImageSrc} />;
          })
        })}
      </Avatar.Group>
    )
  };

  return (
    <>
      <Row gutter={BenchmarkGutter}>
        <Col span={24}>
          <Form layout="inline">
            <Form.Item label="Rounds" className="benchmark-label">
              <InputNumber
                size="large"
                value={props.rounds}
                min={0}
                max={props.maxNumberOfRounds}
                defaultValue={0}
                onChange={(value: number) => props.onRoundsChange(value)}
              />
            </Form.Item>

            <Form.Item label="Reps" className="benchmark-label">
              <InputNumber
                size="large"
                value={props.reps}
                min={-1}
                max={props.repsPerRound}
                defaultValue={0}
                onChange={(value: number) => {
                  if (
                    value === props.repsPerRound &&
                    props.rounds + 1 <= props.maxNumberOfRounds
                  ) {
                    props.onRepsChange(0);
                    props.onRoundsChange(props.rounds + 1);
                  } else if (value === -1 && props.rounds >= 1) {
                    props.onRepsChange(props.repsPerRound - 1);
                    props.onRoundsChange(props.rounds - 1);
                  } else if (
                    value >= 0 &&
                    value < props.repsPerRound &&
                    props.rounds < props.maxNumberOfRounds
                  ) {
                    props.onRepsChange(value);
                  }
                }}
              />
            </Form.Item>
          </Form>
        </Col>

        {props.athleteReps && (
          <Col span={24}>
            <div className="ant-statistic-title">
                Athletes scores
            </div>
            <div style={repsBorderStyle}>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{totalReps(props) + 0}</p>
                {fetchAthletes(totalReps(props) + 0, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{totalReps(props) + 1}</p>
                {fetchAthletes(totalReps(props) + 1, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{totalReps(props) + 2}</p>
                {fetchAthletes(totalReps(props) + 2, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{totalReps(props) + 3}</p>
                {fetchAthletes(totalReps(props) + 3, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{totalReps(props) + 4}</p>
                {fetchAthletes(totalReps(props) + 4, props.athleteReps)}
              </div>
            </div>
          </Col>
        )}

        <Col span={12}>
          <Statistic
            title="Total reps"
            value={props.rounds * props.repsPerRound + props.reps}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Reps per second"
            value={(
              (props.rounds * props.repsPerRound + props.reps) /
              props.wodLengthInSeconds
            ).toFixed(2)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Seconds per rep"
            value={(
              props.wodLengthInSeconds /
              (props.rounds * props.repsPerRound + props.reps)
            ).toFixed(2)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Reps per 30 seconds"
            value={(
              ((props.rounds * props.repsPerRound + props.reps) /
                props.wodLengthInSeconds) *
              30
            ).toFixed(2)}
          />
        </Col>

        <Col span={24}>
          <Table
            pagination={false}
            dataSource={generateDataSource(
              ((props.rounds * props.repsPerRound + props.reps) /
                props.wodLengthInSeconds) *
                30
            )}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
};
