import {
  createRouterState,
  Route,
  RouterState,
  RouterStore,
} from "mobx-state-router";
import { DataLoader } from "../Data/DataLoader";
import { RootStore } from "../Stores/RootStore";
import { RouteNames } from "./RouteNames";

const notFoundState = createRouterState(RouteNames.NotFound);

const scrollToTop = async (
  fromState: RouterState,
  toState: RouterState,
  routerStore: RouterStore
) => {
  window.scrollTo(0, 0);
};

export const Routes: Route[] = [
  {
    name: RouteNames.NotFound,
    beforeEnter: scrollToTop,
    pattern: "/not-found",
  },
  {
    name: RouteNames.Home,
    pattern: "/",
    beforeEnter: scrollToTop,
    onEnter: async (
      fromState: RouterState,
      toState: RouterState,
      routerStore: RouterStore
    ) => {
      const { rootStore } = routerStore.options;
      const { benchmarkStore, UIStore } = rootStore as RootStore;

      if (toState.queryParams["b"]) {
        return createRouterState(RouteNames.Benchmark, {
          params: { slug: toState.queryParams["b"] },
        });
      }

      var data = await DataLoader.Home(UIStore.language);
      benchmarkStore.setBenchmarks(data.Benchmarks);
    },
  },
  {
    name: RouteNames.Benchmark,
    beforeEnter: scrollToTop,
    pattern: "/benchmark/:slug",
    onEnter: async (
      fromState: RouterState,
      toState: RouterState,
      routerStore: RouterStore
    ) => {
      const { rootStore } = routerStore.options;
      const { benchmarkStore, UIStore } = rootStore as RootStore;
      var data = await DataLoader.Benchmark(
        toState.params["slug"],
        UIStore.language
      );
      if (data !== undefined) {
        benchmarkStore.setSelected(data);
      } else {
        return notFoundState;
      }
    },
  },
  {
    name: RouteNames.Vocabulary,
    beforeEnter: scrollToTop,
    pattern: "/vocabulary/:slug",
    onEnter: async (
      fromState: RouterState,
      toState: RouterState,
      routerStore: RouterStore
    ) => {
      const { rootStore } = routerStore.options;
      const { vocabularyStore, UIStore } = rootStore as RootStore;

      var data = await DataLoader.Vocabulary(
        toState.params["slug"],
        UIStore.language
      );
      if (data !== undefined) {
        vocabularyStore.setSelected(data);
      } else {
        return notFoundState;
      }
    },
  },
  {
    name: RouteNames.Equipment,
    beforeEnter: scrollToTop,
    pattern: "/equipment/:slug",
    onEnter: async (
      fromState: RouterState,
      toState: RouterState,
      routerStore: RouterStore
    ) => {
      const { rootStore } = routerStore.options;
      const { vocabularyStore, UIStore } = rootStore as RootStore;

      var data = await DataLoader.Vocabulary(
        toState.params["slug"],
        UIStore.language
      );
      if (data !== undefined) {
        vocabularyStore.setSelected(data);
      } else {
        return notFoundState;
      }
    },
  },
  {
    name: RouteNames.Movement,
    beforeEnter: scrollToTop,
    pattern: "/movement/:slug",
    onEnter: async (
      fromState: RouterState,
      toState: RouterState,
      routerStore: RouterStore
    ) => {
      const { rootStore } = routerStore.options;
      const { movementStore, UIStore } = rootStore as RootStore;

      var data = await DataLoader.Movement(
        toState.params["slug"],
        UIStore.language
      );
      if (data !== undefined) {
        movementStore.setSelected(data);
      } else {
        return notFoundState;
      }
    },
  },
  {
    name: RouteNames.StandaloneAmrapCalculator,
    beforeEnter: scrollToTop,
    pattern: "/standalone/amrap-calculator",
  },
];
