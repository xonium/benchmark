import { action, makeObservable, observable } from "mobx";
import { Language, Weight } from "../Types/types";
import { RootStore } from "./RootStore";

export class UIStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            language: observable,
            weight: observable,
            setLanguage: action,
            setWeight: action
        });
    }
    
    language: Language = "En";

    weight: Weight = "Lbs";

    setLanguage(language: Language) {
        this.language = language;
        localStorage.setItem("benchmark.language", language);
    }

    setWeight(weight: Weight) {
        this.weight = weight;
        localStorage.setItem("benchmark.weight", weight);
    }
}