import { AppStore } from "./AppStore";
import { createRouterState, RouterStore } from "mobx-state-router";
import { Routes } from "../Routes/Routes";
import { BenchmarkStore } from "./BenchmarkStore";
import { VocabularyStore } from "./VocabularyStore";
import { MovementStore } from "./MovementStore";
import { UIStore } from "./UIStore";

const notFound = createRouterState('notFound');

export class RootStore {
    appStore  = new AppStore(this);
    benchmarkStore = new BenchmarkStore(this);
    vocabularyStore = new VocabularyStore(this);
    movementStore = new MovementStore(this);
    UIStore = new UIStore(this);

    // Pass rootStore as an option to RouterStore
    routerStore = new RouterStore(Routes, notFound, {
        rootStore: this,
    });
}