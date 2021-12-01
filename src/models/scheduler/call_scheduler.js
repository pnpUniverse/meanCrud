const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    call_set : {
        type: Array
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});

const Call_Schedular = mongoose.model('Call_Schedular', schema);
module.exports = {
    Call_Schedular
}