import React from "react";
import {
  useGetSpeciesQuery,
  useAddSpeciesMutation,
  useUpdateSpeciesMutation,
} from "../modules/species/speciesApi";

const SpeciesList: React.FC = () => {
  const { data: species, isLoading, refetch } = useGetSpeciesQuery();
  const [addSpecies] = useAddSpeciesMutation();
  const [updateSpecies] = useUpdateSpeciesMutation();

  if (isLoading) return <p>Loading...</p>;

  const handleAdd = () => {
    addSpecies({ name: "New Species" });
  };

  const handleUpdate = (id: string) => {
    updateSpecies({ id, name: "Updated Species" });
  };

  const handleQuery = () => {
    refetch();
    console.log(species);
  };

  return (
    <div>
      <button onClick={handleAdd}>Add Species</button>
      <button onClick={handleQuery}>Get Species</button>
      <ul>
        {species?.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpeciesList;
