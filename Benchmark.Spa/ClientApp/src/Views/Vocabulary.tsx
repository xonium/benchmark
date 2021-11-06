import { useRootStore } from "../Stores/RootStoreContext";

export const Vocabulary = () => {
  const { vocabularyStore } = useRootStore();
  return (
    <>
      <h1>{vocabularyStore.selected?.Name}</h1>
      <p>{vocabularyStore.selected?.Description}</p>
    </>
  );
};
