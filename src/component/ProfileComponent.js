import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Image, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container, Radio, Card, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RadioButton from './RadioButton';
import Toast, { DURATION } from 'react-native-easy-toast'
import RNRestart from 'react-native-restart';
import DatePicker from 'react-native-datepicker';


export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RadioButtonMale: false,
            RadioButtonFemale: false,
            emailId: '',
            date: "21-01-2020",
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
        // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let email = [].concat(Email);
        let emailid = email[0].trim();
        console.log(email)
        console.log(emailid)

        this.props.OnRenderProfileFetchEmail(emailid)
    }

    MobileNumberHandler = (MobileNumber) => {
        // var mob = /^[1-9]{1}[0-9]{9}$/;
        let mobile = [].concat(MobileNumber);
        let mobileNo = mobile[0].trim();

        this.props.OnRenderProfileFetchMobile(mobileNo)


    }

    RadioButtonHandlerMale = (RadioData) => {
        this.props.OnRenderRadioFetchMale(RadioData)
        // this.setState({
        //     RadioButtonMale: this.props.ProfileInfo.MaleRadioData,
        //     RadioButtonFemale: false
        // })
    }

    RadioButtonHandlerFemale = (RadioData) => {
        this.props.OnRenderRadioFetchFemale(RadioData)
        // this.setState({
        //     RadioButtonMale: false,
        //     RadioButtonFemale: this.props.ProfileInfo.FemaleRadioData
        // })
    }
    onNavigationHandler = () => {

        console.log(this.props.ProfileInfo)

        if (this.props.ProfileInfo.FirstName !== "") {
            if (this.props.ProfileInfo.LastName !== "") {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                let mob = /^[1-9]{1}[0-9]{9}$/;
                if (mob.test(this.props.ProfileInfo.MobileNumber) == true && isNaN(this.props.ProfileInfo.MobileNumber) != true) {
                    if (reg.test(this.props.ProfileInfo.Email) == true) {
                        if (this.props.ProfileInfo.MaleRadioData == true || this.props.ProfileInfo.FemaleRadioData == true) {
                            if (this.props.ProfileInfo.date !== "") {
                                this.props.navigation.navigate('ProfileView', { Data: [this.props.ProfileInfo] })
                            }
                        } else {
                            this.refs.toast.show('Select your gender!', 1000);

                        }
                    } else {
                        // ToastAndroid.show("Entered valid email", 0.1)
                        this.refs.toast.show('Enter valid email!', 1000);
                    }

                } else {
                    // ToastAndroid.show("Entered valid 10 digit number", 0.1)
                    this.refs.toast.show('Enter valid 10 digit number!', 1000);

                }
            } else {
                // ToastAndroid.show("Entered your LastName", 0.1)
                this.refs.toast.show('Enter your LastName!', 1000);

            }
        }
        else {
            // ToastAndroid.show("Entered your FirstName", 0.1)
            this.refs.toast.show('Enter your FirstName!', 1000);

        }

    }

    DateHandler = (date) => {
        this.props.OnRenderDateFetchData(date)
        this.setState({ date: this.props.ProfileInfo.date })
    }

    refreshScreen = (data) => {
        this.props.OnRefresh(data)
    }


    render() {
        console.log(this.props.ProfileInfo)


        return (
            <Container>

                <Toast ref="toast" />

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
                            value={this.props.ProfileInfo.FirstName}
                            onChangeText={this.FirstNameHandler}
                        />

                        {this.props.ProfileInfo.FirstName == "" ? (
                            <View>
                                <Text style={{ width: "80%", borderTopWidth: 1, borderColor: 'red', marginLeft: 35, fontSize: 17, fontSize: 12, color: 'red' }}>* Enter your first name</Text>
                            </View>

                        ) : (
                                <View />
                            )
                        }

                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'Last Name'}
                            onChangeText={this.LastNameHandler}
                            value={this.props.ProfileInfo.LastName}
                        />

                        {this.props.ProfileInfo.LastName == "" ? (
                            <View>
                                <Text style={{ width: "80%", borderTopWidth: 1, borderColor: 'red', marginLeft: 35, fontSize: 17, fontSize: 12, color: 'red' }}>* Enter your last name</Text>

                            </View>
                        ) :
                            (
                                <View />
                            )}

                        <View style={{ flexDirection: 'row', marginRight: 5, marginTop: 15, marginLeft: 25 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, justifyContent: 'center' }} onPress={this.RadioButtonHandlerMale}>
                                <RadioButton checked={this.props.ProfileInfo.MaleRadioData} onPress={this.RadioButtonHandlerMale} />
                                <Text style={{ fontSize: 14 }}>Male</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10, marginLeft: 1 }} onPress={this.RadioButtonHandlerFemale} >
                                <RadioButton checked={this.props.ProfileInfo.FemaleRadioData} onPress={this.RadioButtonHandlerFemale} />
                                <Text style={{ fontSize: 14 }}>Female</Text>
                            </TouchableOpacity>

                            <DatePicker
                                style={{ width: "45%", marginTop: -10 }}

                                date={this.state.date} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MMMM-YYYY"
                                minDate="01-01-1990"
                                maxDate="01-01-2024"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                // onDateChange={(date) => { this.setState({ date: date }) }}
                                onDateChange={this.DateHandler}
                            />
                        </View>

                        {(this.props.ProfileInfo.MaleRadioData == false && this.props.ProfileInfo.FemaleRadioData == false) ? (
                            this.props.ProfileInfo.date == "" ? (
                                <View>
                                    <Text style={{ width: "80%", marginLeft: 35, fontSize: 17, fontSize: 12, color: 'red' }}>* Select your gender and date of birth </Text>
                                </View>
                            ) : (
                                    <View />
                                )


                        ) : (
                                this.props.ProfileInfo.date == "" ? (
                                    <View>
                                        <Text style={{ width: "80%", marginLeft: 35, fontSize: 17, fontSize: 12, color: 'red' }}>* Select your gender and date of birth </Text>
                                    </View>
                                ) : (
                                        <View />
                                    )
                            )}

                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'Mobile Number'}
                            keyboardType='numeric'
                            value={this.props.ProfileInfo.MobileNumber}
                            onChangeText={this.MobileNumberHandler}
                        />
                        {this.props.ProfileInfo.MobileNumber == "" ? (
                            <View>
                                <Text style={{ width: "80%", borderTopWidth: 1, borderColor: 'red', marginLeft: 35, fontSize: 17, fontSize: 12, color: 'red' }}>* Enter your mobile number</Text>
                            </View>
                        )
                            : (
                                <View />
                            )}

                        <TextInput
                            style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "80%", marginLeft: 35 }}
                            placeholder={'Email'}
                            value={this.props.ProfileInfo.Email}
                            onChangeText={this.EmailHandler}
                        />
                        {this.props.ProfileInfo.Email == "" ? (
                            <View>

                                <Text style={{ width: "80%", borderTopWidth: 1, borderColor: 'red', marginLeft: 35, fontSize: 17, fontSize: 12, color: 'red' }}>* Enter your email</Text>

                            </View>

                        ) :
                            (
                                <View />
                            )}


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>

                            <TouchableOpacity style={styles.customBtn} onPress={() => this.onNavigationHandler()}>
                                <View style={styles.customBtnView}>
                                    <Text style={styles.customBtnText}> Save </Text>
                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.customCancelBtn} onPress={() => this.refreshScreen()}>
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
