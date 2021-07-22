import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

const RenderItem = props => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.listData}>
          <View style={styles.imageData}>
            <Image
              source={{uri: props.itemData.item.sprites.front_default}}
              style={{width: 100, height: 100}}
            />
          </View>
          <View style={styles.viewTags}>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>
              {props.itemData.item.name}
            </Text>
            <View style={styles.dataItem}>
              {props.itemData.item.types.map(type => (
                <Text style={styles.tag}>{type.type.name}</Text>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    padding: 10,
  },

  dataItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    alignContent: 'flex-end',
  },
  listData: {
    flexDirection: 'row',
    borderWidth: 2,
    padding: 10,
    borderRadius: 50,
    overflow: 'hidden',
  },
  imageData: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    overflow: 'hidden',
  },
  tag: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    marginRight: 2,
    padding: 7,
  },
  viewTags: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
});

export default RenderItem;
