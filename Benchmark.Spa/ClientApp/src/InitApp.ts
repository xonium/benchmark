import { createBrowserHistory } from 'history';
import { HistoryAdapter } from "mobx-state-router";
import { RootStore } from "./Stores/RootStore";

export const initApp = async () => {
  const rootStore = new RootStore();
  const { routerStore } = rootStore;

  const browserHistory = createBrowserHistory({
    basename: "/benchmark"
});

  const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
  historyAdapter.observeRouterStateChanges();

  return rootStore;
};
