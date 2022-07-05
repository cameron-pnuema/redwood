import * as actionTypes from './actionTypes';
import { addUser, authorizationUser, getUser, addStor } from '../../UTILS/api';
import { toast } from 'react-toastify';
import axios from 'axios';

const getMarkupRequest = () => ({ type: actionTypes.MARKUP_REQUEST });
const getMarkupSuccess = (data) => ({ type: actionTypes.MARKUP_SUCCESS, payload:data });
const getMarkupError = (data) => ({ type: actionTypes.MARKUP_ERROR, payload:data });

const getConstructionCostRequest = () => ({ type: actionTypes.CONSTRUCTION_COST_REQUEST });
const getConstructionCostSuccess = (data) => ({ type: actionTypes.CONSTRUCTION_COST_SUCCESS, payload:data});
const getConstructionCostError = (data) => ({ type: actionTypes.CONSTRUCTION_COST_ERROR, payload:data });

const getFloorPlanRequest = () => ({ type: actionTypes.FLOORPLAN_REQUEST });
const getFloorPlanSuccess = (data) => ({ type: actionTypes.FLOORPLAN_SUCCESS, payload:data });
const getFloorPlanError = (data) => ({ type: actionTypes.FLOORPLAN_ERROR, payload:data });



export async function getAirtableData ({url,method}){
    const res = await fetch(url, { 
        method, 
        headers: new Headers({
          'Authorization': "Bearer key0AV84zSplHpV5B", 
          'Content-Type': 'application/json'
        })
      })
      let  realRes = await res.json()
      return realRes
}


export const getMarkup = (data) => {
    let url="https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Redwood%20-%20Markup/recdREnEIgpbbV70f"
    return async (dispatch) => {
        dispatch(getMarkupRequest());
        try {
            const res = await getAirtableData({url,method:"get"})
            const fields=res.fields
            fields.Notes=fields.Notes*100
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
    const url="https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Floorplan%20Costs?maxRecords=100&view=Grid%20view" 
    return async (dispatch) => {
        dispatch(getFloorPlanRequest());
        try {
            const res = await getAirtableData({url,method:"get"})
            const records=res.records
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
    const url="https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Construction%20Costs?maxRecords=100&view=Master%20View"
    return async (dispatch) => {
        dispatch(getConstructionCostRequest());
        try {
            const res = await getAirtableData({url,method:"get"})
            const records=res.records
            if (records) {
                dispatch(getConstructionCostSuccess(records))
            }
        } catch (e) {
            toast(e.response ? e.response.data : 'Что-то пошло не так111');
            dispatch(getConstructionCostError());
        }
    }
}