import {
  createRouterState,
  Route, RouterState, RouterStore,
} from "mobx-state-router";
import { DataLoader } from "../Data/DataLoader";
import { RootStore } from "../Stores/RootStore";
import { RouteNames } from "./RouteNames";

const notFoundState = createRouterState(RouteNames.NotFound);

export const Routes: Route[] = [
  {
    name: RouteNames.NotFound,
    pattern: "/not-found",
  },
  {
    name: RouteNames.Home,
    pattern: "/",
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
