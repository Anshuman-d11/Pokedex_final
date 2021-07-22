import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  PanResponder,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {DataPokemon} from '../data/FetchData';
import {DetailDataPokemon} from '../data/FetchDetailData';
import {EvolveFrom} from '../data/FetchEvolveFrom';
const PokemonDetailScreen = ({route, navigation}) => {
  const {pokemonId, pokemonUri, pokemonName} = route.params;
  const pokemonDetails = DataPokemon();

  const [evolveTo, setEvolveTo] = useState('toplevel');
  const [toId, setToId] = useState();
  const [fromId, setFromId] = useState();
  const [evolveFromUri, setEvolveFromUri] = useState('');
  const [evolveToUri, setEvolveToUri] = useState('');
  const [evolve_from, Detaildata, load, pokemonData] = EvolveFrom(pokemonId);

  function find(par) {
    if (par.species.name === pokemonName) {
      if (par.evolves_to.length > 0)
        setEvolveTo(par.evolves_to[0].species.name);

      return;
    }

    if (par.evolves_to.length > 0) find(par.evolves_to[0]);
  }

  useEffect(() => {
    if (load) {
      find(Detaildata.chain);
    }
  }, [load]);

  const filterData = (query, type) => {
    if (query) {
      const pokemon = pokemonDetails.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );

      if (pokemon.length > 0) {
        if (type === 'from') setFromId(pokemon[0].id);
        else setToId(pokemon[0].id);
        return pokemon[0].sprites.front_default;
      }
    }
    return '';
  };
  useEffect(() => {
    if (evolve_from !== 'origin')
      setEvolveFromUri(filterData(evolve_from, 'from'));
    if (evolveTo !== 'toplevel') setEvolveToUri(filterData(evolveTo, 'to'));
  }, [pokemonDetails]);

  if (pokemonData)
    return (
      <View style={styles.screen}>
        <View>
          <Text style={{fontSize: 20}}>Evolve From {evolve_from}</Text>
          <View style={styles.evolveFrom}>
            <TouchableOpacity
              onPress={() => {
                if (evolve_from !== 'origin') {
                  navigation.push(
                    'Detailscreen',

                    {
                      pokemonId: fromId,
                      pokemonUri: evolveFromUri,
                      pokemonName: evolve_from,
                    },
                  );
                } else {
                  Alert.alert('Already at origin');
                }
              }}>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: evolveFromUri !== '' ? evolveFromUri : pokemonUri,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listData}>
          <View style={styles.imageData}>
            <Image
              source={{uri: pokemonUri}}
              style={{width: 200, height: 200}}
            />
          </View>

          <View style={styles.data}>
            <Text style={{fontSize: 20}}>Name : {pokemonName}</Text>
            <Text style={{fontSize: 20}}>
              Colour : {pokemonData ? pokemonData.color.name : ''}
            </Text>
            <Text style={{fontSize: 20}}>
              Base Happiness :{pokemonData ? pokemonData.base_happiness : ''}
            </Text>
            <Text style={{fontSize: 20}}>
              Capture Rate : {pokemonData ? pokemonData.capture_rate : ''}
            </Text>
            <Text style={{fontSize: 20}}>
              Growth : {pokemonData ? pokemonData.growth_rate.name : ''}
            </Text>
            <Text style={{fontSize: 20}}>
              habitat : {pokemonData ? pokemonData.habitat.name : ''}
            </Text>
            <Text style={{fontSize: 20}} numberOfLines={2}>
              Shape : {pokemonData ? pokemonData.shape.name : ''}
            </Text>
          </View>
        </View>

        <View>
          <Text style={{fontSize: 20}}>evolve To {evolveTo}</Text>
          <View style={styles.evolveTo}>
            <TouchableOpacity
              onPress={() => {
                if (evolveTo !== 'toplevel') {
                  navigation.push(
                    'Detailscreen',

                    {
                      pokemonId: toId,
                      pokemonUri: evolveToUri,
                      pokemonName: evolveTo,
                    },
                  );
                } else {
                  Alert.alert('Already at toplevel');
                }
              }}>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: evolveToUri !== '' ? evolveToUri : pokemonUri,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  else return <Text>Loading ....</Text>;
};

const styles = StyleSheet.create({
  screen: {
    margin: 5,
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'skyblue',
  },
  mainPokemon: {
    borderWidth: 2,
    margin: 5,
    width: '95%',
    alignItems: 'flex-start',
    borderRadius: 20,
  },

  evolveFrom: {
    borderWidth: 2,

    alignItems: 'center',
    borderRadius: 15,
    margin: 20,
  },
  evolveTo: {
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 15,
    margin: 20,
  },
  imageData: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
    width: '40%',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  listData: {
    flexDirection: 'row',
    borderWidth: 2,
    margin: 10,
    padding: 5,
    overflow: 'hidden',
    width: '95%',
    borderRadius: 20,
  },
  data: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 5,
  },
});
export default PokemonDetailScreen;
