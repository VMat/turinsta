import { tassign } from "tassign";
export var GET_PUBLICATIONS = "GET_PUBLICATIONS";
export var GET_PUBLICATIONS_SUCCESS = "GET_PUBLICATIONS_SUCCESS";
export var GET_PUBLICATIONS_ERROR = "GET_PUBLICATIONS_ERROR";
export var INCREMENT_PUBLICATION_RANGE = "INCREMENT_PUBLICATION_RANGE";
export var SET_PUBLICATION_USER_FILTER = "SET_PUBLICATION_USER_FILTER";
export var SET_PUBLICATION_PLACE_FILTER = "SET_PUBLICATION_PLACE_FILTER";
export var SET_PLACE_FILTER = "SET_PLACE_FILTER";
export var SET_SORT = "SET_SORT";
export function getPublications() {
    return {
        type: GET_PUBLICATIONS
    };
}
export function incrementPublicationRange() {
    return {
        type: INCREMENT_PUBLICATION_RANGE
    };
}
export function setFilter(dispatchName, filter) {
    return {
        type: dispatchName,
        payload: filter
    };
}
export function setSort(sort) {
    return {
        type: SET_SORT,
        payload: sort
    };
}
var initialState = {
    publications: [],
    range: 2,
    filters: { user: null, place: null },
    placeFilter: null,
    sort: { field: "publication.timestamps.created", way: -1 },
    pending: false,
    error: null
};
function findId(array, id) {
    var index = null;
    array.forEach(function (item, i) {
        if (item._id == id) {
            index = i;
        }
    });
    return index;
}
function deleteOverItems(target, source) {
    target.forEach(function (targetItem, i) {
        if (findId(source, targetItem._id) == null) {
            target.splice(i, 1);
        }
    });
}
function updateItems(target, source, arrayProperties) {
    var index = null;
    var arrayProperty = null;
    /*if(Boolean(arrayProperties)){
      arrayPropertyCopy = [...arrayProperties];
      if(arrayPropertyCopy.length>0){
        arrayProperty = arrayPropertyCopy.splice(0,1);
      }
    }*/
    target.forEach(function (targetItem) {
        index = findId(source, targetItem._id);
        if (index != null) {
            var _loop_1 = function(property) {
                arrayProperty = arrayProperties.filter(function (currentProperty) { return currentProperty.property == property; });
                if (arrayProperty == 0) {
                    targetItem[property] = source[index][property];
                }
                else {
                    execFullUpdate(targetItem[property], source[index][property], [{ "property": arrayProperty.subproperty, "subproperty": "" }]);
                }
            };
            for (var property in targetItem) {
                _loop_1(property);
            }
        }
    });
}
function appendItems(target, source) {
    source.forEach(function (sourceItem) {
        if (findId(target, sourceItem._id) == null) {
            target.push(sourceItem);
        }
    });
}
function updatePublications(statePublications, updatedPublications) {
    return execFullUpdate(statePublications, updatedPublications, [{ "property": "experiences", "subproperty": "" }, { "property": "comments", "subproperty": "replies" }]);
}
function orderItems(target, source) {
    var index = null;
    var aux = [];
    source.forEach(function (sourceItem) {
        index = findId(target, sourceItem._id);
        aux.push(target[index]);
    });
    return aux;
}
function execFullUpdate(target, source, arrayProperties) {
    deleteOverItems(target, source);
    updateItems(target, source, arrayProperties);
    appendItems(target, source);
    return orderItems(target, source);
}
export function publicationReducer(state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case GET_PUBLICATIONS: {
            return tassign(state, { pending: true, error: null });
        }
        case GET_PUBLICATIONS_SUCCESS: {
            if (state.publications.length > 0) {
                state.publications = updatePublications(state.publications, payload);
                return tassign(state, { pending: false });
            }
            return tassign(state, { publications: payload, pending: false });
        }
        case GET_PUBLICATIONS_ERROR: {
            if (Boolean(payload)) {
                return tassign(state, { pending: false, error: "Error", publications: payload });
            }
            return tassign(state, { pending: false, error: "Error" });
        }
        case INCREMENT_PUBLICATION_RANGE: {
            return tassign(state, { range: state.publications.length >= state.range ? state.range + 10 : state.range });
        }
        case SET_PUBLICATION_USER_FILTER: {
            var filtersCopy = { state: .filters };
            filtersCopy.user = payload;
            return tassign(state, { filters: filtersCopy });
        }
        case SET_PUBLICATION_PLACE_FILTER: {
            var filtersCopy = { state: .filters };
            filtersCopy.place = payload;
            return tassign(state, { filters: filtersCopy });
        }
        case SET_PLACE_FILTER: {
            return tassign(state, { placeFilter: payload });
        }
        case SET_SORT: {
            return tassign(state, { sort: payload });
        }
        default:
            return state;
    }
}
//# sourceMappingURL=publication.reducer.js.map