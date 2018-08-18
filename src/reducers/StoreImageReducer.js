
import { STOREIMAGE } from '../utils/types';
const INITIAL_STATE = {
    Storeimage: null
};
const StoreImageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case STOREIMAGE:
            return Object.assign({}, state, {
                Storeimage: action.Data

            })

        default:
            return state;
    }
};
export default StoreImageReducer;
