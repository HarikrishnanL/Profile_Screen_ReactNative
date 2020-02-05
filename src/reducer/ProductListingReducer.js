import { PRODUCT_LISTING, FETCH_PRODUCT_NAME, FETCH_PRODUCT_PRICE, FETCH_PRODUCT_DESCRIPTION, FETCH_PRODUCT_QUANTITY, FETCH_PRODUCT_IMAGE, FETCH_PRODUCT_VARIATION_FLAG, FETCH_PRODUCT_VARIATION_NAME, FETCH_PRODUCT_VARIATION_PRICE, FETCH_PRODUCT_VARIATION_QUANTITY, FETCH_PRODUCT_VARIATION_IMAGE, FETCH_TEST, PRODUCT_RESET_DATA } from '../action/actionTypes';
import { DEFAULT_STATE_PRODUCT_LISTING } from '../action/ProductListingAction';

const ProfileListingReducer = (state = DEFAULT_STATE_PRODUCT_LISTING, action) => {
    switch (action.type) {
        case PRODUCT_LISTING:
            return {
                ...state,
                ProfileListing: true
            }

        case FETCH_PRODUCT_NAME:
            return {
                ...state,
                ProductName: action.ProductName
            }

        case FETCH_PRODUCT_PRICE:
            return {
                ...state,
                ProductPrice: Number(action.ProductPrice)
            }

        case FETCH_PRODUCT_DESCRIPTION:
            return {
                ...state,
                ProductDescription: action.ProductDescription
            }

        case FETCH_PRODUCT_QUANTITY:
            return {
                ...state,
                ProductQty: Number(action.ProductQty)
            }

        case FETCH_PRODUCT_IMAGE:
            return {
                ...state,
                ProductImageData: action.ProductImageData
            }

        case FETCH_PRODUCT_VARIATION_FLAG:
            return {
                ...state,
                VariationProductFlag: action.VariationProductFlag,
                Variation: [],
                VariationProductName: '',
                VariationProductPrice: 0,
                VariationProductQty: 0,
                VariationProductImage: '',
            }

        case FETCH_PRODUCT_VARIATION_NAME:
            console.log(action.VariationProductName)
            return {
                ...state,
                VariationProductName: action.VariationProductName,
            }

        case FETCH_PRODUCT_VARIATION_PRICE:
            return {
                ...state,
                VariationProductPrice: Number(action.VariationProductPrice),
            }

        case FETCH_PRODUCT_VARIATION_QUANTITY:
            return {
                ...state,
                VariationProductQty: Number(action.VariationProductQty)
            }

        case FETCH_PRODUCT_VARIATION_IMAGE:
            return {
                ...state,
                VariationProductImage: action.VariationProductImage

            }

        case FETCH_TEST:
            {
                // if (state.Variation.length > 0) {
                //     console.log("today work for god sake")
                //     let SearchArray = state.Variation.find(x => x.VariationProductName == state.VariationProductName);
                //     console.log(SearchArray)
                //     return {
                //         ...state,
                //         Variation: SearchArray.push({
                //             VariationProductName: state.VariationProductName,
                //             VariationProductPrice:state.VariationProductPrice,
                //             VariationProductQty:state.VariationProductQty
                //         })

                //     }



                // } else {
                console.log("today list")
                return {
                    ...state,
                    Variation: state.Variation.concat({
                        VariationProductName: state.VariationProductName,
                        VariationProductPrice: Number(state.VariationProductPrice),
                        VariationProductQty: Number(state.VariationProductQty),
                        VariationProductImage: state.VariationProductImage
                    }),
                    VariationProductName: '',
                    VariationProductPrice: 0,
                    VariationProductQty: 0,
                    VariationProductImage: '',
                }
                // }

            }

        case PRODUCT_RESET_DATA:
            return {
                ...state,
                ProductName: '',
                ProductPrice: '',
                ProductQty: '',
                ProductDescription: '',
                ProductImageData: '',
                // DefaultProductflag:'false',
                VariationProductFlag: false,
                VariationProductName: '',
                VariationProductPrice: '',
                VariationProductQty: '',
                VariationProductImage: '',
                Variation: [],
            }
        default:
            return state
    }
}

export default ProfileListingReducer;