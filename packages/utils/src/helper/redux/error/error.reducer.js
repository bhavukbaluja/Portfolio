import { REMOVEERROR, SETERROR} from "./error.types";

const initialState = {
    openDialog:false,
    message:"",
    title:"",
    msgArray:[]
}

function customErrorReducer(state = initialState, action) {
    switch (action.type) {
        case SETERROR:
            return {...action?.payload};
        case REMOVEERROR:
            return {initialState};
        default:
            return state;
    }
}
export default customErrorReducer;