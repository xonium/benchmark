import {
  Avatar,
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Slider,
  Statistic,
  Table,
} from "antd";
import { observer, useLocalStore } from "mobx-react";
import { useEffect } from "react";
import { BenchmarkGutter } from "../Global";
import { IAthleteReps, IAthlete } from "../Types/types";

import {RankImage} from "./RankImage"

import { useTranslation } from "react-i18next";

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
      repsPerRound: props.repsPerRound,
      currentSelectedAthlete: {Name: "", ImageSrc: ""},
      currentSelectedAthleteScore: 0,
      showAthleteModal: false,
      setRepsCount(value: number) {
        localStore.repsCount = value;
      },
      setRounds(value: number) {
        let calc = value * localStore.repsPerRound + this.reps;
        if (calc <= props.maxNumberOfRounds * localStore.repsPerRound) {
          localStore.repsCount = value * localStore.repsPerRound + this.reps;
        } else {
          localStore.repsCount = props.maxNumberOfRounds * localStore.repsPerRound;
        }
      },
      setReps(value: number) {
        console.log(localStore.repsPerRound);
        if (value === -1) {          
          let calc = (this.rounds - 1) * localStore.repsPerRound + localStore.repsPerRound - 1;
          if (calc >= 0) {
            localStore.repsCount = calc;
          }
        } else {
          let calc = this.rounds * localStore.repsPerRound + value;
          if (calc <= props.maxNumberOfRounds * localStore.repsPerRound) {
            localStore.repsCount = this.rounds * localStore.repsPerRound + value;
          }
        }
      },
      setRepsPerRound(value: number) {
        localStore.repsPerRound = value;
      },
      setShowAthleteModal(value: boolean) {
        this.showAthleteModal = value;
      },
      setCurrentSelectedAthlete(value: IAthlete, reps: number) {
        this.currentSelectedAthlete = value;
        this.currentSelectedAthleteScore = reps;
      }, 
      get rounds() {
        return Math.floor(this.repsCount / localStore.repsPerRound);
      },
      get reps() {
        return this.repsCount % localStore.repsPerRound;
      },
    }),
    props
  );

  useEffect(() => {
    if (props.repsPerRound !== localStore.repsPerRound) {
      localStore.setRepsPerRound(props.repsPerRound);
    }
  }, [props.repsPerRound, localStore]);

  const { t } = useTranslation();

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
      title: t("time"),
      dataIndex: "time",
      key: "time",
    },
    {
      title: t("round"),
      dataIndex: "round",
      key: "round",
    },
    {
      title: t("reps"),
      dataIndex: "reps",
      key: "reps",
    },
    {
      title: t("total_reps"),
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
  const repsBorderStyle = { borderTop: "3px solid #d3adf7", display: "inline-flex", width: "100%" };
  const modalStyle = {display: "flex",
  justifyContent: "center",
  height: "100%",
  alignItems: "center"};

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
      <Avatar.Group maxCount={1} style={{display: "inline", cursor: "pointer", whiteSpace: "nowrap"}}>
        {filtered.map((x) => {
          return x.Athletes.map((a) => {
            return (
              <span
                className="ant-avatar ant-avatar-square ant-avatar-image"
                onClick={() => {
                  localStore.setCurrentSelectedAthlete(a, x.Reps);
                  localStore.setShowAthleteModal(true);
                }}
              >
                <Avatar alt={a.Name} shape="square" src={a.ImageSrc} style={{cursor: "pointer"}} />
              </span>
            );
          });
        })}
      </Avatar.Group>
    );
  };

  return (
    <>
      <Row gutter={BenchmarkGutter}>
        <Col span={8}>
          <Form size={"middle"} layout="vertical">
            <Form.Item label={t("rounds")} className="benchmark-label">
              <InputNumber
                value={localStore.rounds}
                min={0}
                max={props.maxNumberOfRounds}
                defaultValue={0}
                onChange={(value: number) => localStore.setRounds(value)}
              />
            </Form.Item>
            <Form.Item label={t("reps")} className="benchmark-label">
              <InputNumber
                value={localStore.reps}
                min={-1}
                max={localStore.repsPerRound}
                defaultValue={0}
                onChange={(value: number) => localStore.setReps(value)}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={16}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
          >
            <RankImage
              reps={localStore.repsCount}
              totalReps={props.maxNumberOfRounds * localStore.repsPerRound}
            />
          </div>
        </Col>
        <Col span={24}>
          <Slider
            defaultValue={0}
            value={localStore.repsCount}
            min={0}
            max={props.maxNumberOfRounds * localStore.repsPerRound}
            onChange={(value: number) => localStore.setRepsCount(value)}
          />
        </Col>
        {props.athleteReps && (
          <Col span={24}>
            <div className="ant-statistic-title">{t("athletes_scores")}</div>
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
            <Modal
              visible={localStore.showAthleteModal}
              onCancel={() => localStore.setShowAthleteModal(false)}
              footer={null}
            >
              <Row gutter={BenchmarkGutter}>
                <Col span="24" style={modalStyle}>
                  <Avatar
                    size={100}
                    src={localStore.currentSelectedAthlete.ImageSrc}
                    shape="square"
                  ></Avatar>
                </Col>
                <Col span="24" style={modalStyle}>
                  <h2>{localStore.currentSelectedAthlete.Name}</h2>
                </Col>
                <Col span="24" style={modalStyle}>
                  <h2>{localStore.currentSelectedAthleteScore} {t("reps")}</h2>
                </Col>
              </Row>
            </Modal>
          </Col>
        )}
        <Col span={12}>
          <Statistic title={t("total_reps")} value={localStore.repsCount} />
        </Col>
        <Col span={12}>
          <Statistic
            title={t("reps_per_second")}
            value={(
              (localStore.rounds * localStore.repsPerRound + localStore.reps) /
              props.wodLengthInSeconds
            ).toFixed(2)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={t("seconds_per_rep")}
            value={(
              props.wodLengthInSeconds /
              (localStore.rounds * localStore.repsPerRound + localStore.reps)
            ).toFixed(2)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={t("reps_per_30_seconds")}
            value={(
              ((localStore.rounds * localStore.repsPerRound + localStore.reps) /
                props.wodLengthInSeconds) *
              30
            ).toFixed(2)}
          />
        </Col>
        <Col span={24}>
          <div className="ant-statistic-title">{t("time_table")}</div>
          <Table
            pagination={false}
            dataSource={generateDataSource(
              ((localStore.rounds * localStore.repsPerRound + localStore.reps) /
                props.wodLengthInSeconds) *
                30,
              localStore.repsPerRound,
              (props.wodLengthInSeconds / 60) * 2
            )}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
});
