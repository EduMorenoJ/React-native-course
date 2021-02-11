import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    //overwrite card style if they are define in card and add new ones if they are not 
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card:{
        shadowColor:'black', //shadow just works on ios
        shadowOffset:{width:0, height:2},
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:5, //just works on android
        backgroundColor:'white',
        padding:20,
        borderRadius:10         
    }
});

export default Card;