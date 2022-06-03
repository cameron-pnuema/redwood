import * as actionTypes from './actionTypes';

export const floorplanAction = (data) => ({ type: actionTypes.FLOORPLAN, payload: data });

export const floorplanFilterAction = (data) => ({ type: actionTypes.FLOORPLAN_FILTER, payload: data });
export const floorplanClearFilterAction = (data) => ({ type: actionTypes.FLOORPLAN_FILTER_CLEAR, payload: data });


