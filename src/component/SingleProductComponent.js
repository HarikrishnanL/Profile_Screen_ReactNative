import React, { Component } from "react";
import { View, Text, Modal, Alert, TouchableHighlight, Image, TextInput, Picker, TouchableOpacity } from 'react-native';
import { Container, Card } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";

export default class SingleProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree",
            ],
            modalVisible: false,
            VariationName: '',
            ImageIndex: 0
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.ProductData)

    }

    ModalImage = (index) => {
        this.setModalVisible(true);
        this.setState({ ImageIndex: index })
        console.log(index)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    findSomething = (itemValue, itemIndex) => {
        console.log("find");
        console.log(itemValue);
        console.log(itemIndex);
        this.setState({ VariationName: itemValue })
        console.log(this.state.VariationName)

    }


    render() {
        var index = 0;
        let ImageArray = this.props.navigation.state.params.ProductData.Variation.filter(x => x.VariationProductImage);
        // let ImageTest = ImageArray.concat("data:image/jpeg;base64," + this.props.navigation.state.params.ProductData.ProductImageData)
        let ImageTest = ImageArray.map(x => "data:image/jpeg;base64," + x.VariationProductImage).concat("data:image/jpeg;base64," + this.props.navigation.state.params.ProductData.ProductImageData);
        let ImageWork = ImageArray.map(x => x.VariationProductImage);

        let VProduct = this.props.navigation.state.params.ProductData.Variation.find(x => x.VariationProductName == this.state.VariationName)
        let VProductImage = this.props.navigation.state.params.ProductData.Variation.find(x => x.VariationProductImage == ImageWork[this.state.ImageIndex])
        console.log("log")
        console.log(ImageTest)

        return (
            <Container>
                <View>
                    {/* <Text>SingleProductComponent</Text> */}
                    <SliderBox
                        images={ImageTest}
                        circleLoop
                        onCurrentImagePressed={(index) => {
                            console.log("inde" + index)
                            this.ModalImage(index)
                        }}
                    />
                </View>
                <View style={{ marginTop: 22 }}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <Text>Hello World!</Text>
                                {("data:image/jpeg;base64," + this.props.navigation.state.params.ProductData.ProductImageData) == ImageTest[this.state.ImageIndex] ?
                                    (
                                        <View>
                                            <Image
                                                style={{ width: 50, height: 50 }}
                                                source={{ uri: ImageTest[this.state.ImageIndex] }}
                                            />
                                            <Text>{this.props.navigation.state.params.ProductData.ProductName}</Text>
                                            <Text>{this.props.navigation.state.params.ProductData.ProductPrice}</Text>
                                            <Text>{this.props.navigation.state.params.ProductData.ProductQty}</Text>
                                        </View>
                                    ) :
                                    (<View>
                                        <Image
                                            style={{ width: 50, height: 50 }}
                                            source={{ uri: ImageTest[this.state.ImageIndex] }}
                                        />
                                        <Text>{VProductImage.VariationProductName}</Text>
                                        <Text>{VProductImage.VariationProductPrice}</Text>
                                        <Text>{VProductImage.VariationProductQty}</Text>
                                    </View>

                                    )}
                                {/* <Image
                                    style={{ width: 50, height: 50 }}
                                    source={{ uri: ImageTest[this.state.ImageIndex] }}
                                />
                                <Text>{VProductImage.VariationProductName}</Text>
                                <Text>{VProductImage.VariationProductPrice}</Text>
                                <Text>{VProductImage.VariationProductQty}</Text> */}

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
                {this.props.navigation.state.params.ProductData.Variation.length > 0 && this.state.VariationName !== "" && this.state.VariationName !== "Select" ?
                    (
                        <View>
                            <Card style={{ marginLeft: 10, marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                    <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Name:</Text>
                                    <Text style={{ marginLeft: 8, fontSize: 15 }}>{VProduct.VariationProductName}</Text>
                                    {/* <Text>hercullus</Text> */}


                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Price:</Text>
                                    <Text style={{ marginLeft: 8, fontSize: 15 }}>{VProduct.VariationProductPrice}</Text>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Qty:</Text>
                                    <Text style={{ marginLeft: 8, fontSize: 15 }}>{VProduct.VariationProductQty}</Text>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Description:</Text>
                                    <Text style={{ marginLeft: 8, fontSize: 15, width: '50%' }}>{this.props.navigation.state.params.ProductData.ProductDescription}</Text>

                                </View>
                            </Card>

                        </View>
                    ) : (
                        this.state.VariationName == "" || this.state.VariationName == 'Select' ?
                            (<View>
                                <Card style={{ marginLeft: 10, marginRight: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                        <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Name:</Text>
                                        <Text style={{ marginLeft: 8, fontSize: 15 }}>{this.props.navigation.state.params.ProductData.ProductName}</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Price:</Text>
                                        <Text style={{ marginLeft: 8, fontSize: 15 }}>{this.props.navigation.state.params.ProductData.ProductPrice}</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Qty:</Text>
                                        <Text style={{ marginLeft: 8, fontSize: 15 }}>{this.props.navigation.state.params.ProductData.ProductQty}</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Description:</Text>
                                        <Text style={{ marginLeft: 8, fontSize: 15, width: '50%' }}>{this.props.navigation.state.params.ProductData.ProductDescription}</Text>

                                    </View>
                                </Card>

                            </View>)
                            :
                            (<View />)

                    )}
                {/* <View>
                    <Card style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                            <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Name:</Text>
                            <Text style={{ marginLeft: 8, fontSize: 15 }}>{this.props.navigation.state.params.ProductData.ProductName}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Price:</Text>
                            <Text style={{ marginLeft: 8, fontSize: 15 }}>{this.props.navigation.state.params.ProductData.ProductPrice}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Qty:</Text>
                            <Text style={{ marginLeft: 8, fontSize: 15 }}>{this.props.navigation.state.params.ProductData.ProductQty}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ marginLeft: 8, fontSize: 15 }}>Product Description:</Text>
                            <Text style={{ marginLeft: 8, fontSize: 15, width: '50%' }}>{this.props.navigation.state.params.ProductData.ProductDescription}</Text>

                        </View>
                    </Card>

                </View> */}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 15 }}>Variation:</Text>
                    <Picker
                        selectedValue={this.state.VariationName}
                        style={{ marginTop: 10, height: 50, width: 120 }}
                        onValueChange={(itemValue, itemIndex) =>
                            // this.setState({ language: itemValue })
                            this.findSomething(itemValue, itemIndex)
                        }>
                        <Picker.Item label="Select" value="Select" />
                        {this.props.navigation.state.params.ProductData.Variation.map(x => {
                            return (
                                <Picker.Item key={x.VariationProductName} label={x.VariationProductName} value={x.VariationProductName} />
                            )
                        })}

                    </Picker>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40, marginBottom: 20 }} >
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <View style={{ borderColor: 'green', borderWidth: 1, borderRadius: 10, height: 40, width: 100, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                            <Text>Add to cart</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row' }} >
                        <View style={{ borderColor: 'red', borderWidth: 1, borderRadius: 10, height: 40, width: 100, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                            <Text>Buy Now </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}