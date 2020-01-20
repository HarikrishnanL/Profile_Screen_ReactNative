import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Image, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container, Radio, Card, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RadioButton from './RadioButton';

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RadioButtonMale: false,
            RadioButtonFemale: false,
            emailId: ''
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
        let email = [].concat(Email);
        let emailid = email[0].trim();
        console.log(email)
        console.log(emailid)

        // if (reg.test(emailid) == true) {
        this.props.OnRenderProfileFetchEmail(emailid)
        // }
        // else {
        // ToastAndroid.show("Entered Valid email", ToastAndroid.SHORT)
        // }

    }

    MobileNumberHandler = (MobileNumber) => {
        var mob = /^[1-9]{1}[0-9]{9}$/;
        let mobile = [].concat(MobileNumber);
        let mobileNo = mobile[0].trim();

        // if (mob.test(mobileNo) == true && isNaN(mobileNo) != true) {
        this.props.OnRenderProfileFetchMobile(mobileNo)
        // } else {
        // ToastAndroid.show("Entered Valid mobile Number", ToastAndroid.SHORT)
        // }

    }

    RadioButtonHandlerMale = (RadioData) => {
        this.props.OnRenderRadioFetchMale(RadioData)
        this.setState({
            RadioButtonMale: this.props.ProfileInfo.MaleRadioData,
            RadioButtonFemale: false
        })
    }

    RadioButtonHandlerFemale = (RadioData) => {
        this.props.OnRenderRadioFetchFemale(RadioData)
        this.setState({
            RadioButtonMale: false,
            RadioButtonFemale: this.props.ProfileInfo.FemaleRadioData
        })
    }
    onNavigationHandler = () => {

        console.log(this.props.ProfileInfo)
        // if (this.props.ProfileInfo.FirstName.length > 0 && this.props.ProfileInfo.LastName.length > 0) {
        //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //     let mob = /^[1-9]{1}[0-9]{9}$/;
        //     if (reg.test(this.props.ProfileInfo.Email) == true && mob.test(this.props.ProfileInfo.MobileNumber) == true && isNaN(this.props.ProfileInfo.MobileNumber) != true) {
        //         console.log("work");
        //         this.props.navigation.navigate('ProfileView', { Data: [this.props.ProfileInfo] })
        //     } else {
        //         ToastAndroid.show("Entered valid input", ToastAndroid.SHORT)
        //     }
        // }
        // else {
        //     ToastAndroid.show("Entered your name", ToastAndroid.SHORT)
        // }

        if (this.props.ProfileInfo.FirstName !== "" && this.props.ProfileInfo.LastName !== "") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let mob = /^[1-9]{1}[0-9]{9}$/;
            if (mob.test(this.props.ProfileInfo.MobileNumber) == true && isNaN(this.props.ProfileInfo.MobileNumber) != true) {
                if (reg.test(this.props.ProfileInfo.Email) == true) {
                    this.props.navigation.navigate('ProfileView', { Data: [this.props.ProfileInfo] })
                } else {
                    ToastAndroid.show("Entered valid email", ToastAndroid.SHORT)
                }

            } else {
                ToastAndroid.show("Entered valid 10 digit number", ToastAndroid.SHORT)
            }
        }
        else {
            ToastAndroid.show("Entered your name", ToastAndroid.SHORT)
        }

    }



    render() {
        console.log(this.props.ProfileInfo)

        return (
            <Container>
                <KeyboardAwareScrollView>
                    <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 5 }}>Profile Information</Text>
                    <View>
                        <TouchableOpacity onPress={this.chooseFile} style={{ width: "50%", flexDirection: 'row', alignSelf: 'center' }}>
                            {this.props.ProfileInfo.Picdata == "" ? (
                                <Image
                                    source={{
                                        uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                                    }}
                                    style={{ width: 170, height: 170, alignSelf: 'center', borderRadius: 170 / 2 }}
                                />
                            ) :
                                (
                                    <Image
                                        source={{
                                            uri: 'data:image/jpeg;base64,' + this.props.ProfileInfo.Picdata,
                                        }}
                                        style={{ width: 170, height: 170, alignSelf: 'center', borderRadius: 170 / 2 }}
                                    />
                                )
                            }

                            <Icon style={{ marginTop: 110, marginLeft: -10 }} name='create' />
                        </TouchableOpacity>



                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35, fontSize: 17 }}
                            placeholder={'First Name'}
                            // value={this.props.ProfileInfo.FirstName}
                            onChangeText={this.FirstNameHandler}

                        />
                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'Last Name'}
                            // value={this.props.ProfileInfo.LastName}
                            onChangeText={this.LastNameHandler}
                        />

                        <View style={{ flexDirection: 'row', marginRight: 5, marginTop: 25, marginLeft: 25 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, justifyContent: 'center' }} onPress={this.RadioButtonHandlerMale}>
                                <RadioButton checked={this.props.ProfileInfo.MaleRadioData} onPress={this.RadioButtonHandlerMale} />
                                <Text style={{ fontSize: 14 }}>Male</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10 }} onPress={this.RadioButtonHandlerFemale} >
                                <RadioButton checked={this.props.ProfileInfo.FemaleRadioData} onPress={this.RadioButtonHandlerFemale} />
                                <Text style={{ fontSize: 14 }}>Female</Text>
                            </TouchableOpacity>

                        </View>

                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35, marginTop: 15 }}
                            placeholder={'Mobile Number'}
                            keyboardType='numeric'
                            // value={this.props.ProfileInfo.MobileNumber}
                            onChangeText={this.MobileNumberHandler}
                        />

                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'Email'}
                            // value={this.props.ProfileInfo.Email[0]}
                            onChangeText={this.EmailHandler}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 40 }}>

                            <TouchableOpacity style={styles.customBtn} onPress={() => this.onNavigationHandler()}>
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
    customCancelBtn: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        height: '100%',
        width: '30%',
        borderColor: "#c7cbd1",
        borderRadius: 20

    },
    customCancelBtnText: {
        fontSize: 20,
        color: "#000000",
        fontWeight: '200',
        marginTop: 3

    }
})
