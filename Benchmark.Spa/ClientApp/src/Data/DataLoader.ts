import { IBenchmark, IHomeResponse, IMovement, IVocabulary } from "../Types/types";
import { HomeData } from "./HomeData";
import { MovementData } from "./MovementData";
import { VocabularyData } from "./VocabularyData";

interface IDataLoader {
    Home: () => Promise<IHomeResponse>,
    Benchmark: (slug: string) => Promise<IBenchmark | undefined>,
    Vocabulary: (slug: string) => Promise<IVocabulary | undefined>,
    Movement: (slug: string) => Promise<IMovement | undefined>,
}

export const DataLoader: IDataLoader = {
    Home: async () => { return Promise.resolve(HomeData); },
    Benchmark: async (slug: string) => {
        var foundBenchmark = HomeData.Benchmarks.find(x => x.Slug === slug);
        return Promise.resolve(foundBenchmark);
    },
    Vocabulary: async (slug: string) => {
        var foundVocabulary = VocabularyData.find(x => x.Slug === slug);
        return Promise.resolve(foundVocabulary);
    },
    Movement: async (slug: string) => {
        var foundMovement = MovementData.find(x => x.Slug === slug);
        return Promise.resolve(foundMovement);
    }    
}
