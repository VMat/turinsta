export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
export const GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
export const ACTIVE_PUBLICATION = "ACTIVE_PUBLICATION";

export function getPublications() {
  return {
    type: GET_PUBLICATIONS
  }
}

export function activePublication(id){
  return {
    type: ACTIVE_PUBLICATION,
    payload: id
  }
}

const initialState = {
  data: [],
  active: String,
  pending: false,
  error: null
};

export function publicationReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_PUBLICATIONS:
      return Object.assign({}, state, {pending: true, error: null});
    case GET_PUBLICATIONS_SUCCESS:
      if(state.data.length == 0){
        return Object.assign({}, state,
          {data: payload, pending: false})
      }
      else{
        if(Boolean(state.active)){
          let indexPayload = null;
          let indexData = null;
          payload.forEach((publication,i)=>{
            if(publication._id == state.active){
              indexPayload = i;
            }
          });
          state.data.forEach((item,i)=>{if(item._id == state.active){indexData=i}});
          payload[indexPayload] = state.data[indexData]
        }
      }
      return Object.assign({}, state, {data: payload, pending: false});
    case GET_PUBLICATIONS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    case ACTIVE_PUBLICATION:
        state.active = payload;
        return state;
    default:
      return state;
  }
}
