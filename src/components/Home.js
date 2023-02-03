import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
  // const [keyId, setKeyId] = useState(1);
  // const [numCount, setNumCount] = useState();
  // const [initialSeconds, setIniSeconds] = useState();
  // const resetGame = () => {
  //   setKeyId(keyId + 1);
  // };
  const handleDifficulty = () => {
    navigation.navigate('Details', {name: 'Wenyi'});
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome</Text>
      <Button onPress={handleDifficulty()} title="Easy" color="orange" />

      {/* <Button onPress={handleDifficulty(4, 30)} title="Easy" color="orange" />
      <Button onPress={handleDifficulty(6, 20)} title="Medium" color="orange" />
      <Button onPress={handleDifficulty(8, 10)} title="Hard" color="orange" /> */}
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  
});
