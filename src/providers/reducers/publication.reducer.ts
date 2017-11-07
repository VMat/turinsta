export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
export const GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";

export function getPublications() {
  return {
    type: GET_PUBLICATIONS
  }
}

const initialState = {
  data: [],
  pending: false,
  error: null
};

export function publicationReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_PUBLICATIONS:
      return Object.assign({}, state, {pending: true, error: null});
    case GET_PUBLICATIONS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});
    case GET_PUBLICATIONS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    default:
      return state;
  }
}
