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

import diamondRank from "../Images/diamond_rank.png";
import flowerRank1 from "../Images/flower_1_rank.png";
import flowerRank2 from "../Images/flower_2_rank.png";
import flowerRank3 from "../Images/flower_3_rank.png";
import castroRank1 from "../Images/castro_1_rank.png";
import castroRank2 from "../Images/castro_2_rank.png";
import castroRank3 from "../Images/castro_3_rank.png";
import bridgesRank1 from "../Images/bridges_1_rank.png";
import bridgesRank2 from "../Images/bridges_2_rank.png";
import bridgesRank3 from "../Images/bridges_3_rank.png";
import davidsdottirRank1 from "../Images/davidsdottir_1_rank.png";
import davidsdottirRank2 from "../Images/davidsdottir_2_rank.png";
import davidsdottirRank3 from "../Images/davidsdottir_3_rank.png";
import fikowskiRank1 from "../Images/fikowski_1_rank.png";
import fikowskiRank2 from "../Images/fikowski_2_rank.png";
import fikowskiRank3 from "../Images/fikowski_3_rank.png";
import toomeyRank1 from "../Images/toomey_1_rank.png";
import toomeyRank2 from "../Images/toomey_2_rank.png";
import toomeyRank3 from "../Images/toomey_3_rank.png";

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

  const selectRankImage = (reps: number) => {
    if (reps < 10) {
      return flowerRank1;
    }    
    else if (reps >= 10 && reps < 20) {
      return flowerRank2;
    }
    else if (reps >= 20 && reps < 30) {
      return flowerRank3;
    }
    else if (reps >= 30 && reps < 40) {
      return castroRank1;
    }
    else if (reps >= 40 && reps < 50) {
      return castroRank2;
    }
    else if (reps >= 50 && reps < 60) {
      return castroRank3;
    }
    else if (reps >= 60 && reps < 70) {
      return bridgesRank1;
    }
    else if (reps >= 70 && reps < 80) {
      return bridgesRank2;
    }
    else if (reps >= 80 && reps < 90) {
      return bridgesRank3;
    }                  
    else if (reps >= 90 && reps < 100) {
      return davidsdottirRank1;
    }
    else if (reps >= 100 && reps < 110) {
      return davidsdottirRank2;
    }
    else if (reps >= 110 && reps < 120) {
      return davidsdottirRank3;
    }        
    else if (reps >= 120 && reps < 130) {
      return fikowskiRank1;
    }
    else if (reps >= 130 && reps < 140) {
      return fikowskiRank2;
    }
    else if (reps >= 140 && reps < 150) {
      return fikowskiRank3;
    }
    else if (reps >= 150 && reps < 160) {
      return toomeyRank1;
    }
    else if (reps >= 160 && reps < 170) {
      return toomeyRank2;
    }
    else if (reps >= 170 && reps < 180) {
      return toomeyRank3;
    }
    else if (reps === 180) {
      return diamondRank;
    }
  }

  return (
    <>
      <Row gutter={BenchmarkGutter}>
      <Col span={24}>
          <div style={{display:"flex", justifyContent: "center"}}>
            <img src={selectRankImage(localStore.repsCount)} alt="ranks" style={{objectFit: "cover", maxHeight: "160px"}}/>
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
