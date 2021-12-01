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

const Sunday_Call_Schedular = mongoose.model('Sunday_Call_Schedular', schema);
module.exports = {
    Sunday_Call_Schedular
}