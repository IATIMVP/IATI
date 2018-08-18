



import { FETCHDATALIST } from '../../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    data:[],
    success:""
};
const getDataList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHDATALIST.REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                data:[]
            });
        case FETCHDATALIST.SUCCESS:
        console.log("action.payload",action.payload)
            return Object.assign({}, state, {
                isLoading: false,
                data: action.payload,
                success: "success",
            })

        case FETCHDATALIST.FAIL:
            return Object.assign({}, state, {
                success: "",
                isLoading: false,
                data:[],
            });
        default:
            return state;
    }
};
export default getDataList;