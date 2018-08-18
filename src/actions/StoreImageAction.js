import { STOREIMAGE } from '../utils/types';
export const Images = (data) => {
  return dispatch => {
   dispatch({ type: STOREIMAGE,Data:data  })
   }
}
