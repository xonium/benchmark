import { RootStore } from "./RootStore";

export class AppStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
}