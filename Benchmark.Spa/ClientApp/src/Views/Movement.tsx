import { Card, Col, Row } from "antd";
import YouTube from "react-youtube";
import { BenchmarkGutter, VideoOptions } from "../Global";
import { useRootStore } from "../Stores/RootStoreContext";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

export const Movement = observer(() => {
  const { movementStore } = useRootStore();
  const { t } = useTranslation();

  return (
    <Row gutter={BenchmarkGutter}>
      <Col span={24}>
        <h1> {movementStore.selected?.Name} </h1>
        <YouTube
          videoId={movementStore.selected?.YoutubeId}
          opts={VideoOptions}
        />
      </Col>
      <Col span={24}>
        <Card title={t("standards")}>
          <ul>
            {movementStore.selected?.Standards.map(
              (standard: string, index: number) => {
                return <li key={index}>{standard}</li>;
              }
            )}
          </ul>
        </Card>
      </Col>
      <Col span={24}>
        <Card title={t("reference")}>
          <a
            target="_blank"
            rel="noreferrer"
            href={movementStore.selected?.ReferenceLink}
          >
            {movementStore.selected?.ReferenceDescription}
          </a>
        </Card>
      </Col>
    </Row>
  );
});
