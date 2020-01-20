import { VIEW_PROFILE } from '../action/actionTypes';
import { DEFAULT_STATE_PROFILE_VIEW } from '../action/ProfileViewAction';

const ProfileViewReducer = (state = DEFAULT_STATE_PROFILE_VIEW, action) => {
    switch (action.type) {
        case VIEW_PROFILE:
            return {
                ...state,
                ProfileData: true
            }
        
            default:
                return state
    }
}

export default ProfileViewReducer;