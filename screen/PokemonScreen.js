import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  TextInput,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import RenderItem from '../data/ListData';
import {DataPokemon} from '../data/FetchData';
import {FlatList} from 'react-native';

const PokemonScreen = props => {
  const data = DataPokemon();
  const [query, setQuery] = useState('');
  const filteredData = useMemo(() => {
    if (query) {
      return data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return data;
  }, [data, query]);

  return (
    <View style={{margin: 10}}>
      <TextInput
        style={{borderWidth: 1, borderRadius: 10}}
        onChangeText={value => setQuery(value)}
      />
      <FlatList
        data={filteredData}
        renderItem={itemData => (
          <RenderItem
            itemData={itemData}
            onPress={() => {
              props.navigation.navigate(
                'Detailscreen',

                {
                  pokemonId: itemData.item.id,
                  pokemonUri: itemData.item.sprites.front_default,
                  pokemonName: itemData.item.name,
                },
              );
            }}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dataItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listData: {
    flexDirection: 'row',
    borderWidth: 2,
    padding: 10,
  },
  imageData: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  tag: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    marginRight: 2,
    padding: 7,
  },
});

export default PokemonScreen;
