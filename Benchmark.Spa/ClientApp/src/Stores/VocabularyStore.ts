import { action, makeObservable, observable } from "mobx";
import { IVocabulary } from "../Types/types";
import { RootStore } from "./RootStore";

export class VocabularyStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            selected: observable,
            setSelected: action
        });
    }
    selected: IVocabulary | undefined = undefined;

    setSelected(vocabulary: IVocabulary) {
        this.selected = vocabulary;
    }
}