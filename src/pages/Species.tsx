import React from "react";
import {
  useGetSpeciesQuery,
  useAddSpeciesMutation,
  useUpdateSpeciesMutation,
} from "../modules/species/speciesApi";
import { useFetchSpeciesQuery } from "../modules/species/speciesApiRTK";
import { Species } from "../modules/species/types/Species";

const SpeciesList: React.FC = () => {
  // const { data: species, isLoading, refetch } = useGetSpeciesQuery();
  // const [addSpecies] = useAddSpeciesMutation();
  // const [updateSpecies] = useUpdateSpeciesMutation();

  const { data: species, isLoading, refetch } = useFetchSpeciesQuery();

  if (isLoading) return <p>Loading...</p>;

  const handleQuery = () => {
    refetch();
    console.log(species);
  };

  return (
    <div>
      <button onClick={handleQuery}>Get Species</button>
      <ul>
        {species?.map((s: Species) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpeciesList;
