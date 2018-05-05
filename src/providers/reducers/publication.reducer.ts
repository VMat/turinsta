import {tassign} from "tassign";
import {CommonsProvider} from "../commons/commons";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
export const GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
export const INCREMENT_PUBLICATION_RANGE = "INCREMENT_PUBLICATION_RANGE";
export const SET_PUBLICATION_USER_FILTER = "SET_PUBLICATION_USER_FILTER";
export const SET_PUBLICATION_PLACE_FILTER = "SET_PUBLICATION_PLACE_FILTER";
export const SET_PLACE_FILTER = "SET_PLACE_FILTER";
export const SET_SORT = "SET_SORT";

export function getPublications() {
  return {
    type: GET_PUBLICATIONS
  }
}

export function incrementPublicationRange(){
  return {
    type: INCREMENT_PUBLICATION_RANGE
  }
}

export function setFilter(dispatchName, filter){
  return {
    type: dispatchName,
    payload: filter
  }
}

export function setSort(sort){
  return {
    type: SET_SORT,
    payload: sort
  }
}

const initialState = {
  publications: [],
  range: 2,
  filters: {user: null, place: null},
  placeFilter: null,
  sort: {field: "publication.timestamps.created", way: -1},
  pending: false,
  error: null
};

function findId(array, id){
  let index = null;
  array.forEach((item,i)=>{
    if(item._id == id){
      index = i;
    }
  });
  return index;
}

function deleteOverItems(target, source){
  target.forEach((targetItem,i)=>{
    if(findId(source,targetItem._id)==null){
      target.splice(i,1);
    }
  });
}

function updateItems(target, source, arrayProperties){
  let index = null;
  let arrayProperty = null;

  /*if(Boolean(arrayProperties)){
    arrayPropertyCopy = [...arrayProperties];
    if(arrayPropertyCopy.length>0){
      arrayProperty = arrayPropertyCopy.splice(0,1);
    }
  }*/

  target.forEach((targetItem)=>{
    index = findId(source, targetItem._id);
    if(index != null){
      for(let property in targetItem){
        arrayProperty = arrayProperties.filter((currentProperty)=>{return currentProperty.property==property});
        if(arrayProperty == 0){
          targetItem[property] = source[index][property];
        }
        else{
          execFullUpdate(targetItem[property], source[index][property], [{"property": arrayProperty.subproperty,"subproperty":""}]);
        }
      }
    }
  });
}

function appendItems(target, source){
  source.forEach((sourceItem)=>{
    if(findId(target, sourceItem._id) == null){
      target.push(sourceItem);
    }
  });
}

function updatePublications(statePublications, updatedPublications){
  return execFullUpdate(statePublications, updatedPublications, [{"property": "experiences", "subproperty":""},{"property":"comments","subproperty":"replies"}]);
}

function orderItems(target, source){
  let index = null;
  let aux = [];
  source.forEach((sourceItem)=>{
    index = findId(target,sourceItem._id);
    aux.push(target[index]);
  });

  return aux;
}

function execFullUpdate(target,source,arrayProperties){
  deleteOverItems(target, source);
  updateItems(target, source, arrayProperties);
  appendItems(target, source);
  return orderItems(target, source);
}

export function publicationReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_PUBLICATIONS:{
      return tassign(state, {pending: true, error: null});
    }
    case GET_PUBLICATIONS_SUCCESS:{

      if (state.publications.length > 0) {
        state.publications = updatePublications(state.publications, payload);
        return tassign(state, {pending: false});
      }

      return tassign(state, {publications: payload, pending: false});
    }
    case GET_PUBLICATIONS_ERROR:{
      if(Boolean(payload)){
        return tassign(state, {pending: false, error: "Error", publications: payload});
      }
      return tassign(state, {pending: false, error: "Error"});
    }
    case INCREMENT_PUBLICATION_RANGE:{
      return tassign(state, {range: state.publications.length >= state.range ? state.range + 10 : state.range});
    }
    case SET_PUBLICATION_USER_FILTER: {
      let filtersCopy = {...state.filters};
      filtersCopy.user = payload;
      return tassign(state, {filters: filtersCopy});
    }
    case SET_PUBLICATION_PLACE_FILTER: {
      let filtersCopy = {...state.filters};
      filtersCopy.place = payload;
      return tassign(state, {filters: filtersCopy});
    }
    case SET_PLACE_FILTER: {
      return tassign(state, {placeFilter: payload});
    }
    case SET_SORT:{
      return tassign(state, {sort: payload})
    }
    default:
      return state;
  }
}
