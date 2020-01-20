import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Container } from 'native-base';

export default class ProfileViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.OnRenderProfileView();
    }

    render() {
        console.log(this.props.navigation.state.params.Data)
        return (
            <Container>

                <ScrollView>
                    <Image
                        source={{
                            uri: 'data:image/jpeg;base64,' + this.props.navigation.state.params.Data.map(x => x.Picdata),
                        }}
                        style={{ width: 170, height: 170, alignSelf: 'center', borderRadius: 170 / 2, marginTop: 20 }}
                    />

                    <View style={{ marginTop: 30, marginLeft: 50 }}>
                        <Text style={{ fontSize: 14, color: '#c7cbd1' }}>Name</Text>
                        <Text style={{ fontSize: 15, borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%" }}>{this.props.navigation.state.params.Data.map(x => x.FirstName + " " + x.LastName)}</Text>


                    </View>

                    <View style={{ marginTop: 20, marginLeft: 50 }}>
                        <Text style={{ fontSize: 14, color: '#c7cbd1' }}>Mobile</Text>
                        <Text style={{ fontSize: 15, borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%" }}>{this.props.navigation.state.params.Data.map(x => x.MobileNumber)}</Text>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 50 }}>
                        <Text style={{ fontSize: 14, color: '#c7cbd1' }}>Email</Text>
                        <Text style={{ fontSize: 15, borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%" }}>{this.props.navigation.state.params.Data.map(x => x.Email)}</Text>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 50 }}>
                        <Text style={{ fontSize: 14, color: '#c7cbd1' }}>Gender</Text>
                        {this.props.navigation.state.params.Data.find(x => x.MaleRadioData == true) ? (
                            <Text style={{ fontSize: 15, borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%" }}>Male</Text>
                        ) : (
                                <Text style={{ fontSize: 15, borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%" }}>Female</Text>
                            )}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <TouchableOpacity style={styles.customBtn} onPress={() => this.props.navigation.navigate('Profile')}>
                            <View style={styles.customBtnView}>
                                <Text style={styles.customBtnText}> Edit </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </Container>
        )
    }

}

const styles = StyleSheet.create({
    customBtn: {
        backgroundColor: '#ff6f61',
        borderWidth: 1,
        height: 40,
        width: '30%',
        marginTop: 10,
        borderColor: "#c7cbd1",
        borderRadius: 20

    },
    customBtnText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: '200',
        marginTop: 3
    },
    customBtnView: {
        alignItems: 'center'
    },
    fontStyle: {
        fontSize: 20
    },
    fontStyle2: {
        fontSize: 15
    }
})