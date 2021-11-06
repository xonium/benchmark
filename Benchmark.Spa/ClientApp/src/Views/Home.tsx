import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { RouteNames } from "../Routes/RouteNames";
import { useRootStore } from "../Stores/RootStoreContext";

export const Home = () => {
  const { benchmarkStore, routerStore } = useRootStore();
  return (
    <>
      {benchmarkStore.benchmarks.map((benchmark) => {
        return (
          <Card
            key={1}
            hoverable
            style={{ width: 240 }}
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
        );
      })}
    </>
  );
};
