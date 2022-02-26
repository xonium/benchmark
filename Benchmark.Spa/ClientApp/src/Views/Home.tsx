import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { observer } from "mobx-react";
import { RouteNames } from "../Routes/RouteNames";
import { useRootStore } from "../Stores/RootStoreContext";

export const Home = observer(() => {
  const { benchmarkStore, routerStore } = useRootStore();
  const cardSize =  {xs: 24, sm: 24, md: 12, lg: 8 }
  return (
    <Row gutter={[16,16]}>
      {benchmarkStore.benchmarks.map((benchmark) => {
        return (
          <Col key={benchmark.Id} {...cardSize}>
            <Card
              hoverable
              style={{ width: '100%' }}
              onClick={() => {
                  routerStore.goTo(RouteNames.Benchmark, { params: { slug: benchmark.Slug }})
              }}
              cover={
                <img
                  alt={benchmark.ImageText}
                  src={benchmark.ImageUrl}
                />
              }
            >
              <Meta title={benchmark.Name} description={benchmark.Summary} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
});
