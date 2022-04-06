import { LIGHT, SET_THEME } from "../constants/actionTypes";

export default (state = { theme: LIGHT }, action) => {
    switch (action.type) {
        case SET_THEME:
            return { ...state, theme: action.theme };
        default:
            return state;
    }
}