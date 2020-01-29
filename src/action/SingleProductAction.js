import { SINGLE_PRODUCT } from './actionTypes';
import SingleProductComponent from '../component/SingleProductComponent';
import { connect } from 'react-redux';


export const DEFAULT_STATE_SINGLE_PRODUCT = {
    SingleProduct: true
}

export const Single_Product = () => {
    return {
        type: SINGLE_PRODUCT,
        SingleProduct
    }
}

const mapStateToProps = (state) => {
    return {
        SingleProductState : state.SingleProductData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OnRenderSingleProduct: () => {
            dispatch(Single_Component())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductComponent)