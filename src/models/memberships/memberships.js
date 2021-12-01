const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
 
const schema = new Schema({
    service_slug: {
        type: String
    },
    service_name: {
        type: String,
    },
    service_monthly: {
        type: String,
    },
    service_quarterly: {
        type: String,
    },
    service_half_yearly: {
        type: String,
    },
    service_yearly: {
        type: String,
    },
    currency_used: {
        type: String,
        enum : ['SGD','USD'],
        default: 'SGD'
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});


const Memberships = mongoose.model('Memberships', schema);

module.exports = {
    Memberships
}