import React,{useState, useRef} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';


//funtion outside component due to it not manage reusable data
//it's a way to improve performance so avoid to rerender it
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum =Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude){
        return generateRandomBetween(min,max,exclude);
    } 
    else{
        return rndNum;
    }
};

const GameScreen = props => {

    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
		const currentLow = useRef(1);
		const currentHigh = useRef(100);//it's similar to state but if you change its value, the component doesn't rerender
		//you don't need the component to be redender so you use a reference -> useRef
	const nextGuessHandler = direction => {
		if ((direction === 'lower' && currentGuess < props.userChoice) || (direction ==='greater' && currentGuess > props.userChoice)){
			Alert.alert('Don\'t lie!', 'You know that this is wrong..', [{text:'Sorry!', style:'cancel'}]);
			return ;
		}
		if (direction === 'lower'){
			currentHigh.current = currentGuess;
		}
		else{
			currentLow.current = currentGuess
		}

		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
	};

    
    return (
		<View style={styles.screen}>
			<Text>Oponent Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button title='LOWER' onPress={nextGuessHandler.bind(this,'lower')} />
				<Button title='GREATER' onPress={nextGuessHandler.bind(this,'greater')}/>
			</Card>

		</View>
    );
};

const styles = StyleSheet.create({
	screen:{
		flex:1,
		padding:10,
		alignItems:'center'
	},
	buttonContainer:{
		flexDirection:'row',
		justifyContent:'space-around',
		marginTop:20,
		width:300,
		maxWidth: '80%'
	}
});

export default GameScreen;