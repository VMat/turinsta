import {tassign} from "tassign";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
export const GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
export const ACTIVE_PUBLICATION = "ACTIVE_PUBLICATION";
export const SAVE_PUBLICATION_STATE = "SAVE_PUBLICATION_STATE";
export const RESUME_PUBLICATION = "RESUME_PUBLICATION";

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

export function savePublicationState(publicationState){
  return {
    type: SAVE_PUBLICATION_STATE,
    payload: publicationState
  }
}

export function resumePublication(){
  return {
    type: RESUME_PUBLICATION
  }
}

const initialState = {
  publications: [],
  active: null,
  resumeTo: {publicationId: null, experience: {open: false,experienceId: null}, comment: {open: false, commentId: null}},
  pending: false,
  error: null
};

function copyAllProperties(targetObject,sourceObject){
  if(Object.keys(sourceObject).length > 0){
    for(let property in sourceObject){
      targetObject[property] = copyAllProperties(targetObject[property],sourceObject[property]);
    }
  }
  else{
    return sourceObject
  }
}

function isPrimitive(arg) {
  var type = typeof arg;
  return arg == null || (type != "object" && type != "function");
}

export function publicationReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_PUBLICATIONS:
      return tassign(state,{pending: true, error: null});
    case GET_PUBLICATIONS_SUCCESS:
      if(Boolean(state.active)) {
        let indexPayload = null;
        let indexData = null;
        payload.forEach((publication, i) => {
          if (publication._id == state.active) {
            indexPayload = i;
          }
        });
        state.publications.forEach((item, i) => {
          if (item._id == state.active) {
            indexData = i
          }
        });

        let updatedPublication = {...payload[indexPayload]};
        payload = state.publications;

        for(let property in updatedPublication) {
          payload[indexData][property] = updatedPublication[property];
        }

      }
      return tassign(state, {publications: payload, pending: false});
    case GET_PUBLICATIONS_ERROR:
      return tassign(state, {pending: false, error: "Error"});
    case ACTIVE_PUBLICATION:
      return tassign(state,{active: payload});
    case SAVE_PUBLICATION_STATE:
      return tassign(state, {resumeTo: payload});
    case RESUME_PUBLICATION:
      return tassign(state, {resumeTo: initialState.resumeTo});
    default:
      return state;
  }
}
