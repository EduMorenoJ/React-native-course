import React, {useState} from 'react';
import { requireNativeComponent, StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StarGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  
  const [guessRound, setGuessRounds] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);


  if (!dataLoaded){
    return( 
      //app loading wait until fetchFont is done and when it finish, apploading set setDataLoaded to true
      //just make render wait until something is done
      //onError 
      <AppLoading 
        startAsync={fetchFont} 
        onFinish={()=> setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
  

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRound <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  }
  else if (guessRound > 0){
    content = <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
  }
 

  return (
    <View style={styles.screen}>
      <Header title='Guess a number'/>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
