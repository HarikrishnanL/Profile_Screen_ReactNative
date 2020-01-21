import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const RadioButton = props => {
    return (
        <TouchableOpacity style={styles.circle} onPress={props.onPress}>
            {props.checked ? (<View style={styles.checkedCircle} />) : (<View />)}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 7,
        backgroundColor: '#131313',
    },
});

export default RadioButton;