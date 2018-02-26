import {tassign} from "tassign";
export const SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES";
export const SET_UNSEEN_ACTIVITIES = "SET_UNSEEN_ACTIVITIES";


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
  unreadMessages: [],
  unseenActivities: []
};


export function userReducer(state = initialState, { type, payload } ) {
  switch( type ) {
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
