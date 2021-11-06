import { MainLayout } from "../Layout/MainLayout";
import { Benchmark } from "../Views/Benchmark";
import { Home } from "../Views/Home";
import { Movement } from "../Views/Movement";
import { Vocabulary } from "../Views/Vocabulary";

export const ViewMap = {
    home: <MainLayout><Home /></MainLayout>,
    benchmark: <MainLayout><Benchmark /></MainLayout>,
    vocabulary: <MainLayout><Vocabulary /></MainLayout>,
    equipment: <MainLayout>equipment</MainLayout>,
    movement: <MainLayout><Movement /></MainLayout>,
};