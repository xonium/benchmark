import { Card, Col, Row, Space, Tag } from "antd";
import { observer } from "mobx-react";
import { RouterLink } from "mobx-state-router";
import YouTube from "react-youtube";
import { AmrapCalculator } from "../Components/ArmapCalculator";
import { BenchmarkGutter, VideoOptions } from "../Global";
import { RouteNames } from "../Routes/RouteNames";
import { useRootStore } from "../Stores/RootStoreContext";
import { IWorkoutMovement } from "../Types/types";

export const Benchmark = observer(() => {
  const { benchmarkStore } = useRootStore();

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
        <Card title="Benchmark">
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
                  <span>minutes</span>
                </span>
              </Space>
            </Col>

            {benchmarkStore.selected?.WorkoutMovements.map(
              (movement: IWorkoutMovement, i: number) => {
                return (
                  <Col span={24} key={movement.Hash + i}>
                    <Space>
                      <span>{movement.Reps}</span>
                      <Tag color="geekblue">
                        <RouterLink
                          routeName={RouteNames.Movement}
                          params={{ slug: movement.Slug }}
                        >
                          {movement.NamePlural}
                        </RouterLink>
                      </Tag>
                    </Space>
                  </Col>
                );
              }
            )}
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Calculator">
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
