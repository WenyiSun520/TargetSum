import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
//TouchableOpacity
//TouchableHighlight

export const RandomNumber = props => {
  const handlePress = () => {
    if (props.isSelected) {
      return;
    }
    props.onPress(props.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text
        key={props.index}
        style={[
          RandomNumberStyle.target,
          RandomNumberStyle.randNum,
          props.isSelected && RandomNumberStyle.selecedRandom,
        ]}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
};

const RandomNumberStyle = StyleSheet.create({
  target: {
    fontSize: 40,
    backgroundColor: '#ddd',
    textAlign: 'center',
    marginTop: 40,
    marginHorizontal: 50,
  },
  randNum: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 80,
  },
  selecedRandom: {
    opacity: 0.3,
  },
});
export default RandomNumber;
