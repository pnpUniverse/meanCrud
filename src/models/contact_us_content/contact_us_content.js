const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    location: {
        type: String,
    },
    email: {
        type: String,
    },
    contact_no: {
        type: String,
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


const Contact_Us_Content = mongoose.model('Contact_Us_Content', schema);

module.exports = {
    Contact_Us_Content
}