import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container} from 'native-base';

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
                    style={{ width: 200, height: 200 ,alignSelf:'center',borderRadius:200/2,marginTop:20}}
                />

                <View style={{ flexDirection: 'row',alignSelf:'center',marginTop:10 }}>
                    <Text style={styles.fontStyle}>Name:</Text>
                    <Text style={styles.fontStyle}>{this.props.navigation.state.params.Data.map(x => x.FirstName + " " + x.LastName)}</Text>
                </View>

                <View style={{ flexDirection: 'row',alignSelf:'center',marginTop:10 }}>
                    <Text style={styles.fontStyle2}>MobileNumber:</Text>
                    <Text style={styles.fontStyle2}>{this.props.navigation.state.params.Data.map(x => x.MobileNumber)}</Text>
                </View>

                <View style={{ flexDirection: 'row',alignSelf:'center',marginTop:10 }}>
                    <Text style={styles.fontStyle2}>Email:</Text>
                    <Text style={styles.fontStyle2}>{this.props.navigation.state.params.Data.map(x => x.Email)}</Text>
                </View>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:10}}>
                 <Text style={styles.fontStyle2}>Gender:</Text>   
                {this.props.navigation.state.params.Data.find(x=>x.MaleRadioData == true)?(
                    <Text style={styles.fontStyle2}>Male</Text>
                ):(
                    <Text style={styles.fontStyle2}>Female</Text>
                )}
                </View>
                

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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
        height: '100%',
        width: '30%',
        marginTop:10,
        borderColor:"#c7cbd1"
        
    },
    customBtnText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: '200',
    },
    customBtnView: {
        alignItems: 'center'
    },
    fontStyle:{
        fontSize:20
    },
    fontStyle2:{
        fontSize:15
    }
})