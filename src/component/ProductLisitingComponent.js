import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Card } from 'native-base';
import ImagePicker from 'react-native-image-picker';


export default class ProductListingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variationFlag: false,
            valueArray: [],
            disabled: false,
            submitFlag: true
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
        this.setState({ variationFlag: value, valueArray: [] })
        this.props.OnRenderProductVariationFlag(value)
    }

    addMore = () => {
        this.animatedValue.setValue(0);
        let newlyAddedValue = { index: this.index }
        this.setState({ disabled: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() => {
                this.index = this.index + 1;
                this.setState({ disabled: false });
            });
        });


    }

    VariationProductNameHandler = (VariationProductName) => {
        this.setState({ submitFlag: true });
        this.props.OnRenderVariationProductName(VariationProductName)
    }

    VariationProductPriceHandler = (VariationProductPrice) => {

        this.props.OnRenderVariationProductPrice(VariationProductPrice)
    }

    VariationProductQtyHandler = (VariationProductQty) => {

        this.props.OnRenderVariationProductQty(VariationProductQty)
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
        this.setState({ submitFlag: false });
        this.props.OnRenderVariationProductData(data)
    }

    NextScreen = () => {
        this.props.navigation.navigate('SingleProduct', { ProductData: this.props.ProductListingState });
    }

    ResetScreen = (Productdata) => {
        this.props.OnRenderProductResetData(Productdata)
    }

    render() {
        console.log(this.state.valueArray)
        console.log(this.props.ProductListingState);
        const animationValue = this.animatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [-59, 0]
            });

        let newArray = this.state.valueArray.map((item, key) => {
            return (
                <Animated.View key={key} style={[{ opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
                    <Card style={{ marginLeft: 10, marginTop: 10, marginRight: 10, height: 150 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View>
                                <TextInput
                                    style={{ marginLeft: 8, fontSize: 15 }}
                                    placeholder={'Variation Product Name'}
                                    onChangeText={this.VariationProductNameHandler}

                                />
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
                                />
                            </View>
                            <TouchableOpacity onPress={this.VariationProductImageHandler}>
                                {this.props.ProductListingState.VariationProductImage == "" ?
                                    (<Image
                                        source={{
                                            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                                        }}
                                        style={{ width: 140, height: 140, marginTop: 5 }}
                                    />)
                                    :
                                    (<Image
                                        source={{
                                            uri: 'data:image/jpeg;base64,' + this.props.ProductListingState.VariationProductImage,
                                        }}
                                        style={{ width: 140, height: 140, marginTop: 5 }}
                                    />)
                                }

                            </TouchableOpacity>

                        </View>

                    </Card>
                    {this.state.submitFlag == true && this.props.ProductListingState.VariationProductName !== "" ? (
                        <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={this.VariationProductSubmit}>
                            <View style={{ borderColor: 'green', borderWidth: 1, borderRadius: 10, height: 40, width: 100, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                                <Text>Submit</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                            <View />
                        )}

                </Animated.View>
            );
        });


        return (
            <Container>
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 13 }}>Name:</Text>
                                <TextInput
                                    style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "70%", marginLeft: 8, fontSize: 15 }}
                                    placeholder={'Product Name'}
                                    onChangeText={this.ProductNameHandler}
                                    value={this.props.ProductListingState.ProductName}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 13 }}>Price:</Text>
                                <TextInput
                                    keyboardType={'numeric'}
                                    //  numeric value
                                    style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "40%", marginLeft: 8, fontSize: 15 }}
                                    placeholder={'Product Price'}
                                    onChangeText={this.ProductPriceHandler}
                                // value={String(this.props.ProductListingState.ProductPrice)}

                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 13 }}>Quantity:</Text>
                                <TextInput
                                    keyboardType={'numeric'}
                                    //  numeric value
                                    style={{ borderBottomWidth: 0.5, borderColor: '#c7cbd1', width: "20%", marginLeft: 8, fontSize: 15, alignSelf: 'center' }}
                                    placeholder={'0'}
                                    onChangeText={this.ProductQuantityHandler}
                                // value={String(this.props.ProductListingState.ProductQty)}
                                />
                            </View>

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

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 17, marginTop: 8 }}>Image:</Text>
                                <TouchableOpacity style={{ flexDirection: "row", alignSelf: 'center' }} onPress={this.ProductImageHandler}>
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

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10, marginTop: 20 }}>
                                <Text style={{ fontSize: 17, marginTop: 8 }}>Variation:</Text>
                                <Switch
                                    style={{ marginTop: 7, marginLeft: 8 }}
                                    onValueChange={this.ProductVariationHandler}
                                    value={this.state.variationFlag}

                                />

                            </View>
                            {this.state.variationFlag == true ? (
                                <View>
                                    <Card style={{ marginLeft: 10, marginTop: 10, marginRight: 10, height: 150 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <View>
                                                <TextInput
                                                    style={{ marginLeft: 8, fontSize: 15 }}
                                                    placeholder={'Variation Product Name'}
                                                    onChangeText={this.VariationProductNameHandler}
                                                />
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

                                    </Card>
                                    {this.state.submitFlag == true && this.props.ProductListingState.VariationProductName !== "" ? (
                                        <View >
                                            <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={this.VariationProductSubmit}>
                                                <View style={{ borderColor: 'green', borderWidth: 1, borderRadius: 10, height: 40, width: 100, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                                                    <Text>Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    ) : (
                                            <View />
                                        )}

                                    <View>
                                        <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'center' }} onPress={this.addMore}>
                                            <Image source={{ uri: 'https://images.vexels.com/media/users/3/135544/isolated/preview/23724deafa9e7ec5830d49438d3e3f9f-colorful-button-more-add-icon-by-vexels.png', }}
                                                style={styles.buttonDesign}
                                            />

                                        </TouchableOpacity>

                                    </View>

                                    <View style={{ marginTop: 5 }}>{newArray}</View>
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
