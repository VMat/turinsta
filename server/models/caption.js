const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose captionSchema definition
const captionSchema = new Schema({
  "language": {
    "name": String,
    "short": String,
    "flag": String
  },
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

const Captions = mongoose.model('Captions', captionSchema, 'Captions');

module.exports = Captions;
