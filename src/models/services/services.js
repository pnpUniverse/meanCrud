const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    serviceName: {
        type: String,
        required: [true],
    },
    serviceDesc: {
        type: String,
    },
    serviceServices: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});


const Services = mongoose.model('Services', schema);

module.exports = {
    Services
}