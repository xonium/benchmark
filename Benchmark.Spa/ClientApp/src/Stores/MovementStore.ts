import { action, makeObservable, observable } from "mobx";
import { IMovement } from "../Types/types";
import { RootStore } from "./RootStore";

export class MovementStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            selected: observable,
            setSelected: action
        });
    }
    selected: IMovement | undefined = undefined;

    setSelected(movement: IMovement) {
        this.selected = movement;
    }
}