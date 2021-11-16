import { action, makeObservable, observable } from "mobx";
import { Gender, Language, Weight } from "../Types/types";
import { RootStore } from "./RootStore";
import i18n from "i18next";
import { RouteNames } from "../Routes/RouteNames";

export class UIStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            language: observable,
            weight: observable,
            gender: observable,
            setLanguage: action,
            setWeight: action,
            setGender: action,
        });
    }
    
    language: Language = "En";

    weight: Weight = "Lbs";

    gender: Gender = "Male";

    setLanguage(language: Language) {
        this.language = language;
        localStorage.setItem("benchmark.language", language);
        i18n.changeLanguage(language.toLowerCase());
        console.log(this.rootStore.routerStore.getCurrentRoute()?.name, this.rootStore.routerStore.routerState);
        
        this.rootStore.routerStore.goTo(
            this.rootStore.routerStore.getCurrentRoute()?.name ?? RouteNames.Home,
            { ...this.rootStore.routerStore.routerState }
        );
    }

    setWeight(weight: Weight) {
        this.weight = weight;
        localStorage.setItem("benchmark.weight", weight)
    }

    setGender(gender: Gender) {
        this.gender = gender;
        localStorage.setItem("benchmark.gender", gender);
    }
}