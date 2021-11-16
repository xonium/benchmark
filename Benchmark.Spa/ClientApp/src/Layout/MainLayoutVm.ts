import { UIStore } from "../Stores/UIStore";

export const Vm = {
  OnLanguageChange: (languageChange: boolean, UIStore: UIStore) => {
    if (languageChange) {
      UIStore.setLanguage("Sv");
    } else {
      UIStore.setLanguage("En");
    }
  },
  OnWeightChange: (weightChange: boolean, UIStore: UIStore) => {
    if (weightChange) {
      UIStore.setWeight("Kg");
    } else {
      UIStore.setWeight("Lbs");
    }
  },
};
