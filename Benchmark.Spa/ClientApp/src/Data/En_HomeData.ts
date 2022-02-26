import { IHomeResponse } from "../Types/types";
import comptrainstandard from "../Images/comptrain_standard.jpg";
import open221 from "../Images/22_1.jpg";
import { AthleteReps } from "./AthleteReps";

export const En_HomeData: IHomeResponse = {
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
        "The CompTrain Standard is a short and potent benchmark workout that tests your ability to cycle burpees and barbell quickly. The 5 minutes will be over before you know it, so get ready to bring the intensity and leave it all in the floor!",
      YoutubeId: "TsENDm7OwBM",
      WorkoutDefinition: {
        Vocabulary: {
          Slug: "amrap",
          Name: "AMRAP",
          Description: "As Many Rounds/Reps Possible",
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
          Name: "Bar facing burpee",
          NamePlural: "Bar facing burpees",
          Reps: 10,
        },
        {
          Hash: "126",
          Slug: "power-clean",
          Name: "Power clean",
          NamePlural: "Power cleans",
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
          Name: "Bar facing burpee",
          NamePlural: "Bar facing burpees",
          Reps: 10,
        },
        {
          Hash: "127",
          Slug: "hang-power-snatches",
          Name: "Hang power snatch",
          NamePlural: "Hang power snatches",
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
          Name: "Bar facing burpee",
          NamePlural: "Bar facing burpees",
          Reps: 10,
        },
      ],
      AthleteReps: AthleteReps
    },
  ],
};
