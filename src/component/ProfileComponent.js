import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container, Radio, Card } from 'native-base';
import ImagePicker from 'react-native-image-picker';

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RadioButtonMale: false,
            RadioButtonFemale: false
        }
    }
    chooseFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.props.OnRenderProfilePic(source.data)

                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // this.setState({
                //     filePath: source,
                // });
            }
        });
    };
    FirstNameHandler = (FirstName) => {
        this.props.OnRenderProfileFetch(FirstName);
    }

    LastNameHandler = (LastName) => {
        this.props.OnRenderProfileFetchLastName(LastName)
    }

    EmailHandler = (Email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let email = [].concat(Email)
        if (reg.test(email) == true) {
            this.props.OnRenderProfileFetchEmail(email)
        }
    }

    MobileNumberHandler = (MobileNumber) => {
        this.props.OnRenderProfileFetchMobile(MobileNumber)
    }

    RadioButtonHandlerMale = (RadioData) => {
        this.props.OnRenderRadioFetchMale(RadioData)
        return this.setState({
            RadioButtonMale: this.props.ProfileInfo.MaleRadioData,
            RadioButtonFemale: false
        })
    }

    RadioButtonHandlerFemale = (RadioData) => {
        this.props.OnRenderRadioFetchFemale(RadioData)
        return this.setState({
            RadioButtonMale: false,
            RadioButtonFemale: this.props.ProfileInfo.FemaleRadioData
        })
    }



    render() {
        console.log(this.props.ProfileInfo)

        return (
            <Container>
                <KeyboardAwareScrollView>
                    <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 10 }}>Profile Information</Text>
                    <View>
                        <TouchableOpacity onPress={this.chooseFile}>
                            <Text style={{ alignSelf: 'center', paddingTop: 5 }} >Choose File </Text>
                            <Image
                                source={{
                                    uri: 'data:image/jpeg;base64,' + this.props.ProfileInfo.Picdata,
                                }}
                                style={{ width: 200, height: 200, alignSelf: 'center', borderRadius: 200 / 2 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{width:'100%'}}>
                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'First Name'}
                            value={this.props.ProfileInfo.FirstName}
                            onChangeText={this.FirstNameHandler}
                        />
                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'Last Name'}
                            value={this.props.ProfileInfo.LastName}
                            onChangeText={this.LastNameHandler}
                        />
                    </View>

                    <Card style={{ height: 45, marginTop: 15, marginLeft: 35, width: "80%" }}>
                        <View style={{ flexDirection: 'row', marginRight: 5, marginTop: 10, marginLeft: 20 }}>

                            <Text style={{ marginLeft: 5, marginRight: 10, fontSize: 14 }}>Gender:</Text>

                            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, justifyContent: 'center' }} onPress={this.RadioButtonHandlerMale}>
                                <Radio selected={this.state.RadioButtonMale}  />
                                <Text style={{ marginLeft: 5, fontSize: 14 }}>Male</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10 }} onPress={this.RadioButtonHandlerFemale}>
                                <Radio selected={this.state.RadioButtonFemale} />
                                <Text style={{ marginLeft: 5, fontSize: 14 }}>Female</Text>
                            </TouchableOpacity>

                        </View>
                    </Card>


                    <View>
                        {/* <Icon name="call" color="red" /> */}
                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'Mobile Number'}
                            value={this.props.ProfileInfo.MobileNumber}
                            onChangeText={this.MobileNumberHandler}
                        />
                    </View>


                    <TextInput
                        style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                        placeholder={'Email'}
                        value={this.props.ProfileInfo.Email[0]}
                        onChangeText={this.EmailHandler}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>

                        <TouchableOpacity style={styles.customBtn} onPress={() => this.props.navigation.navigate('ProfileView', { Data: [this.props.ProfileInfo] })}>
                            <View style={styles.customBtnView}>
                                <Text style={styles.customBtnText}> Save </Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.customCancelBtn}>
                            <View style={styles.customBtnView}>
                                <Text style={styles.customCancelBtnText}> Cancel </Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
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
        borderColor: "#c7cbd1"
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
    customCancelBtn: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        height: '100%',
        width: '30%',
        borderColor: "#c7cbd1"
    },
    customCancelBtnText: {
        fontSize: 20,
        color: "#000000",
        fontWeight: '200',
        marginTop: 3

    }
})
