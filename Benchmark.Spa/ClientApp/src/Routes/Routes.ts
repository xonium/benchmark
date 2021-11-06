import {
  createRouterState,
  Route, RouterState, RouterStore,
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
        const { benchmarkStore } = rootStore as RootStore;

        var data = await DataLoader.Home();
        benchmarkStore.setBenchmarks(data.Benchmarks);
      }
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
      const { benchmarkStore } = rootStore as RootStore;
      var data = await DataLoader.Benchmark(toState.params["slug"]);
      if (data !== undefined) {
        benchmarkStore.setSelected(data);
      }
      else {
        return notFoundState;
      }
    }  
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
      const { vocabularyStore } = rootStore as RootStore;

      var data = await DataLoader.Vocabulary(toState.params["slug"]);
      if (data !== undefined) {
        vocabularyStore.setSelected(data);
      }
      else {
        return notFoundState;
      }
    }    
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
      const { vocabularyStore } = rootStore as RootStore;

      var data = await DataLoader.Vocabulary(toState.params["slug"]);
      if (data !== undefined) {
        vocabularyStore.setSelected(data);
      }
      else {
        return notFoundState;
      }
    }    
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
      const { movementStore } = rootStore as RootStore;

      var data = await DataLoader.Movement(toState.params["slug"]);
      if (data !== undefined) {
        movementStore.setSelected(data);
      }
      else {
        return notFoundState;
      }
    }
  },
];
