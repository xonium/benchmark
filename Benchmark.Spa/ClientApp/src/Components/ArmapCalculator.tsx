import {
  Avatar,
  Col,
  Form,
  InputNumber,
  Row,
  Slider,
  Statistic,
  Table,
} from "antd";
import { observer, useLocalStore } from "mobx-react";
import { BenchmarkGutter } from "../Global";
import { IAthleteReps } from "../Types/types";

import {RankImage} from "./RankImage"

export interface IAmrapCalculatorProps {
  wodLengthInSeconds: number;
  repsPerRound: number;
  maxNumberOfRounds: number;
  athleteReps?: IAthleteReps[] | undefined;
}

export const AmrapCalculator = observer((props: IAmrapCalculatorProps) => {
  const localStore = useLocalStore(
    () => ({
      repsCount: 0,
      setRepsCount(value: number) {
        localStore.repsCount = value;
      },
      setRounds(value: number) {
        let calc = value * props.repsPerRound + this.reps;
        if (calc <= props.maxNumberOfRounds * props.repsPerRound) {
          localStore.repsCount = value * props.repsPerRound + this.reps;
        } else {
          localStore.repsCount = props.maxNumberOfRounds * props.repsPerRound;
        }
      },
      setReps(value: number) {
        if (value === -1) {
          let calc =
            (this.rounds - 1) * props.repsPerRound + props.repsPerRound - 1;
          if (calc >= 0) {
            localStore.repsCount = calc;
          }
        } else {
          let calc = this.rounds * props.repsPerRound + value;
          if (calc <= props.maxNumberOfRounds * props.repsPerRound) {
            localStore.repsCount = this.rounds * props.repsPerRound + value;
          }
        }
      },
      get rounds() {
        return Math.floor(this.repsCount / props.repsPerRound);
      },
      get reps() {
        return this.repsCount % props.repsPerRound;
      },
    }),
    props
  );

  const fmtMSS = (s: number) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  };

  const generateDataSource = (
    repsPerThirtySeconds: number,
    repsPerRound: number,
    rowsToGenerate: number
  ) => {
    var dataSource = [];

    for (let index = 1; index <= rowsToGenerate; index++) {
      let maxReps =
        Math.ceil((repsPerThirtySeconds * index) % repsPerRound) ===
        repsPerRound;

      dataSource.push({
        key: index,
        time: fmtMSS(index * 30),
        round: !maxReps
          ? Math.floor((repsPerThirtySeconds * index) / repsPerRound)
          : Math.floor((repsPerThirtySeconds * index) / repsPerRound) + 1,
        reps: !maxReps
          ? Math.ceil((repsPerThirtySeconds * index) % repsPerRound)
          : 0,
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

  const repsStyle = {
    display: "inline-block",
    width: "20%",
    borderLeft: "1px solid #f0f0f0",
    padding: "3px",
  };
  const repNumberStyle = { marginBottom: "4px" };
  const repsBorderStyle = { borderTop: "3px solid #d3adf7" };

  const fetchAthletes = (reps: number, athleteReps: IAthleteReps[]) => {
    var filtered = athleteReps.filter((x) => x.Reps === reps);

    if (filtered.length === 0) {
      return (
        <div className="ant-avatar-group">
          <span className="ant-avatar ant-avatar-square ant-avatar-image"></span>
        </div>
      );
    }

    return (
      <Avatar.Group maxCount={1}>
        {filtered.map((x) => {
          return x.Athletes.map((a) => {
            return <Avatar alt={a.Name} shape="square" src={a.ImageSrc} />;
          });
        })}
      </Avatar.Group>
    );
  };


  return (
    <>
      <Row gutter={BenchmarkGutter}>
      <Col span={24}>
          <div style={{display:"flex", justifyContent: "center"}}>
            <RankImage reps={localStore.repsCount} totalReps={props.maxNumberOfRounds * props.repsPerRound}/>
          </div>
        </Col>
        <Col span={8}>
          <Form.Item label="Rounds" className="benchmark-label">
            <InputNumber
              size="large"
              value={localStore.rounds}
              min={0}
              max={props.maxNumberOfRounds}
              defaultValue={0}
              onChange={(value: number) => localStore.setRounds(value)}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Reps" className="benchmark-label">
            <InputNumber
              size="large"
              value={localStore.reps}
              min={-1}
              max={props.repsPerRound}
              defaultValue={0}
              onChange={(value: number) => localStore.setReps(value)}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Slider
            defaultValue={0}
            value={localStore.repsCount}
            min={0}
            max={props.maxNumberOfRounds * props.repsPerRound}
            onChange={(value: number) => localStore.setRepsCount(value)}
          />
        </Col>
        {props.athleteReps && (
          <Col span={24}>
            <div className="ant-statistic-title">Athletes scores</div>
            <div style={repsBorderStyle}>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{localStore.repsCount + 0}</p>
                {fetchAthletes(localStore.repsCount + 0, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{localStore.repsCount + 1}</p>
                {fetchAthletes(localStore.repsCount + 1, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{localStore.repsCount + 2}</p>
                {fetchAthletes(localStore.repsCount + 2, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{localStore.repsCount + 3}</p>
                {fetchAthletes(localStore.repsCount + 3, props.athleteReps)}
              </div>
              <div style={repsStyle}>
                <p style={repNumberStyle}>{localStore.repsCount + 4}</p>
                {fetchAthletes(localStore.repsCount + 4, props.athleteReps)}
              </div>
            </div>
          </Col>
        )}
        <Col span={12}>
          <Statistic title="Total reps" value={localStore.repsCount} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Reps per second"
            value={(
              (localStore.rounds * props.repsPerRound + localStore.reps) /
              props.wodLengthInSeconds
            ).toFixed(2)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Seconds per rep"
            value={(
              props.wodLengthInSeconds /
              (localStore.rounds * props.repsPerRound + localStore.reps)
            ).toFixed(2)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Reps per 30 seconds"
            value={(
              ((localStore.rounds * props.repsPerRound + localStore.reps) /
                props.wodLengthInSeconds) *
              30
            ).toFixed(2)}
          />
        </Col>
        <Col span={24}>
          <div className="ant-statistic-title">Time table</div>
          <Table
            pagination={false}
            dataSource={generateDataSource(
              ((localStore.rounds * props.repsPerRound + localStore.reps) /
                props.wodLengthInSeconds) *
                30,
              props.repsPerRound,
              (props.wodLengthInSeconds / 60) * 2
            )}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
});
