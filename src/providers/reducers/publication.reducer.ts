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

export function publicationReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_PUBLICATIONS:
      return tassign(state,{pending: true, error: null});
    case GET_PUBLICATIONS_SUCCESS:
      if(Boolean(state.active)){
        let indexPayload = null;
        let indexData = null;
        payload.forEach((publication, i) => {
          if (publication._id == state.active){
            indexPayload = i;
          }
        });
        state.publications.forEach((item, i) => {
          if(item._id == state.active){
            indexData = i;
          }
        });

        let updatedPublication = {...payload[indexPayload]};
        payload = state.publications;

        for(let property in updatedPublication){ //Actualizo las propiedades de la publicación activa manteniendo el id del objeto publicación

            if(property!="comments"){
              payload[indexData][property] = updatedPublication[property];
            }
            else{ // Si si trata de comentarios itero sobre los mismos y actualizo cada uno para mantener el id del objeto comentario
                let commentIndex = null;
                updatedPublication[property].forEach((updatedComment)=>{
                  payload[indexData][property].forEach((comment,i)=>{
                    if(comment._id==updatedComment._id){
                      commentIndex = i;
                    }
                  });

                  if(commentIndex != null){
                    for(let subproperty in updatedComment){
                      payload[indexData][property][commentIndex][subproperty] = updatedComment[subproperty];
                    }
                    commentIndex = null;
                  }
                  else{
                    payload[indexData][property].push(updatedComment);
                  }
              });
            }
        }
      }
      return tassign(state, {publications: payload, pending: false}); //
    case GET_PUBLICATIONS_ERROR:
      return tassign(state, {pending: false, error: "Error"});
    case ACTIVE_PUBLICATION:
      if(payload!=null){
        let indexData = null;
        state.publications.forEach((item, i) => {
          if (item._id == state.active) {
            indexData = i
          }
        });
        let copyState = state.publications;
        copyState[indexData] = {...state.publications[indexData]};
        return tassign(state,{publications: copyState, active: payload}); //Cambio el id de objeto de la última publicación activa para que se actualice
      }
      return tassign(state,{active: payload}); //Reseteo la variable active para que la próxima vuelta se actualicen todos las publicaciones
    case SAVE_PUBLICATION_STATE:
      return tassign(state, {resumeTo: payload});
    case RESUME_PUBLICATION:
      return tassign(state, {resumeTo: initialState.resumeTo});
    default:
      return state;
  }
}
