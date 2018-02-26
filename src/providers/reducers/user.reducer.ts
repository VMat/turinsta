import {tassign} from "tassign";
export const SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES";
export const ADD_UNREAD_MESSAGES = "ADD_UNREAD_MESSAGES";
export const REMOVE_UNREAD_MESSAGES = "REMOVE_UNREAD_MESSAGES";
export const CLEAR_UNREAD_MESSAGES = "CLEAR_UNREAD_MESSAGES";
export const SET_UNSEEN_ACTIVITIES = "SET_UNSEEN_ACTIVITIES";
export const ADD_UNSEEN_ACTIVITIES = "ADD_UNSEEN_ACTIVITIES";
export const REMOVE_UNSEEN_ACTIVITIES = "REMOVE_UNSEEN_ACTIVITIES";
export const CLEAR_UNSEEN_ACTIVITIES = "CLEAR_UNSEEN_ACTIVITIES";


export function setUnreadMessages(payload) {
  return {
    type: SET_UNREAD_MESSAGES, payload: payload
  }
}

export function addUnreadMessages() {
  return {
    type: ADD_UNREAD_MESSAGES
  }
}

export function removeUnreadMessages() {
  return {
    type: REMOVE_UNREAD_MESSAGES
  }
}

export function clearUnreadMessages() {
  return {
    type: CLEAR_UNREAD_MESSAGES
  }
}

export function setUnseenActivities(payload) {
  return {
    type: SET_UNSEEN_ACTIVITIES, payload: payload
  }
}

export function addUnseenActivities() {
  return {
    type: ADD_UNSEEN_ACTIVITIES
  }
}

export function removeUnseenActivities() {
  return {
    type: REMOVE_UNSEEN_ACTIVITIES
  }
}

export function clearUnseenActivities() {
  return {
    type: CLEAR_UNSEEN_ACTIVITIES
  }
}

const initialState = {
  unreadMessages: null,
  unseenActivities: null
};


export function userReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case SET_UNREAD_MESSAGES:{
      return tassign(state, {unreadMessages: payload});
    }
    case ADD_UNREAD_MESSAGES:{
      return tassign(state, {unreadMessages: (state.unreadMessages ? state.unreadMessages + 1 : 1)});
    }
    case REMOVE_UNREAD_MESSAGES:{
      return tassign(state, {unreadMessages: (state.unreadMessages > 1 ? state.unreadMessages - 1 : null)});
    }
    case CLEAR_UNREAD_MESSAGES:{
      return tassign(state, {unreadMessages: null});
    }
    case SET_UNSEEN_ACTIVITIES:{
      return tassign(state, {unseenActivities: payload});
    }
    case ADD_UNSEEN_ACTIVITIES:{
      return tassign(state, {unseenActivities: (state.unseenActivities ? state.unseenActivities + 1 : 1)});
    }
    case REMOVE_UNSEEN_ACTIVITIES:{
      return tassign(state, {unseenActivities: (state.unseenActivities > 1 ? state.unseenActivities - 1 : null)});
    }
    case CLEAR_UNSEEN_ACTIVITIES:{
      return tassign(state, {unseenActivities: null});
    }
    default:{
      return state;
    }
  }
}
