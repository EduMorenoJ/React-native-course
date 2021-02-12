import React,{useState, useRef, useEffect} from 'react';
//useEffect allow you to run logic after each render cycle
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

	const [rounds, setRound] = useState(0);
	//it's similar to state but if you change its value, the component doesn't rerender
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	//this unroll the properties of props and store it in the varibles
	//here is used to pass as a dependenci of useEffect because props is change in
	//each rerender and it would rerun the useEffect function in each rerender -> no sense
	const {userChoice, onGameOver} = props;
	//you don't need the component to be redender so you use a reference -> useRef
	//the function pass as argument to useEffect will be evaluated after every render cycle
	useEffect(() =>{
		if (currentGuess === userChoice){
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]); 
	//useEffect second parameter indicates the dependencies that it has
	//so it will rerund just if one dependencie change but not when rerender

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
		//This line is not clear
		setRound(curRounds => curRounds + 1);
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