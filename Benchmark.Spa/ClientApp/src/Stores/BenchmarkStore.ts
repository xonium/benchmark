import { action, makeObservable, observable } from "mobx";
import { IBenchmark } from "../Types/types";
import { RootStore } from "./RootStore";

export class BenchmarkStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            benchmarks: observable,
            selected: observable,
            setBenchmarks: action,
            setSelected: action,
        });
    }

    benchmarks: IBenchmark[] = []

    selected: IBenchmark | undefined = undefined;

    setBenchmarks(benchmarks: IBenchmark[]) {
        this.benchmarks = benchmarks;
    }

    setSelected(benchmark: IBenchmark) {
        this.selected = benchmark;
    }
}