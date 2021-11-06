import { action, makeObservable, observable } from "mobx";
import { IBenchmark } from "../Types/types";
import { RootStore } from "./RootStore";

export class BenchmarkStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            rounds: observable,
            reps: observable,
            benchmarks: observable,
            selected: observable,
            setBenchmarks: action,
            setSelected: action,
            setRounds: action,
            setReps: action,
        });
    }

    rounds: number = 0;

    reps: number = 0;

    benchmarks: IBenchmark[] = []

    selected: IBenchmark | undefined = undefined;

    setBenchmarks(benchmarks: IBenchmark[]) {
        this.benchmarks = benchmarks;
    }

    setSelected(benchmark: IBenchmark) {
        this.selected = benchmark;
    }

    setRounds(input: number) {
        this.rounds = input;
    }

    setReps(input: number) {
        this.reps = input;
    }
}