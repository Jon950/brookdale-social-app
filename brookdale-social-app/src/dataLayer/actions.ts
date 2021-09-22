import { Dispatch } from "redux";

export const actionOne = (newValue: object) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "",
            payload: newValue,
        })
    }
}