import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

export function DetailDataPokemon(id) {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);

  const getDetailData = async () => {
    try {
      const response = await fetch(`${id}`);
      const data1 = await response.json();

      setData(data1);
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
  };
  useEffect(() => {
    getDetailData();
  }, []);

  console.log('d', data);
  return data;
}
