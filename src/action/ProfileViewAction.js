import { VIEW_PROFILE } from './actionTypes'
import ProfileViewComponent from '../component/ProfileViewComponent';
import { connect } from 'react-redux';

export const DEFAULT_STATE_PROFILE_VIEW = {
    ProfileData: true
}

export const View_Profile = (ProfileData) => {
    return {
        type: VIEW_PROFILE,
        ProfileData
    }
}

const mapStateToProps = (state) =>{
    return {
        ProfileView : state.ProfileViewData
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        OnRenderProfileView : () =>{
            dispatch(View_Profile())
        }
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(ProfileViewComponent);