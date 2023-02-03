import React,{useState} from 'react';
import Game from './Game.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './Home.js';

const Stack = createNativeStackNavigator();
export default function App() {
  const [keyId, setKeyId] = useState(1);
  const resetGame = () => {
    setKeyId(keyId + 1);
  };
  return (
    <Game
      key={keyId}
      onPlayAgain={resetGame}
      initialSeconds={20}
      randomNumCount={6}
    />
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{title: 'Welcome'}}
    //     />
    //     <Stack.Screen name="Game" component={Game} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
