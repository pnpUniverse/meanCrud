const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const saltRounds = 15;

const schema = new Schema({
    firstName: {
        type: String,
        required: [true],
    },
    lastName: {
        type: String,
        required: [true],
    },
    username: {
        type: String,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: {
            validator: function () {
                return new Promise((res, rej) => {
                    User.findOne({ username: this.username, _id: { $ne: this._id } })
                        .then(data => {
                            if (data) {
                                res(false)
                            } else {
                                res(true)
                            }
                        })
                        .catch(err => {
                            res(false)
                        })
                })
            }, message: 'Username Already Taken'
        },
        index: {
            unique: true
        }
    },
    mobNo: {
        type: Number,
    },
    file: {
        type: String,
        required: [true, 'User Profile is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    createdAt: {
        type: Date,
        // required: [true],
    },
    createdBy: {
        type: ObjectId,
    }
});

/* virtual keys */
schema.virtual('fullName').get(() => {
    return this.firstName + ' ' + this.lastName
})


/* hash the password before save */
schema.pre('save', function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/* user schema methods */
schema.methods.comparePassword = async (password, hashPwsd) => {
    const match = await bcrypt.compare(password, hashPwsd);
    return (match) ? true : false;
}

const User = mongoose.model('User', schema);

module.exports = {
    User
}