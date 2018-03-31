import {tassign} from "tassign";
export const SET_AVATAR = "SET_AVATAR";
export const SET_USERNAME = "SET_USERNAME";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES";
export const SET_UNSEEN_ACTIVITIES = "SET_UNSEEN_ACTIVITIES";


export function setAvatar(payload) {
  return {
    type: SET_AVATAR, payload: payload
  }
}

export function setUsername(payload) {
  return {
    type: SET_USERNAME, payload: payload
  }
}

export function setLanguage(payload) {
  return {
    type: SET_LANGUAGE, payload: payload
  }
}

export function setUnreadMessages(payload) {
  return {
    type: SET_UNREAD_MESSAGES, payload: payload
  }
}

export function setUnseenActivities(payload) {
  return {
    type: SET_UNSEEN_ACTIVITIES, payload: payload
  }
}

const initialState = {
  avatar: null,
  username: null,
  language: null,
  unreadMessages: [],
  unseenActivities: []
};


export function userReducer(state = initialState, { type, payload } ) {
  switch( type ) {
    case SET_AVATAR:{
      return tassign(state, {avatar: payload});
    }
    case SET_USERNAME:{
      return tassign(state, {username: payload});
    }
    case SET_LANGUAGE:{
      return tassign(state, {language: payload});
    }
    case SET_UNREAD_MESSAGES:{
      return tassign(state, {unreadMessages: payload});
    }
    case SET_UNSEEN_ACTIVITIES:{
      return tassign(state, {unseenActivities: payload});
    }
    default:{
      return state;
    }
  }
}
