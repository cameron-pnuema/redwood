import * as actionTypes from './actionTypes';

export const isPopup = (data) => ({ type: actionTypes.IS_POPUP, payload: data });

export const setUserInforModal = (data) => ({ type: actionTypes.TOGGLE_USER_INFO_MODAL, payload: data });