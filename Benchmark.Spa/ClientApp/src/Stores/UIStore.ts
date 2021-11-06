import { action, makeObservable, observable } from "mobx";
import { Language } from "../Types/types";
import { RootStore } from "./RootStore";

export class UIStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            language: observable,
            setLanguage: action
        });
    }
    
    language: Language = "En";

    setLanguage(language: Language) {
        this.language = language;
    }
}