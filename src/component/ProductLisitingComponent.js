import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Card } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Modal from "react-native-modal";


export default class ProductListingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variationFlag: false,
            valueArray: [],
            disabled: false,
            submitFlag: true,
            variationArrayflag: false,
            initialFlag: false,
            variationValidationFlag: false,
            Vname: '',
            variation: [],
            ModalVisible: false
        }
        this.index = 0;
        this.animatedValue = new Animated.Value(0);
    }

    ProductNameHandler = (ProductName) => {
        this.props.OnRenderProductName(ProductName);
    }

    ProductPriceHandler = (ProductPrice) => {
        this.props.OnRenderProductPrice(ProductPrice);
    }

    ProductDescriptionHandler = (ProductDescription) => {
        this.props.OnRenderProductDescription(ProductDescription)
    }

    ProductQuantityHandler = (ProductQty) => {
        this.props.OnRenderProductQuantity(ProductQty)
    }

    ProductImageHandler = () => {
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
                let productSource = response;
                this.props.OnRenderProductImage(productSource.data)
            }
        });
    }

    ProductVariationHandler = (value) => {
        this.setState({ variationFlag: value, valueArray: [], ModalVisible: true })
        this.props.OnRenderProductVariationFlag(value)
    }

    addMore = () => {
        this.setState({
            variationValidationFlag: false,
            ModalVisible: true
        })
        // console.log("touching ths add button")
        // if (this.props.ProductListingState.VariationProductName !== "" && this.state.variationFlag == true) {
        //     this.animatedValue.setValue(0);
        //     let newlyAddedValue = { index: this.index }
        //     this.setState({ disabled: true, valueArray: [0] }, () => {
        //         Animated.timing(
        //             this.animatedValue,
        //             {
        //                 toValue: 1,
        //                 duration: 500,
        //                 useNativeDriver: true
        //             }
        //         ).start(() => {
        //             this.index = this.index + 1;
        //             this.setState({ disabled: false });
        //         });
        //     });

        //     // this.props.OnRenderVariationProductData(data)
        //     // this.setState({ variationArrayflag: true })

        // } else {
        //     this.setState({
        //         variationValidationFlag: true
        //     })
        // }

        // if (this.props.ProductListingState.Variation.length > 0) {
        //     // console.log("touch me")
        //     // console.log(this.state.ModalVisible)

        // }

    }

    VariationProductNameHandler = (VariationProductName) => {
        this.state.variation = [{
            VariationProductName: VariationProductName
        }]
        // this.props.OnRenderVariationProductData(this.state.variation);
        this.setState({ submitFlag: true });
        this.props.OnRenderVariationProductName(VariationProductName)
    }

    VariationProductPriceHandler = (VariationProductPrice) => {
        this.props.OnRenderVariationProductPrice(VariationProductPrice)


        if (this.props.ProductListingState.Variation.length > 0) {
            // console.log("price tag 1")
            let VariationRecord = []
            VariationRecord = this.props.ProductListingState.Variation.find(x => x.VariationProductName == this.props.ProductListingState.VariationProductName);
            if (VariationRecord.VariationProductName == this.props.ProductListingState.VariationProductName) {
                // console.log("price tag 2")
                this.state.variation = {
                    "VariationProductName": VariationRecord.VariationProductName,
                    "VariationProductPrice": VariationProductPrice
                }
                // this.props.OnRenderVariationProductData(this.state.variation);
            }
        } else {
            // console.log("price else tag 3")
            this.setState({ variationValidationFlag: true })
        }
        // console.log(this.state.variation)
    }

    VariationProductQtyHandler = (VariationProductQty) => {
        this.props.OnRenderVariationProductQty(VariationProductQty)
        if (this.props.ProductListingState.Variation.length > 0) {
            // console.log("records 1");
            let VariationRecord = []
            VariationRecord = this.props.ProductListingState.Variation.find(x => x.VariationProductName == this.props.ProductListingState.VariationProductName);
            // console.log(VariationRecord)
            if (VariationRecord.VariationProductName == this.props.ProductListingState.VariationProductName) {
                // console.log("records 2")

                this.state.variation = {
                    "VariationProductName": VariationRecord.VariationProductName,
                    "VariationProductPrice": this.props.ProductListingState.VariationProductPrice,
                    "VariationProductQty": VariationProductQty
                }
                // this.props.OnRenderVariationProductData(this.state.variation);


            }
        } else {
            // console.log("records 3")
            this.setState({ variationValidationFlag: true })
        }
        // console.log(this.state.variation)
    }

    VariationProductImageHandler = () => {

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
                let VariationproductSource = response;
                this.props.OnRenderVariationProductImage(VariationproductSource.data)
            }
        });
    }

    VariationProductSubmit = (data) => {

        if (this.props.ProductListingState.VariationProductName == "") {
            this.setState({ variationValidationFlag: true })
        } else {
            this.setState({ submitFlag: false, ModalVisible: false, variationArrayflag: true });

            this.props.OnRenderVariationProductData(data);
        }


    }
    ExtraModule = () => {
        if (this.props.ProductListingState.ProductName !== "" && this.props.ProductListingState.ProductPrice !== 0 && this.props.ProductListingState.ProductQty !== 0 && this.props.ProductListingState.ProductDescription !== "" && this.props.ProductListingState.ProductImageData !== "") {

            this.props.navigation.navigate('SingleProduct', { ProductData: this.props.ProductListingState });
        } else {
            this.setState({
                initialFlag: true,
                variationArrayflag: false,
                submitFlag: false,
                variationValidationFlag: true
            })
        }
    }

    NextScreen = () => {
        // if (this.props.ProductListingState.ProductName !== "" && this.props.ProductListingState.ProductPrice !== 0 && this.props.ProductListingState.ProductQty !== 0 && this.props.ProductListingState.ProductDescription !== "" && this.props.ProductListingState.ProductImageData !== "") {
        // this.props.OnRenderVariationProductData(data);
        // this.VariationProductSubmit(data);
        // this.props.navigation.navigate('SingleProduct', { ProductData: this.props.ProductListingState });

        // }

        // if (this.props.ProductListingState.ProductName !== "" && this.props.ProductListingState.ProductPrice !== 0 && this.props.ProductListingState.ProductQty !== 0 && this.props.ProductListingState.ProductDescription !== "" && this.props.ProductListingState.ProductImageData !== "") {
        this.ExtraModule();
        // }

        // else {
        //     this.setState({
        //         initialFlag: true,
        //         variationArrayflag: false,
        //         submitFlag: false,
        //         variationValidationFlag: true
        //     })
        // }
    }

    ResetScreen = (Productdata) => {
        this.setState({
            initialFlag: false
        })
        this.props.OnRenderProductResetData(Productdata)
    }





    render() {
        // console.log(this.state.valueArray)
        // console.log(this.state.Vname)
        // console.log(this.props.ProductListingState);
        const animationValue = this.animatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [-59, 0]
            });

        // let newArray = this.state.valueArray.map((item, key) => {
        //     return (
        //         <Animated.View key={key} style={[{ opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
        //             <Card style={{ marginLeft: 10, marginTop: 10, marginRight: 10, height: 150 }}>
        //                 <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        //                     <View>
        //                         <TextInput
        //                             style={{ marginLeft: 8, fontSize: 15 }}
        //                             placeholder={'Variation Product Name'}
        //                             onChangeText={this.VariationProductNameHandler}
        //                         // onSubmitEditing={this.VariationProductSubmit}
        //                         // onChange={this.VariationProductSubmit}

        //                         />
        //                         {this.props.ProductListingState.VariationProductName == "" && this.state.variationValidationFlag == true ?
        //                             (
        //                                 <View>
        //                                     <Text style={{ marginLeft: 15, fontSize: 12, color: 'red' }}>Enter your product Name!</Text>
        //                                 </View>
        //                             )
        //                             :
        //                             (
        //                                 <View />
        //                             )}
        //                         <TextInput
        //                             style={{ marginLeft: 8, fontSize: 15 }}
        //                             keyboardType={'numeric'}
        //                             placeholder={'Price'}
        //                             onChangeText={this.VariationProductPriceHandler}
        //                         // onSubmitEditing={this.VariationProductSubmit}

        //                         />
        //                         <TextInput
        //                             style={{ marginLeft: 8, fontSize: 15 }}
        //                             keyboardType={'numeric'}
        //                             placeholder={'Qty'}
        //                             onChangeText={this.VariationProductQtyHandler}
        //                         // onSubmitEditing={this.VariationProductSubmit}

        //                         />
        //                     </View>
        //                     <TouchableOpacity onPress={this.VariationProductImageHandler}>
        //                         {this.props.ProductListingState.VariationProductImage == "" ?
        //                             (<Image
        //                                 source={{
        //                                     uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        //                                 }}
        //                                 style={{ width: 140, height: 140, marginTop: 5 }}
        //                             />)
        //                             :
        //                             (<Image
        //                                 source={{
        //                                     uri: 'data:image/jpeg;base64,' + this.props.ProductListingState.VariationProductImage,
        //                                 }}
        //                                 style={{ width: 140, height: 140, marginTop: 5 }}
        //                             />)
        //                         }

        //                     </TouchableOpacity>

        //                 </View>

        //             </Card>

        //         </Animated.View>
        //     );
        // });


        return (
            <Container>
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 13 }}>Name:</Text>
                                <TextInput
                                    style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "70%", marginLeft: 45, fontSize: 15 }}
                                    placeholder={'Product Name'}
                                    onChangeText={this.ProductNameHandler}
                                    value={this.props.ProductListingState.ProductName}
                                />
                            </View>
                            {this.state.initialFlag == true && this.props.ProductListingState.ProductName == "" ?
                                (
                                    <View>
                                        <Text style={{ marginLeft: 105, fontSize: 12, color: 'red' }}>Enter your name!</Text>
                                    </View>
                                )
                                :
                                (
                                    <View />
                                )}

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 13 }}>Price:</Text>
                                <TextInput
                                    keyboardType={'numeric'}
                                    //  numeric value
                                    style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "40%", marginLeft: 52, fontSize: 15 }}
                                    placeholder={'Product Price'}
                                    onChangeText={this.ProductPriceHandler}
                                    value={String(this.props.ProductListingState.ProductPrice)}

                                />
                            </View>
                            {this.state.initialFlag == true && this.props.ProductListingState.ProductPrice == 0 ?
                                (
                                    <View>
                                        <Text style={{ marginLeft: 105, fontSize: 12, color: 'red' }}>Enter your product price!</Text>
                                    </View>
                                )
                                :
                                (
                                    <View />
                                )}

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 13 }}>Quantity:</Text>
                                <TextInput
                                    keyboardType={'numeric'}
                                    //  numeric value
                                    style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "20%", marginLeft: 30, fontSize: 15, alignSelf: 'center' }}
                                    placeholder={'0'}
                                    onChangeText={this.ProductQuantityHandler}
                                    value={String(this.props.ProductListingState.ProductQty)}
                                />
                            </View>

                            {this.state.initialFlag == true && this.props.ProductListingState.ProductQty == 0 ?
                                (
                                    <View>
                                        <Text style={{ marginLeft: 105, fontSize: 12, color: 'red' }}>Enter your product qty!</Text>
                                    </View>
                                )
                                :
                                (
                                    <View />
                                )}

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 8 }}>Description:</Text>
                                <TextInput
                                    maxLength={150}
                                    multiline={true}
                                    numberOfLines={4}
                                    textAlignVertical={'top'}
                                    style={{ borderWidth: 1, borderColor: '#c7cbd1', width: "67%", marginLeft: 8, fontSize: 15, alignSelf: 'center' }}
                                    placeholder={'Product description'}
                                    onChangeText={this.ProductDescriptionHandler}
                                    value={this.props.ProductListingState.ProductDescription}
                                />
                            </View>

                            {this.state.initialFlag == true && this.props.ProductListingState.ProductDescription == "" ?
                                (
                                    <View>
                                        <Text style={{ marginLeft: 105, fontSize: 12, color: 'red' }}>Enter your product description!</Text>
                                    </View>
                                )
                                :
                                (
                                    <View />
                                )}

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 8 }}>Image:</Text>
                                <TouchableOpacity style={{ flexDirection: "column", justifyContent: 'center', marginLeft: 44 }} onPress={this.ProductImageHandler}>
                                    <Text style={{ marginTop: 8, marginLeft: 8 }}>Choose File </Text>
                                    {this.props.ProductListingState.ProductImageData == "" ? (
                                        <Image
                                            source={{
                                                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                                            }}
                                            style={{ width: 120, height: 120, alignSelf: 'center' }}
                                        />
                                    ) :
                                        (
                                            <Image
                                                source={{
                                                    uri: 'data:image/jpeg;base64,' + this.props.ProductListingState.ProductImageData,
                                                }}
                                                style={{ width: 120, height: 120, alignSelf: 'center' }}
                                            />
                                        )
                                    }

                                </TouchableOpacity>
                            </View >

                            {this.state.initialFlag == true && this.props.ProductListingState.ProductImageData == "" ?
                                (
                                    <View>
                                        <Text style={{ marginLeft: 105, fontSize: 12, color: 'red' }}>Choose your product image!</Text>
                                    </View>
                                )
                                :
                                (
                                    <View />
                                )}

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 20 }}>
                                <Text style={{ fontSize: 17, marginTop: 8 }}>Variation:</Text>
                                <Switch
                                    style={{ marginTop: 7, marginLeft: 22 }}
                                    onValueChange={this.ProductVariationHandler}
                                    value={this.state.variationFlag}

                                />

                            </View>
                            {this.state.variationFlag == true ? (
                                <View>
                                    {this.state.variationArrayflag == false ?
                                        (
                                            // <Card style={{ marginLeft: 10, marginTop: 10, marginRight: 10, height: 150 }}>
                                            //     <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            //         <View>
                                            //             <TextInput
                                            //                 style={{ marginLeft: 8, fontSize: 15 }}
                                            //                 placeholder={'Variation Product Name'}
                                            //                 onChangeText={this.VariationProductNameHandler}
                                            //             // onSubmitEditing={this.VariationProductSubmit}
                                            //             // onSubmitEditing={({ nativeEvent }) =>
                                            //             //     this.setState({ Vname: nativeEvent.text })
                                            //             // }

                                            //             />
                                            //             {this.state.variationValidationFlag == true && this.props.ProductListingState.VariationProductName == "" ?
                                            //                 (
                                            //                     <View>
                                            //                         <Text style={{ marginLeft: 15, fontSize: 12, color: 'red' }}>Enter your product Name!</Text>
                                            //                     </View>
                                            //                 )
                                            //                 :
                                            //                 (
                                            //                     <View />
                                            //                 )}
                                            //             <TextInput
                                            //                 style={{ marginLeft: 8, fontSize: 15 }}
                                            //                 keyboardType={'numeric'}
                                            //                 placeholder={'Price'}
                                            //                 onChangeText={this.VariationProductPriceHandler}
                                            //             // onSubmitEditing={this.VariationProductSubmit}

                                            //             />
                                            //             <TextInput
                                            //                 style={{ marginLeft: 8, fontSize: 15 }}
                                            //                 keyboardType={'numeric'}
                                            //                 placeholder={'Qty'}
                                            //                 onChangeText={this.VariationProductQtyHandler}
                                            //             // onSubmitEditing={this.VariationProductSubmit}

                                            //             />
                                            //         </View>
                                            //         <TouchableOpacity onPress={this.VariationProductImageHandler}>
                                            //             {this.props.ProductListingState.VariationProductImage == "" ?
                                            //                 (
                                            //                     <Image
                                            //                         source={{
                                            //                             uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                                            //                         }}
                                            //                         style={{ width: 140, height: 140, marginTop: 5 }}
                                            //                     />
                                            //                 )
                                            //                 :
                                            //                 (
                                            //                     <Image
                                            //                         source={{
                                            //                             uri: 'data:image/jpeg;base64,' + this.props.ProductListingState.VariationProductImage,
                                            //                         }}
                                            //                         style={{ width: 140, height: 140, marginTop: 5 }}
                                            //                     />
                                            //                 )}

                                            //         </TouchableOpacity>
                                            //     </View>

                                            // </Card>
                                            <Modal isVisible={this.state.ModalVisible}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Card >
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ flexDirection: 'column' }}>
                                                                <TextInput
                                                                    style={{ marginLeft: 8, fontSize: 15 }}
                                                                    placeholder={'Variation Product Name'}
                                                                    onChangeText={this.VariationProductNameHandler}
                                                                />
                                                                {this.state.variationValidationFlag == true && this.props.ProductListingState.VariationProductName == "" ?
                                                                    (
                                                                        <View>
                                                                            <Text style={{ marginLeft: 15, fontSize: 12, color: 'red' }}>Enter your product Name!</Text>
                                                                        </View>
                                                                    )
                                                                    :
                                                                    (
                                                                        <View />
                                                                    )}
                                                                <TextInput
                                                                    style={{ marginLeft: 8, fontSize: 15 }}
                                                                    keyboardType={'numeric'}
                                                                    placeholder={'Price'}
                                                                    onChangeText={this.VariationProductPriceHandler}
                                                                />

                                                                <TextInput
                                                                    style={{ marginLeft: 8, fontSize: 15 }}
                                                                    keyboardType={'numeric'}
                                                                    placeholder={'Qty'}
                                                                    onChangeText={this.VariationProductQtyHandler}
                                                                // onSubmitEditing={this.VariationProductSubmit}
                                                                />
                                                            </View>

                                                            <TouchableOpacity onPress={this.VariationProductImageHandler}>
                                                                {this.props.ProductListingState.VariationProductImage == "" ?
                                                                    (
                                                                        <Image
                                                                            source={{
                                                                                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                                                                            }}
                                                                            style={{ width: 140, height: 140, marginTop: 5 }}
                                                                        />
                                                                    )
                                                                    :
                                                                    (
                                                                        <Image
                                                                            source={{
                                                                                uri: 'data:image/jpeg;base64,' + this.props.ProductListingState.VariationProductImage,
                                                                            }}
                                                                            style={{ width: 140, height: 140, marginTop: 5 }}
                                                                        />
                                                                    )}

                                                            </TouchableOpacity>
                                                        </View>
                                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', height: 40, width: 80, marginTop: 20 }} onPress={this.VariationProductSubmit}>
                                                            <Text>add Product</Text>
                                                        </TouchableOpacity>
                                                    </Card>
                                                </View>

                                            </Modal>
                                        )
                                        :
                                        (
                                            this.props.ProductListingState.Variation.map(x => {
                                                return (
                                                    <Card key={x.VariationProductName} style={{ marginLeft: 10, marginTop: 10, marginRight: 10, height: 150 }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View>
                                                                <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 10, fontSize: 15 }}>{x.VariationProductName}</Text>
                                                                <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 30, fontSize: 15 }}>{x.VariationProductPrice}</Text>
                                                                <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 30, fontSize: 15 }}> {x.VariationProductQty} </Text>
                                                            </View>
                                                            <Image
                                                                source={{
                                                                    uri: 'data:image/jpeg;base64,' + x.VariationProductImage,
                                                                }}
                                                                style={{ width: 140, height: 140, marginTop: 5, marginRight: 9 }}
                                                            />
                                                        </View>

                                                    </Card>
                                                )
                                            })
                                        )}






                                    <View>
                                        <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'center' }} onPress={this.addMore}>
                                            <Image source={{ uri: 'https://images.vexels.com/media/users/3/135544/isolated/preview/23724deafa9e7ec5830d49438d3e3f9f-colorful-button-more-add-icon-by-vexels.png', }}
                                                style={styles.buttonDesign}
                                            />

                                        </TouchableOpacity>

                                    </View>

                                    {/* <View style={{ marginTop: 5 }}>{newArray}</View> */}

                                    <Modal isVisible={this.state.ModalVisible}
                                        onBackdropPress={() => this.setState({ ModalVisible: false })}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Card >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <TextInput
                                                            style={{ marginLeft: 8, fontSize: 15 }}
                                                            placeholder={'Variation Product Name'}
                                                            onChangeText={this.VariationProductNameHandler}
                                                        />
                                                        {this.state.variationValidationFlag == true && this.props.ProductListingState.VariationProductName == "" ?
                                                            (
                                                                <View>
                                                                    <Text style={{ marginLeft: 15, fontSize: 12, color: 'red' }}>Enter your product Name!</Text>
                                                                </View>
                                                            )
                                                            :
                                                            (
                                                                <View />
                                                            )}
                                                        <TextInput
                                                            style={{ marginLeft: 8, fontSize: 15 }}
                                                            keyboardType={'numeric'}
                                                            placeholder={'Price'}
                                                            onChangeText={this.VariationProductPriceHandler}
                                                        />

                                                        <TextInput
                                                            style={{ marginLeft: 8, fontSize: 15 }}
                                                            keyboardType={'numeric'}
                                                            placeholder={'Qty'}
                                                            onChangeText={this.VariationProductQtyHandler}
                                                        // onSubmitEditing={this.VariationProductSubmit}
                                                        />
                                                    </View>

                                                    <TouchableOpacity onPress={this.VariationProductImageHandler}>
                                                        {this.props.ProductListingState.VariationProductImage == "" ?
                                                            (
                                                                <Image
                                                                    source={{
                                                                        uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                                                                    }}
                                                                    style={{ width: 140, height: 140, marginTop: 5 }}
                                                                />
                                                            )
                                                            :
                                                            (
                                                                <Image
                                                                    source={{
                                                                        uri: 'data:image/jpeg;base64,' + this.props.ProductListingState.VariationProductImage,
                                                                    }}
                                                                    style={{ width: 140, height: 140, marginTop: 5 }}
                                                                />
                                                            )}

                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', height: 40, width: 80, marginTop: 20 }} onPress={this.VariationProductSubmit}>
                                                    <Text>add Product</Text>
                                                </TouchableOpacity>
                                            </Card>
                                        </View>

                                    </Modal>
                                </View>
                            ) : (
                                    <View />
                                )}


                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40, marginBottom: 20 }} >
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.NextScreen}>
                                    <View style={{ borderColor: 'green', borderWidth: 1, borderRadius: 10, height: 40, width: 100, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                                        <Text>Next</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.ResetScreen}>
                                    <View style={{ borderColor: 'red', borderWidth: 1, borderRadius: 10, height: 40, width: 100, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                                        <Text>Reset</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>




                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    headerText: {
        color: 'white',
        fontSize: 25
    },
    buttonDesign: {
        // position: 'absolute',
        // right: 25,
        // bottom: 15,
        // top: 40,
        borderRadius: 30,
        width: 60,
        height: 60,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

}) 
