import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import RandomNumber from './RandomNumber.js';

export const Game = props => {
  const [selectedIndexArr, setSelectedIndexArr] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(
    props.initialSeconds,
  );

  const obj = useMemo(
    () => calculateRandom(props.randomNumCount),
    [props.randomNumCount],
  );
  const {randomNumArr, sliceEnd} = obj;

  let target = randomNumArr
    .slice(0, sliceEnd)
    .reduce((sum, curr) => sum + curr, 0);

  //TODO: shuffle numbers
  const shuffled = useMemo(() => {
    let shuffledArr = randomNumArr
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value);
    return shuffledArr;
  }, [randomNumArr]);

  const handleSelecedIndex = id => {
    setSelectedIndexArr(oldArr => [...oldArr, id]);
    console.log('selectedIndexArr: ' + selectedIndexArr);
  };
  const isIndexSelected = index => {
    return selectedIndexArr.indexOf(index) > -1;
  };
  useEffect(() => {
    if (remainingSeconds > 0 && gameStatus === 'Playing') {
      const interval = setInterval(() => {
        setRemainingSeconds(remainingSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  });
  const sumCalculated = () => {
    let sum = selectedIndexArr.reduce((acc, curr) => {
      return acc + shuffled[curr];
    }, 0);
    console.log('Sum: ' + sum);
    if (remainingSeconds === 0) {
      return 'Lost';
    } else {
      if (sum < target) {
        return 'Playing';
      }
      if (sum === target) {
        return 'Win';
      }
      if (sum > target) {
        return 'Lost';
      }
    }
  };
  let gameStatus = sumCalculated();
  return (
    <View style={GameStyle.container}>
      <Text style={[GameStyle.target, GameStyle[`STATUS_${gameStatus}`]]}>
        {target}
      </Text>
      <View style={GameStyle.randNumContainer}>
        {shuffled.map((singleNum, index) => (
          <RandomNumber
            key={index}
            id={index}
            value={singleNum}
            onPress={handleSelecedIndex}
            isSelected={isIndexSelected(index) || gameStatus !== 'Playing'}
          />
        ))}
      </View>
      <Text style={GameStyle.target}>{remainingSeconds}</Text>
      <Text style={GameStyle.target}>{gameStatus}</Text>
      <Button
        title="Restart"
        style={GameStyle.target}
        color="#ddd"
        onPress={props.onPlayAgain}
      />
    </View>
  );
};

const calculateRandom = randomNumCount => {
  let randomNumArr = Array.from({length: randomNumCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  let sliceEnd = 1 + Math.floor(Math.random() * randomNumCount);
  let obj = {
    randomNumArr: randomNumArr,
    sliceEnd: sliceEnd,
  };
  return obj;
};

const GameStyle = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    marginTop: 40,
    paddingTop: 30,
    flex: 1,
    // justifyContent: 'center',
  },
  target: {
    fontSize: 40,
    backgroundColor: '#ddd',
    textAlign: 'center',
    marginTop: 40,
    marginHorizontal: 50,
  },
  randNumContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  randNum: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 80,
  },
  STATUS_Playing: {
    backgroundColor: '#ddd',
  },
  STATUS_Win: {
    backgroundColor: 'green',
  },
  STATUS_Lost: {
    backgroundColor: 'red',
  },
});
export default Game;
