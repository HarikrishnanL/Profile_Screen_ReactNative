import { createStore, combineReducers } from 'redux';
import ProfileReducer from '../reducer/ProfileReducer';
import ProfileViewReducer from '../reducer/ProfileViewReducer';

const AppReducers = combineReducers({
    ProfileData : ProfileReducer,
    ProfileViewData : ProfileViewReducer
})

const configureStore = () => {
    return createStore(AppReducers)
}

export default configureStore;