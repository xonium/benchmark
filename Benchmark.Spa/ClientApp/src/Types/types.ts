export interface IHomeResponse {
    Benchmarks: IBenchmark[]
  }

export interface IBenchmark {
    Id: string,
    Name: string,
    Slug: string,
    ImageUrl: string,
    ImageText: string,
    Summary: string,
    YoutubeId: string,
    WorkoutDefinition: IWorkoutDefinition,
    WorkoutMovements: IWorkoutMovement[],
    AthleteReps: IAthleteReps[]
}

export interface IWorkoutDefinition {
    Vocabulary: IVocabulary
    Minutes: number,
    RepsPerRound: number,
    MaxNumberOfRounds: number
}

export interface IMovement {
    Hash: string,
    Slug: string,
    Name: string,
    NamePlural: string,
    YoutubeId: string,
    Standards: string[],
    ReferenceLink: string,
    ReferenceDescription: string,
}

export interface IWorkoutMovement {
    Hash: string,
    Slug: string,
    Name: string,
    NamePlural: string,
    Reps: number,    
}

export interface IVocabulary {
    Slug: string,
    Name: string,
    Description: string,
}

export interface IAthleteReps {
    Reps: number,
    Athletes: IAthlete[]
}

export interface IAthlete {
    Name: string,
    ImageSrc: string
}

export type Language = "En" | "Sv";