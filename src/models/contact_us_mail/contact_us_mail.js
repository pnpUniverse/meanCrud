const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    name: {
        type: String,
        required: [true],
    },
    email: {
        type: String,
        required: [true],
    },
    subject: {
        type: String,
        required: [true],
    },
    message: {
        type: String,
        required: [true],
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});


const Contact_Us_Mail = mongoose.model('Contact_Us_Mail', schema);

module.exports = {
    Contact_Us_Mail
}