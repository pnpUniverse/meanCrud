const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    nodeName: {
        type: String,
        required: [true],
    },
    nodeDesc: {
        type: String,
    },
    nodeStatus: {
        type: String,
        enum : ['available','on_going', 'not_available'],
        default: 'available'
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});


const Node = mongoose.model('Node', schema);

module.exports = {
    Node
}