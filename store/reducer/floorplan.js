import * as actionTypes from '../actions/actionTypes';

const initialState = {
    floorplan: []
}

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.FLOORPLAN) {
        
        const newState = { ...state };
        newState.floorplan = action.payload;
        return newState;
    }
    return state;

};

export default reducer;