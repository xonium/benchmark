import { createBrowserHistory } from 'history';
import { HistoryAdapter } from "mobx-state-router";
import { RootStore } from "./Stores/RootStore";
import { Language, Weight } from "./Types/types";

export const initApp = async () => {
  const rootStore = new RootStore();
  const { routerStore, UIStore } = rootStore;

  const browserHistory = createBrowserHistory({
    basename: "/benchmark"
});

  let language = localStorage.getItem("benchmark.language");
  if (language !== null) {
    UIStore.setLanguage(language as Language)
  }
  else {
    var userLang = navigator.language;
    if (userLang === "sv") {
      UIStore.setLanguage("Sv");
    }
    else {
      UIStore.setLanguage("En");
    }
  }

  let weight = localStorage.getItem("benchmark.weight");
  if (weight !== null) {
    UIStore.setWeight(weight as Weight)
  } else {
    if (UIStore.language === "Sv") {
      UIStore.setWeight("Kg")
    }
    else {
      UIStore.setWeight("Lbs")
    }
  }

  const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
  historyAdapter.observeRouterStateChanges();

  return rootStore;
};
