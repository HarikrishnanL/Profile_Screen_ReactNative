import { FETCH_PROFILE_FIRST_NAME, FETCH_PROFILE_LAST_NAME, FETCH_PROFILE_MOBILE_NUMBER, FETCH_PROFILE_EMAIL, RADIO_PROFILE_DATA, PROFILE_PIC_DATA, RADIO_PROFILE_DATA_MALE, RADIO_PROFILE_DATA_FEMALE } from '../action/actionTypes';

import { DEFAULT_STATE_PROFILE } from '../action/ProfileAction'


const ProfileReducer = (state = DEFAULT_STATE_PROFILE, action) => {
    switch (action.type) {
        case FETCH_PROFILE_FIRST_NAME:
            return {
                ...state,
                FirstName: action.FirstName,
            }

        case FETCH_PROFILE_LAST_NAME:
            return {
                ...state,
                LastName: action.LastName
            }

        case FETCH_PROFILE_MOBILE_NUMBER:
            return {
                ...state,
                MobileNumber: action.MobileNumber
            }

        case FETCH_PROFILE_EMAIL:
            return {
                ...state,
                Email: action.Email
            }

        case RADIO_PROFILE_DATA_MALE:
            return {
                ...state,
                MaleRadioData: true,
                

            }
        case RADIO_PROFILE_DATA_FEMALE:
            return {
                ...state,
                FemaleRadioData: true
            }
        case PROFILE_PIC_DATA:
            return {
                ...state,
                Picdata: action.Picdata
            }
        default:
            return state

    }
}

export default ProfileReducer;