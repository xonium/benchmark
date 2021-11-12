import { createBrowserHistory } from 'history';
import { HistoryAdapter } from "mobx-state-router";
import { RootStore } from "./Stores/RootStore";
import { Language, Weight } from "./Types/types";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "benchmark": "Benchmark",
          "minutes": "minutes",
          "with": "with",
          "calculator": "Calculator",
          "rounds": "Rounds",
          "round": "Round",
          "reps": "Reps",
          "standalone_calculator": "Standalone calculator",
          "athletes_scores": "Athletes scores",
          "total_reps": "Total reps",
          "reps_per_second": "Reps per second",
          "seconds_per_rep" : "Seconds per rep",
          "reps_per_30_seconds" : "Reps per 30 seconds",
          "time_table" : "Time table",
          "time" : "Time",
          "standards" : "Standards",
          "reference" : "Reference",
          "wod_length_in_minutes" : "WOD length in minutes",
          "reps_per_round" : "Reps per round",
          "max_number_of_rounds" : "Max number of rounds",
          "configuration" : "Configuration"
        }
      },
      sv: {
        translation: {
          "benchmark": "Måttstock",
          "minutes": "minuter",
          "with": "med",
          "calculator": "Kalkylator",
          "rounds": "Rundor",
          "round": "Runda",
          "reps": "Repetitioner",
          "standalone_calculator": "Fristående kalkylator",
          "athletes_scores": "Atleters poäng",
          "total_reps": "Totalt antal repetitioner",
          "reps_per_second": "Repetitioner per sekund",
          "seconds_per_rep" : "Sekunder per repetition",
          "reps_per_30_seconds" : "Repetitioner per 30 sekunder",
          "time_table" : "Tidtabell",
          "time" : "Tid",
          "standards" : "Standarder",
          "reference" : "Referens",
          "wod_length_in_minutes" : "WOD längd i minuter",
          "reps_per_round" : "Repetitioner per runda",
          "max_number_of_rounds" : "Max antal rundor",
          "configuration" : "Konfiguration"
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    debug: true
  });
