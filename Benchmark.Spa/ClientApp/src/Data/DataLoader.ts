import { IBenchmark, IHomeResponse, IMovement, IVocabulary, Language } from "../Types/types";
import { En_HomeData } from "./En_HomeData";
import { En_MovementData } from "./En_MovementData";
import { En_VocabularyData } from "./En_VocabularyData";

import { Sv_HomeData } from "./Sv_HomeData";
import { Sv_MovementData } from "./Sv_MovementData";
import { Sv_VocabularyData } from "./Sv_VocabularyData";

interface IDataLoader {
    Home: (language: Language) => Promise<IHomeResponse>,
    Benchmark: (slug: string, language: Language) => Promise<IBenchmark | undefined>,
    Vocabulary: (slug: string, language: Language) => Promise<IVocabulary | undefined>,
    Movement: (slug: string, language: Language) => Promise<IMovement | undefined>,
}

export const DataLoader: IDataLoader = {
    Home: async (language: Language) => { 
        if (language === "En") {
            return Promise.resolve(En_HomeData); 
        }
        return Promise.resolve(Sv_HomeData); 
    },
    Benchmark: async (slug: string, language: Language) => {
        if (language === "En") {
            var foundBenchmark = En_HomeData.Benchmarks.find(x => x.Slug === slug);
            return Promise.resolve(foundBenchmark);
        }
        var foundBenchmarkSv = Sv_HomeData.Benchmarks.find(x => x.Slug === slug);
        return Promise.resolve(foundBenchmarkSv);
    },
    Vocabulary: async (slug: string, language: Language) => {
        if (language === "En") {
            var foundVocabulary = En_VocabularyData.find(x => x.Slug === slug);
            return Promise.resolve(foundVocabulary);
        }
        var foundVocabularySv = Sv_VocabularyData.find(x => x.Slug === slug);
        return Promise.resolve(foundVocabularySv);        
    },
    Movement: async (slug: string, language: Language) => {
        console.log('wtf', slug, language);
        
        if (language === "En") {
            var foundMovement = En_MovementData.find(x => x.Slug === slug);
            return Promise.resolve(foundMovement);
        }
        var foundMovementSv = Sv_MovementData.find(x => x.Slug === slug);
        return Promise.resolve(foundMovementSv);
    }    
}
