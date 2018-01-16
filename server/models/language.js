const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose languageSchema definition
const languageSchema = new Schema({
  "name": String,
  "short": String,
  "flag": String,
  "glosary": {
        "timeUnits": {
            "YEAR": {
                "SINGULAR": String,
                "PLURAL": String
            },
            "MONTH": {
                "SINGULAR": String,
                "PLURAL": String
            },
            "DAY": {
                "SINGULAR": String,
                "PLURAL": String
            },
            "HOUR": {
                "SINGULAR": String,
                "PLURAL": String
            },
            "MINUTE": {
                "SINGULAR": String,
                "PLURAL": String
            },
            "SECOND": {
                "SINGULAR": String,
                "PLURAL": String
            }
        },
        "antiquitySentence": String,
        "veryRecentActivitySentence": String
    }
});

const Languages = mongoose.model('Languages', languageSchema, 'Languages');

module.exports = Languages;
