import * as actionTypes from './actionTypes';

export const customizationAction = (data) => ({ type: actionTypes.CUSTOMIZATION, payload: data });
export const setAirtablecustomizationAction = (data) => ({ type: actionTypes.SET_AIRTABLE_CUSTOMIZATION, payload: data });
export const setCustomizationPriceAction = (data) => ({ type: actionTypes.SET_CUSTOMIZATION_PRICE, payload: data });