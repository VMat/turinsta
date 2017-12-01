import {tassign} from "tassign";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
export const GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
export const INCREMENT_PUBLICATION_RANGE = "INCREMENT_PUBLICATION_RANGE";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const CLEAN_FILTERS = "CLEAN_FILTERS";
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

export function addFilter(filter){
  return {
    type: ADD_FILTER,
    payload: filter
  }
}

export function removeFilter(filterKey){
  return {
    type: REMOVE_FILTER,
    payload: filterKey
  }
}

export function cleanFilters(){
  return {
    type: CLEAN_FILTERS
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
  filters: [],
  sort: {field: "timestamps.created", way: -1},
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
  let arrayPropertyCopy = [];

  if(Boolean(arrayProperties)){
    arrayPropertyCopy = [...arrayProperties];
    if(arrayPropertyCopy.length>0){
      arrayProperty = arrayPropertyCopy.splice(0,1);
    }
  }

  target.forEach((targetItem)=>{
    index = findId(source, targetItem._id);
    if(index != null){
      for(let property in targetItem){
        if(property != arrayProperty){
          targetItem[property] = source[index][property];
        }
        else{
          execFullUpdate(targetItem[property], source[index][property], arrayPropertyCopy);
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
  execFullUpdate(statePublications, updatedPublications, ["comments","replies"]);
}

function execFullUpdate(target,source,arrayProperties){
  deleteOverItems(target, source);
  updateItems(target, source, arrayProperties);
  appendItems(target, source);
}

export function publicationReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_PUBLICATIONS:{
      return tassign(state, {pending: true, error: null});
    }
    case GET_PUBLICATIONS_SUCCESS:{

      if (state.publications.length > 0) {
        updatePublications(state.publications, payload);
        return tassign(state, {pending: false});
      }

      return tassign(state, {publications: payload, pending: false});
    }
    case GET_PUBLICATIONS_ERROR:{
      return tassign(state, {pending: false, error: "Error"});
    }
    case INCREMENT_PUBLICATION_RANGE:{
      return tassign(state, {range: state.publications.length >= state.range ? state.range + 10 : state.range});
    }
    case ADD_FILTER: {
      let index = null;
      state.filters.forEach((filter,i)=>{
        if(filter.key == payload.key){
          index = i;
        }
      });
      let filtersCopy = [...state.filters];
      if(index!=null){
        filtersCopy.splice(index,1);
      }

      filtersCopy.push(payload);
      return tassign(state, {filters: filtersCopy});
    }
    case REMOVE_FILTER:{
      let index = null;
      state.filters.forEach((filter,i)=>{
        if(filter.key == payload){
          index = i;
        }
      });
      let filtersCopy = [...state.filters];
      if(index!=null){
        filtersCopy.splice(index,1);
      }
      return tassign(state, {filters: filtersCopy});
    }
    case CLEAN_FILTERS:{
      return tassign(state, {filters: []})
    }
    case SET_SORT:{
      return tassign(state, {sort: payload})
    }
    default:
      return state;
  }
}
