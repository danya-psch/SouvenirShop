import Souvenir from "./../models/souvenir";


export const SOUVENIRS_GET_PART = 'SOUVENIRS_GET_PART';

export const defaultPayload = {
    souvenirs_list: [],
    max_page: 0
};

export function getPartOfSouvenirs(page, text) {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) { 
        const response = await Souvenir.getPartOfSouvenirs(jwt, page, text);
        if (response.error !== null) {
            return;
        }
        const souvenirs = response.respBody.souvenirs;
        const max_page = response.respBody.max_page;
        dispatch({
            type: SOUVENIRS_GET_PART,
            payload: { ...defaultPayload, souvenirs_list: souvenirs, max_page: max_page},
        });
    };
}