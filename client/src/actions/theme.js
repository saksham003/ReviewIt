import { SET_THEME } from "../constants/actionTypes";

export const setTheme = (theme) => (dispatch) => {
    dispatch({ type: SET_THEME, theme });
}