import * as actionTypes from '../actions/actionTypes';

const initialState = {
    floorplan: [],
    filters: []
}

const getDataBasedOnSelected = (newState, action) => {
    const filteredData = newState.filters.filter((item) => (item.id !== action.payload.id))
    const filteredSiblingData = newState.filters.filter((item) => ((item.parentId === action.payload.parentId) && (item.id !== action.payload.id)))

    if (filteredSiblingData.length) {
        const filteredSiblings = newState.filters.filter((item) => (item.parentId !== action.payload.parentId))
        newState.filters = filteredSiblings.concat(action.payload)
        return newState
    }
    else if (newState.filters.length === filteredData.length) {
        newState.filters = newState.filters.concat(action.payload)
        return newState
    }
    else {
        newState.filters = filteredData
    }
    return newState
}

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.FLOORPLAN) {
        const newState = { ...state };
        newState.floorplan = action.payload;
        return newState;
    }

    if (action.type === actionTypes.FLOORPLAN_FILTER) {
        const newState = { ...state };
        return getDataBasedOnSelected(newState, action)
    }
    if (action.type === actionTypes.FLOORPLAN_FILTER_CLEAR) {
        const newState = { ...state };
        newState.filters = []
        return newState
    }
    return state;

};

export default reducer;