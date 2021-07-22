import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

export function DataPokemon() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=151',
      );
      const data1 = await response.json();
      const response2 = await Promise.all(data1.results.map(d => fetch(d.url)));

      const data2 = await Promise.all(response2.map(r => r.json()));
      // console.log(data2);
      setData(data2);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  //     .then(res => res.json())
  //     .then(data1 => fetch(data1.results[0].url))
  //     .then(res1 => res1.json())
  //     .then(data2 => setData(data2))
  //     .catch(console.error());

  return data;
}
