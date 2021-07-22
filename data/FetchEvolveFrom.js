import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

export function EvolveFrom(id) {
  const [evolve, setEvolve] = useState('origin');
  const [load, setLoad] = useState();
  const [data3, setData3] = useState();
  const [data2, setData2] = useState();
  const getEvolveData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      );
      const data1 = await response.json();

      if (data1) {
        setData2(data1);
        if (data1.evolves_from_species)
          setEvolve(data1.evolves_from_species.name);

        const response1 = await fetch(data1.evolution_chain.url);
        const data2 = await response1.json();

        setData3(data2);
        setLoad(true);
      }
    } catch (error) {
      setLoad(false);
      console.error(error);
    } finally {
    }
  };
  useEffect(() => {
    getEvolveData();
  }, []);
  // console.log(evolve, 1, load, 1, data3);
  return [evolve, data3, load, data2];
}
