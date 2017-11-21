import {tassign} from "tassign";
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
  publications: [],
  active: null,
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

      //Actualizo las propiedades de la publicación activa manteniendo el id del objeto publicación
        for(let property in updatedPublication){

            if(property!="comments"){
              payload[indexData][property] = updatedPublication[property];
            }
      // Si si trata de comentarios itero sobre los mismos y actualizo cada uno para mantener el id del objeto comentario
            else{
                let commentIndex = null;
                updatedPublication[property].forEach((updatedComment)=>{

                  payload[indexData][property].forEach((comment,i)=>{

                    if(comment._id==updatedComment._id){
                      commentIndex = i;
                    }
                    else{
                      if(!updatedPublication[property].some((item)=>{return item._id == comment._id})){
      // No existe el comentario en payload, entonces borro el comentario de state
                        payload[indexData][property].splice(i,1);
                      }
                    }
                  });

      // Existe el comentario en state y en payload, entonces actualizo las propiedades del mismo
                  if(commentIndex != null){
                    for(let subproperty in updatedComment){
                      payload[indexData][property][commentIndex][subproperty] = updatedComment[subproperty];
                    }
                  }
                  else{
      // No existe el comentario en state, entonces lo agrego
                    payload[indexData][property].push(updatedComment);
                  }
                  commentIndex = null;
              });
            }
        }
        return tassign(state, {publications: payload, pending: false, active: null});
      }
      else{
        if(state.publications.length == 0){
          return tassign(state, {publications: payload, pending: false});
        }
      }
      return state;
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
    default:
      return state;
  }
}
