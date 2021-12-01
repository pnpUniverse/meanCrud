const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    seq: { type: Number, default: 1 },
    set_name: { type: String, default: 'Set' },
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

const Sunday_Call_Set = mongoose.model('Sunday_Call_Set', schema);
module.exports = {
    Sunday_Call_Set
}