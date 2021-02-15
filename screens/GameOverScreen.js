import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {

    return(
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
            <Image 
                fadeDuration={300}
                style={styles.image} 
                //source={require('../assets/game-over.jpeg')}
                source={{uri:'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/2T0t-6V/videoblocks-game-over-8-bit-funky-a-funky-colorful-4k-game-over-screen-animation-letters-falling-towards-the-center-8-bit-retro-style-red-and-yellow_hcqx9_kax_thumbnail-full06.png'}}
                resizeMode='cover'
            />
            </View>
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button title="New Game" onPress={props.onRestart}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        width:300,
        height: 300,
        borderRadius:150,
        borderWidth: 3,
        borderColor:'black',
        overflow:'hidden',
        margin:30
    }
});

export default GameOverScreen;