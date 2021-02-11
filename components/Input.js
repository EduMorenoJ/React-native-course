import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
    //{...props} allow us to use all the props that TexInput have in our component
    //it's like you unroll all the props su pass by parameter to the textinput
    //see StartGameScreen line 14
    return <TextInput {...props} style={{...styles.input, ...props.style}}/>
};

const styles = StyleSheet.create({
    input:{
        height:30,
        borderBottomColor:'grey',
        borderBottomWidth: 1,
        marginVertical:10
    }
});

export default Input;