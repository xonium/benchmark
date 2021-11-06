import { browserHistory, HistoryAdapter } from "mobx-state-router";
import { RootStore } from "./Stores/RootStore";

export const initApp = async () => {
  const rootStore = new RootStore();
  const { routerStore } = rootStore;

  const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
  historyAdapter.observeRouterStateChanges();

  return rootStore;
};
