export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
export const GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
export const ACTIVE_PUBLICATION = "ACTIVE_PUBLICATION";

export function getPublications() {
  return {
    type: GET_PUBLICATIONS
  }
}

export function activePublication(){
  return {
    type: ACTIVE_PUBLICATION
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
        let comments = state.data[0].comments;
        state.data[0] = payload[0];
        state.data[0].comments = comments;
        return state;
      }
       /*Object.assign({}, state,
        {data: payload, pending: false})*/
    case GET_PUBLICATIONS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    case ACTIVE_PUBLICATION:
        state.active = payload;
        return state;
    default:
      return state;
  }
}
