import * as actionTypes from '../actions/actionTypes';

const initialState = {
    customization: [],
    airtableCustomization: {
        Fairmont: [],
        MHE: []
    }
}

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.CUSTOMIZATION) {
        const newState = { ...state };
        newState.customization = action.payload;
        return newState;
    }

    if (action.type === actionTypes.SET_AIRTABLE_CUSTOMIZATION) {
        const newState = { ...state };
        newState.airtableCustomization = action.payload;
        return newState;
    }
    return state;

};

export default reducer;