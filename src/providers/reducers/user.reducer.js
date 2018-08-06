import { tassign } from "tassign";
export var SET_AVATAR = "SET_AVATAR";
export var SET_USERNAME = "SET_USERNAME";
export var SET_LANGUAGE = "SET_LANGUAGE";
export var SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES";
export var SET_UNSEEN_ACTIVITIES = "SET_UNSEEN_ACTIVITIES";
export function setAvatar(payload) {
    return {
        type: SET_AVATAR, payload: payload
    };
}
export function setUsername(payload) {
    return {
        type: SET_USERNAME, payload: payload
    };
}
export function setLanguage(payload) {
    return {
        type: SET_LANGUAGE, payload: payload
    };
}
export function setUnreadMessages(payload) {
    return {
        type: SET_UNREAD_MESSAGES, payload: payload
    };
}
export function setUnseenActivities(payload) {
    return {
        type: SET_UNSEEN_ACTIVITIES, payload: payload
    };
}
var initialState = {
    avatar: null,
    username: null,
    language: null,
    unreadMessages: [],
    unseenActivities: []
};
export function userReducer(state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case SET_AVATAR: {
            return tassign(state, { avatar: payload });
        }
        case SET_USERNAME: {
            return tassign(state, { username: payload });
        }
        case SET_LANGUAGE: {
            return tassign(state, { language: payload });
        }
        case SET_UNREAD_MESSAGES: {
            return tassign(state, { unreadMessages: payload });
        }
        case SET_UNSEEN_ACTIVITIES: {
            return tassign(state, { unseenActivities: payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=user.reducer.js.map