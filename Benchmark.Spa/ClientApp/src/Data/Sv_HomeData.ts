import { IHomeResponse } from "../Types/types";
import comptrainstandard from "../Images/comptrain_standard.jpg";
import { AthleteReps } from "./AthleteReps";
import open221 from "../Images/22_1.jpg";

export const Sv_HomeData: IHomeResponse = {
  Benchmarks: [
    {
      Id: "1234",
      Slug: "open-22-1",
      Name: "Open 22.1",
      ImageUrl: open221,
      ImageText: "Open 22.1",
      Summary:
        "",
      YoutubeId: "pHx02A0vR6c",
      WorkoutDefinition: {
        Vocabulary: {
          Slug: "amrap",
          Name: "AMRAP",
          Description: "As Many Rounds/Reps Possible",
        },
        Minutes: 15,
        RepsPerRound: 30,
        MaxNumberOfRounds: 15
      },
      WorkoutMovements: [
        {
          Hash: "22_1_1",
          Slug: "wall-walk",
          Name: "Wall walk",
          NamePlural: "Wall walks",
          Reps: 3
        },
        {
          Hash: "22_1_2",
          Slug: "db-snatch",
          Name: "Dumbbell snatch",
          NamePlural: "Dumbbell snatches",
          Reps: 12,
          Weight: {
            FemaleLbs: 35,
            MaleLbs: 50,
            FemaleKgs: 15,
            MaleKgs: 22.5
          }
        },
        {
          Hash: "22_1_3",
          Slug: "box-jump-over",
          Name: "Box jump over",
          NamePlural: "Box jump overs",
          Reps: 15
        },       
      ],
      AthleteReps: AthleteReps
    },     
    {
      Id: "123",
      Slug: "comptrain-standard",
      Name: "CompTrain Standard",
      ImageUrl: comptrainstandard,
      ImageText: "Amanandadad",
      Summary:
        "CompTrain Standard är en kort och kraftfull måttstock-utmaning som testar din förmåga att cykla burpees och skivstång snabbt. De 5 minuterna kommer att vara över innan du vet ordet av det, så gör dig redo att ta med intensiteten och lämna allt på golvet!",
      YoutubeId: "TsENDm7OwBM",
      WorkoutDefinition: {
        Vocabulary: {
          Slug: "amrap",
          Name: "AMRAP",
          Description: "Så Många Rundor/Repetitioner som Möjligt (As Many Rounds/Reps Possible)",
        },
        Minutes: 5,
        RepsPerRound: 60,
        MaxNumberOfRounds: 3
      },
      WorkoutMovements: [
        {
          Hash: "123",
          Slug: "thruster",
          Name: "Thruster",
          NamePlural: "Thrusters",
          Reps: 10,
          Weight: {
            FemaleLbs: 65,
            MaleLbs: 95,
            FemaleKgs: 29.5,
            MaleKgs: 43
          }
        },
        {
          Hash: "124",
          Slug: "bar-facing-burpee",
          Name: "Skivstångsvänd burpee",
          NamePlural: "Skivstångsvända burpees",
          Reps: 10,
        },
        {
          Hash: "126",
          Slug: "power-clean",
          Name: "Styrkevändning",
          NamePlural: "Styrkevändningar",
          Reps: 10,
          Weight: {
            FemaleLbs: 65,
            MaleLbs: 95,
            FemaleKgs: 29.5,
            MaleKgs: 43
          }
        },
        {
          Hash: "124",
          Slug: "bar-facing-burpee",
          Name: "Skivstångsvänd burpee",
          NamePlural: "Skivstångsvända burpees",
          Reps: 10,
        },
        {
          Hash: "127",
          Slug: "hang-power-snatches",
          Name: "Hängstyrkeryck",
          NamePlural: "Hängstyrkeryck",
          Reps: 10,
          Weight: {
            FemaleLbs: 65,
            MaleLbs: 95,
            FemaleKgs: 29.5,
            MaleKgs: 43
          }
        },
        {
          Hash: "124",
          Slug: "bar-facing-burpee",
          Name: "Skivstångsvänd burpee",
          NamePlural: "Skivstångsvända burpees",
          Reps: 10,
        },
      ],
      AthleteReps: AthleteReps
    },
  ],
};
