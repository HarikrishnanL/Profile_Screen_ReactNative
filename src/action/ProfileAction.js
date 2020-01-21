import { FETCH_PROFILE_FIRST_NAME, FETCH_PROFILE_LAST_NAME, FETCH_PROFILE_MOBILE_NUMBER, FETCH_PROFILE_EMAIL, RADIO_PROFILE_DATA_MALE, RADIO_PROFILE_DATA_FEMALE, PROFILE_PIC_DATA, PROFILE_DATE, RESET_DATA } from './actionTypes';
import ProfileComponent from '../component/ProfileComponent';
import { connect } from 'react-redux';

export const DEFAULT_STATE_PROFILE = {
    FirstName: '',
    LastName: '',
    MobileNumber: '',
    Email: '',
    MaleRadioData: false,
    FemaleRadioData: false,
    Picdata: '',
    date: ''
}

export const Fetch_Profile_FirstName = (FirstName) => {
    return {
        type: FETCH_PROFILE_FIRST_NAME,
        FirstName: FirstName,
        // SecondName:SecondName,
        // MobileNumber:MobileNumber,
        // Email:Email,

    }
}

export const Fetch_Profile_LastName = (LastName) => {
    return {
        type: FETCH_PROFILE_LAST_NAME,
        LastName: LastName
    }
}

export const Fetch_Profile_MobileNumber = (MobileNumber) => {
    return {
        type: FETCH_PROFILE_MOBILE_NUMBER,
        MobileNumber: MobileNumber
    }
}

export const Fetch_Profile_Email = (Email) => {
    return {
        type: FETCH_PROFILE_EMAIL,
        Email: Email
    }
}

export const Fetch_Radio_Data_Male = (MaleRadioData) => {
    return {
        type: RADIO_PROFILE_DATA_MALE,
        MaleRadioData

    }
}

export const Fetch_Radio_Data_Female = (FemaleRadioData) => {
    return {
        type: RADIO_PROFILE_DATA_FEMALE,
        FemaleRadioData

    }
}


export const Fetch_Profile_Pic = (Picdata) => {
    return {
        type: PROFILE_PIC_DATA,
        Picdata
    }
}

export const Fetch_Date = (date) => {
    return {
        type: PROFILE_DATE,
        date
    }
}
export const Reset_data = (data) => {
    return {
        type: RESET_DATA,
        data
    }
}

const mapStateToProps = (state) => {
    return {
        ProfileInfo: state.ProfileData

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OnRenderProfileFetch: (FirstName) => {
            dispatch(Fetch_Profile_FirstName(FirstName))
        },
        OnRenderProfileFetchLastName: (LastName) => {
            dispatch(Fetch_Profile_LastName(LastName))
        },
        OnRenderProfileFetchMobile: (MobileNumber) => {
            dispatch(Fetch_Profile_MobileNumber(MobileNumber))
        },
        OnRenderProfileFetchEmail: (Email) => {
            dispatch(Fetch_Profile_Email(Email))
        },
        OnRenderRadioFetchMale: (MaleRadioData) => {
            dispatch(Fetch_Radio_Data_Male(MaleRadioData))
        },
        OnRenderRadioFetchFemale: (FemaleRadioData) => {
            dispatch(Fetch_Radio_Data_Female(FemaleRadioData))
        },
        OnRenderProfilePic: (Picdata) => {
            dispatch(Fetch_Profile_Pic(Picdata))
        },
        OnRenderDateFetchData: (date) => {
            dispatch(Fetch_Date(date))
        },
        OnRefresh: (data) => {
            dispatch(Reset_data(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);