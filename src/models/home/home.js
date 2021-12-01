const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    name: {
        type: String
    },
    our_vision: {
        type: String,
    },
    banner_message: {
        type: String,
    },
    banner_image_path: {
        type: [String],
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


const Home = mongoose.model('Home', schema);

module.exports = {
    Home
}