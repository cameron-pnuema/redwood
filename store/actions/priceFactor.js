import * as actionTypes from './actionTypes';
import { addUser, authorizationUser, getUser, addStor } from '../../UTILS/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { urlObjects } from '../../UTILS/urlObjects';

const getMarkupRequest = () => ({ type: actionTypes.MARKUP_REQUEST });
const getMarkupSuccess = (data) => ({ type: actionTypes.MARKUP_SUCCESS, payload: data });
const getMarkupError = (data) => ({ type: actionTypes.MARKUP_ERROR, payload: data });

const clientProfileRequest = () => ({ type: actionTypes.CLIENT_REQUEST });
const clientProfileSuccess = (data) => ({ type: actionTypes.CLIENT_SUCCESS, payload: data });
const clientProfileError = (data) => ({ type: actionTypes.CLIENT_ERROR, payload: data });

const getConstructionCostRequest = () => ({ type: actionTypes.CONSTRUCTION_COST_REQUEST });
const getConstructionCostSuccess = (data) => ({ type: actionTypes.CONSTRUCTION_COST_SUCCESS, payload: data });
const getConstructionCostError = (data) => ({ type: actionTypes.CONSTRUCTION_COST_ERROR, payload: data });

const getConstructionCostNewRequest = () => ({ type: actionTypes.CONSTRUCTION_COST_NEW_REQUEST });
const getConstructionCostNewSuccess = (data) => ({ type: actionTypes.CONSTRUCTION_COST_NEW_SUCCESS, payload: data });
const getConstructionCostNewError = (data) => ({ type: actionTypes.CONSTRUCTION_COST_NEW_ERROR, payload: data });

const getFloorPlanRequest = () => ({ type: actionTypes.FLOORPLAN_REQUEST });
const getFloorPlanSuccess = (data) => ({ type: actionTypes.FLOORPLAN_SUCCESS, payload: data });
const getFloorPlanError = (data) => ({ type: actionTypes.FLOORPLAN_ERROR, payload: data });

let userCompany
if (typeof window !== 'undefined') {
    userCompany = localStorage.getItem('companyName')
}

const dynamicUrl= urlObjects[userCompany]



export async function getAirtableData({ url, method }) {
    const res = await fetch(url, {
        method,
        headers: new Headers({
            'Authorization': "Bearer key0AV84zSplHpV5B",
            'Content-Type': 'application/json'
        })
    })
    let realRes = await res.json()

    return realRes
}



export const clientProfile = (data) => {
    let url = "https://api.airtable.com/v0/appNSZE4sLntsJdpb/Client%20List%20%26%20Profiles?maxRecords=100&view=Client%20List%20%26%20General%20Info"
    return async (dispatch) => {
        dispatch(clientProfileRequest());
        try {
            const res = await getAirtableData({ url, method: "get" })
            const fields = res.records
            if (fields) {
                dispatch(clientProfileSuccess(fields))
            }
        } catch (e) {
            toast(e.response ? e.response.data : 'Что-то пошло не так');
            dispatch(clientProfileError());
        }
    }
}

export const getMarkup = (data) => {
    let url = dynamicUrl.getMarkup
    return async (dispatch) => {
        dispatch(getMarkupRequest());
        try {
            const res = await getAirtableData({ url, method: "get" })
            const fields = res.fields
            fields.Notes = fields['mark Up %'] * 100
            if (fields) {
                dispatch(getMarkupSuccess(fields))
            }

        } catch (e) {
            toast(e.response ? e.response.data : 'Что-то пошло не так');
            dispatch(getMarkupError());
        }
    }
}

export const getFloorPlan = (data) => {
    console.log("url",dynamicUrl.getFloorPlan)
    const url = dynamicUrl.getFloorPlan
    console.log("url",url)
    return async (dispatch) => {
        dispatch(getFloorPlanRequest());
        try {
            const res = await getAirtableData({ url, method: "get" })
            const records = res.records
            if (records) {
                dispatch(getFloorPlanSuccess(records))
            } 
        } catch (e) {
            toast(e.response ? e.response.data : 'Что-то пошло не так');
            dispatch(getFloorPlanError());
        }
    }
}


export const getConstructionCost = (data) => {
    const url = dynamicUrl.getConstructionCost
    return async (dispatch) => {
        dispatch(getConstructionCostRequest());
        try {
            const res = await getAirtableData({ url, method: "get" })
            const records = res.records
            if (records) {
                dispatch(getConstructionCostSuccess(records))
            }
        } catch (e) {
            toast(e.response ? e.response.data : 'Что-то пошло не так111');
            dispatch(getConstructionCostError());
        }
    }
}

export const getConstructionCostNew = (data) => {
    const url = dynamicUrl.getConstructionCostNew
    return async (dispatch) => {
        dispatch(getConstructionCostNewRequest());
        try {
            const res = await getAirtableData({ url, method: "get" })
            const records = res.records
            if (records) {
                dispatch(getConstructionCostNewSuccess(records))
            }
        } catch (e) {
            toast(e.response ? e.response.data : 'Что-то пошло не так111');
            dispatch(getConstructionCostNewError());
        }
    }
}