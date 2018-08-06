export var EDIT_TEXT = '[Post] Edit';
export var UPVOTE = '[Post] Upvote';
export var DOWNVOTE = '[Post] Downvote';
export var RESET = '[Post] Reset';
export var EditText = (function () {
    /// user a constructor to send a payload with the action
    function EditText(payload) {
        this.payload = payload;
        this.type = EDIT_TEXT;
    }
    return EditText;
}());
export var Upvote = (function () {
    function Upvote() {
        this.type = UPVOTE;
    }
    return Upvote;
}());
export var Downvote = (function () {
    function Downvote() {
        this.type = DOWNVOTE;
    }
    return Downvote;
}());
export var Reset = (function () {
    function Reset() {
        this.type = RESET;
    }
    return Reset;
}());
//# sourceMappingURL=post.actions.js.map