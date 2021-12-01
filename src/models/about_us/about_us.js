const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    content: {
        type: String
    },
    mission: {
        type: String
    },
    vision: {
        type: String
    },
    purpose: {
        type: String
    },
    slug: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});


const About_Us = mongoose.model('About_Us', schema);

module.exports = {
    About_Us
}