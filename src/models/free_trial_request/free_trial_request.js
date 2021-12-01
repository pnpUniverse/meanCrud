const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    service: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});


const Free_Trial_Request = mongoose.model('Free_Trial_Request', schema);

module.exports = {
    Free_Trial_Request
}