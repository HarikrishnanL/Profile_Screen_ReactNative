import { SINGLE_PRODUCT } from '../action/actionTypes';
import { DEFAULT_STATE_SINGLE_PRODUCT } from '../action/SingleProductAction';

const SingleProductReducer = (state = DEFAULT_STATE_SINGLE_PRODUCT, action) => {
    switch (action.type) {
        case SINGLE_PRODUCT:
            return {
                ...state,
                SingleProduct: true
            }
        
        default:
            return state
    }
}

export default SingleProductReducer;