import { Card, Col, Row, Space, Tag } from "antd";
import { observer } from "mobx-react";
import { RouterLink } from "mobx-state-router";
import YouTube from "react-youtube";
import { AmrapCalculator } from "../Components/ArmapCalculator";
import { BenchmarkGutter, VideoOptions } from "../Global";
import { RouteNames } from "../Routes/RouteNames";
import { useRootStore } from "../Stores/RootStoreContext";
import { Gender, IWeight, IWorkoutMovement, Weight } from "../Types/types";
import { useTranslation } from "react-i18next";

export const Benchmark = observer(() => {
  const { benchmarkStore, UIStore } = useRootStore();
  const { t } = useTranslation();

  const withWeight = (weightType: Weight, gender: Gender, weight?: IWeight) => {
    if (weight === undefined) return null;

    if (gender === "Female" && weightType === "Lbs") {
      return <span>{t("with")} {weight.FemaleLbs} {t("lbs")}</span>;
    }
    else if (gender === "Male" && weightType === "Lbs") {
      return <span>{t("with")} {weight.MaleLbs} {t("lbs")}</span>;
    }
    else if (gender === "Female" && weightType === "Kg") {
      return <span>{t("with")} {weight.FemaleKgs} {t("kg")}</span>;
    }
    else if (gender === "Male" && weightType === "Kg") {
      return <span>{t("with")} {weight.MaleKgs} {t("kg")}</span>;
    }
  }

  return (
    <Row gutter={BenchmarkGutter}>
      <Col span={24}>
        <h1> {benchmarkStore.selected?.Name} </h1>
        <YouTube
          videoId={benchmarkStore.selected?.YoutubeId}
          opts={VideoOptions}
        />
      </Col>

      <Col span={24}>
        <Card>{benchmarkStore.selected?.Summary}</Card>
      </Col>

      <Col span={24}>
        <Card title={t("benchmark")}>
          <Row gutter={BenchmarkGutter}>
            <Col span={24}>
              <Space>
                <Tag color="purple" style={{ margin: 0 }}>
                  <RouterLink
                    routeName={RouteNames.Vocabulary}
                    params={{
                      slug:
                        benchmarkStore.selected?.WorkoutDefinition.Vocabulary
                          .Slug ?? RouteNames.NotFound,
                    }}
                  >
                    {benchmarkStore.selected?.WorkoutDefinition.Vocabulary.Name}
                  </RouterLink>
                </Tag>
                <span>
                  {benchmarkStore.selected?.WorkoutDefinition.Minutes}{" "}
                  <span>{t("minutes")}</span>
                </span>
              </Space>
            </Col>

            {benchmarkStore.selected?.WorkoutMovements.map(
              (movement: IWorkoutMovement, i: number) => {
                return (
                  <Col span={24} key={movement.Hash + i}>
                    <Space>
                      <span>{movement.Reps}</span>
                      <Tag color="geekblue" style={{ margin: 0 }}>
                        <RouterLink
                          routeName={RouteNames.Movement}
                          params={{ slug: movement.Slug }}
                        >
                          {movement.NamePlural}
                        </RouterLink>
                      </Tag>
                      {withWeight(UIStore.weight, UIStore.gender, movement.Weight)}
                    </Space>
                  </Col>
                );
              }
            )}
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card title={t("calculator")} extra={<RouterLink routeName={RouteNames.StandaloneAmrapCalculator}>{t("standalone_calculator")}</RouterLink>}>
          <AmrapCalculator 
            wodLengthInSeconds={(benchmarkStore.selected?.WorkoutDefinition.Minutes ?? 0)*60}
            repsPerRound={benchmarkStore.selected?.WorkoutDefinition.RepsPerRound ?? 0}
            maxNumberOfRounds={benchmarkStore.selected?.WorkoutDefinition.MaxNumberOfRounds ?? 0}
            athleteReps={benchmarkStore.selected?.AthleteReps}
          />
        </Card>
      </Col>
    </Row>
  );
});


