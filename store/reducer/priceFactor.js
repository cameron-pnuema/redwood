import * as actionTypes from '../actions/actionTypes';

const initialState = {
   markup:{isLoading:false,iSSuccess:false,isError:"false",data:[],error:""},
   floorPlan:{isLoading:false,iSSuccess:false,isError:"false",data:[],error:""},
   constructionCost:{isLoading:false,iSSuccess:false,isError:"false",data:[],error:""},

};

const reducer = (state = initialState, action) => {
    
    if(action.type === actionTypes.MARKUP_REQUEST){
        const newState = {...state};
        newState.markup.isLoading = true;
        newState.markup.iSSuccess = false;
        newState.markup.iSError = false;
        return newState;
    }

    if(action.type === actionTypes.MARKUP_SUCCESS){
        const newState = {...state};
        newState.markup.isLoading = false;
        newState.markup.iSSuccess = true;
        newState.markup.iSError = false;
        newState.markup.data =action.payload;
        return newState;
    }

    if(action.type === actionTypes.MARKUP_ERROR){
        const newState = {...state};
        newState.markup.isLoading = false;
        newState.markup.iSSuccess = false;
        newState.markup.iSError = true;
        newState.markup.error =action.payload;
        return newState;
    }
    if(action.type === actionTypes.FLOORPLAN_REQUEST){
        const newState = {...state};
        newState.floorPlan.isLoading = true;
        newState.floorPlan.iSSuccess = false;
        newState.floorPlan.iSError = false;
        return newState;
    }

    if(action.type === actionTypes.FLOORPLAN_SUCCESS){
        const newState = {...state};
        newState.floorPlan.isLoading = false;
        newState.floorPlan.iSSuccess = true;
        newState.floorPlan.iSError = false;
        newState.floorPlan.data =action.payload;
        return newState;
    }

    if(action.type === actionTypes.FLOORPLAN_ERROR){
        const newState = {...state};
        newState.floorPlan.isLoading = false;
        newState.floorPlan.iSSuccess = false;
        newState.floorPlan.iSError = true;
        newState.floorPlan.error =action.payload;
        return newState;
    }


    if(action.type === actionTypes.CONSTRUCTION_COST_REQUEST){
        const newState = {...state};
        newState.constructionCost.isLoading = true;
        newState.constructionCost.iSSuccess = false;
        newState.constructionCost.iSError = false;
        return newState;
    }

    if(action.type === actionTypes.CONSTRUCTION_COST_SUCCESS){
        const newState = {...state};
        newState.constructionCost.isLoading = false;
        newState.constructionCost.iSSuccess = true;
        newState.constructionCost.iSError = false;
        newState.constructionCost.data =action.payload;
        return newState;
    }

    if(action.type === actionTypes.CONSTRUCTION_COST_ERROR){
        const newState = {...state};
        newState.constructionCost.isLoading = false;
        newState.constructionCost.iSSuccess = false;
        newState.constructionCost.iSError = true;
        newState.constructionCost.error =action.payload;
        return newState;
    }

    return state;
    
};

export default reducer;

