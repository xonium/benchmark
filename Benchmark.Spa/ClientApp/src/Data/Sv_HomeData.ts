import { IHomeResponse } from "../Types/types";
import comptrainstandard from "../Images/comptrain_standard.jpg";
import davidsdottir from "../Images/davidsdottir.jpg";

export const Sv_HomeData: IHomeResponse = {
  Benchmarks: [
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
