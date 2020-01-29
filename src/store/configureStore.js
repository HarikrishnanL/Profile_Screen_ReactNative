import { createStore, combineReducers } from 'redux';
import ProfileReducer from '../reducer/ProfileReducer';
import ProfileViewReducer from '../reducer/ProfileViewReducer';
import ProductListingReducer from '../reducer/ProductListingReducer';
import SingleProductReducer from '../reducer/SingleProductReducer';


const AppReducers = combineReducers({
    ProfileData : ProfileReducer,
    ProfileViewData : ProfileViewReducer,
    ProductListingData : ProductListingReducer,
    SingleProductData : SingleProductReducer,
})

const configureStore = () => {
    return createStore(AppReducers)
}

export default configureStore;