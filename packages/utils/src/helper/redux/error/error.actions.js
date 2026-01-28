import {SETERROR, REMOVEERROR } from "./error.types";

export const setError = (data) => {
    return {
        type: SETERROR,
        payload: data
    };
};
export const removeError = () => {
    return {
        type: REMOVEERROR
    };
};

