import { IHomeResponse } from "../Types/types";
import comptrainstandard from "../Images/comptrain_standard.jpg";
import davidsdottir from "../Images/davidsdottir.jpg";

export const En_HomeData: IHomeResponse = {
  Benchmarks: [
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
      AthleteReps: [
        {
          Reps: 4,
          Athletes: [
            {
              Name: "Davidsdottir",
              ImageSrc: davidsdottir,
            },
            {
              Name: "Davidsdottir",
              ImageSrc: davidsdottir,
            },
            {
              Name: "Davidsdottir",
              ImageSrc: davidsdottir,
            },
          ],
        },
        {
          Reps: 5,
          Athletes: [
            {
              Name: "Davidsdottir",
              ImageSrc: davidsdottir,
            },
          ],
        },
      ],
    },
  ],
};