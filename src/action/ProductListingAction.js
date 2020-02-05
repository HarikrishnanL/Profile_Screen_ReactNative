import { PRODUCT_LISTING, FETCH_PRODUCT_NAME, FETCH_PRODUCT_PRICE, FETCH_PRODUCT_DESCRIPTION, FETCH_PRODUCT_QUANTITY, FETCH_PRODUCT_IMAGE, FETCH_PRODUCT_VARIATION_FLAG, FETCH_PRODUCT_VARIATION_NAME, FETCH_PRODUCT_VARIATION_PRICE, FETCH_PRODUCT_VARIATION_QUANTITY, FETCH_PRODUCT_VARIATION_IMAGE, FETCH_TEST, PRODUCT_RESET_DATA } from './actionTypes';
import ProductListingComponent from '../component/ProductLisitingComponent';
import { connect } from 'react-redux';

export const DEFAULT_STATE_PRODUCT_LISTING = {
    ProductName: '',
    ProductPrice: 0,
    ProductQty: 0,
    ProductDescription: '',
    ProductImageData: '',
    // DefaultProductflag:'false',
    VariationProductFlag: false,
    VariationProductName: '',
    VariationProductPrice: 0,
    VariationProductQty: 0,
    VariationProductImage: '',
    Variation: [],
    ProfileListing: true

}

export const product_listing = () => {
    return {
        type: PRODUCT_LISTING,
        ProfileListing
    }
}

export const Fetch_Product_Name = (ProductName) => {
    return {
        type: FETCH_PRODUCT_NAME,
        ProductName
    }
}

export const Fetch_Product_Price = (ProductPrice) => {
    return {
        type: FETCH_PRODUCT_PRICE,
        ProductPrice
    }
}

export const Fetch_Product_Description = (ProductDescription) => {
    return {
        type: FETCH_PRODUCT_DESCRIPTION,
        ProductDescription
    }
}

export const Fetch_Product_Quantity = (ProductQty) => {
    return {
        type: FETCH_PRODUCT_QUANTITY,
        ProductQty
    }
}

export const Fetch_Product_ImageData = (ProductImageData) => {
    return {
        type: FETCH_PRODUCT_IMAGE,
        ProductImageData
    }
}

export const Fetch_Product_Variation_Flag = (VariationProductFlag) => {
    return {
        type: FETCH_PRODUCT_VARIATION_FLAG,
        VariationProductFlag
    }
}

export const Fetch_Product_Variation_Name = (VariationProductName) => {
    return {
        type: FETCH_PRODUCT_VARIATION_NAME,
        VariationProductName
    }
}

export const Fetch_Product_Variation_Price = (VariationProductPrice) => {
    return {
        type: FETCH_PRODUCT_VARIATION_PRICE,
        VariationProductPrice
    }
}

export const Fetch_Product_Variation_Qty = (VariationProductQty) => {
    return {
        type: FETCH_PRODUCT_VARIATION_QUANTITY,
        VariationProductQty
    }
}

export const Fetch_Product_Variation_Image = (VariationProductImage) => {
    return {
        type: FETCH_PRODUCT_VARIATION_IMAGE,
        VariationProductImage
    }
}

export const Fetch_Variation_Product_data = (data) => {
    return {
        type: FETCH_TEST,
        data
    }
}

export const Product_Reset_Data = (ResetData) => {
    return {
        type: PRODUCT_RESET_DATA,
        ResetData
    }
}



const mapStateToProps = (state) => {
    return {
        ProductListingState: state.ProductListingData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OnRenderProductListing: () => {
            dispatch(product_listing())
        },
        OnRenderProductName: (ProductName) => {
            dispatch(Fetch_Product_Name(ProductName))
        },
        OnRenderProductPrice: (ProductPrice) => {
            dispatch(Fetch_Product_Price(ProductPrice))
        },
        OnRenderProductDescription: (ProductDescription) => {
            dispatch(Fetch_Product_Description(ProductDescription))
        },
        OnRenderProductQuantity: (ProductQty) => {
            dispatch(Fetch_Product_Quantity(ProductQty))
        },
        OnRenderProductImage: (ProductImageData) => {
            dispatch(Fetch_Product_ImageData(ProductImageData))
        },
        OnRenderProductVariationFlag: (VariationProductFlag) => {
            dispatch(Fetch_Product_Variation_Flag(VariationProductFlag))
        },
        OnRenderVariationProductName: (VariationProductName) => {
            dispatch(Fetch_Product_Variation_Name(VariationProductName))
        },
        OnRenderVariationProductPrice: (VariationProductPrice) => {
            dispatch(Fetch_Product_Variation_Price(VariationProductPrice))
        },
        OnRenderVariationProductQty: (VariationProductQty) => {
            dispatch(Fetch_Product_Variation_Qty(VariationProductQty))
        },
        OnRenderVariationProductImage: (VariationProductImage) => {
            dispatch(Fetch_Product_Variation_Image(VariationProductImage))
        },
        OnRenderVariationProductData: (data) => {
            dispatch(Fetch_Variation_Product_data(data))
        },
        OnRenderProductResetData: (ResetData) => {
            dispatch(Product_Reset_Data(ResetData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingComponent)