const { User } = require('../models/user/user');
const { Call_Set } = require('../models/call_set/call_set');
const { Sunday_Call_Set } = require('../models/sunday_call_set/sunday_call_set');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const mongoose = require('mongoose');
const _ = require('lodash');
var entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

module.exports = (function () {
    this.userLogin = async (email, password) => {
        const user = await User.findOne({ email });
        if (user) {
            const match = await user.comparePassword(password, user.password);
            if (match) {
                return await new Promise((res, rej) => {
                    jwt.sign({
                        id: user._id,
                        name: user.email
                    }, SECRET, { expiresIn: 36000 },
                        (err, token) => {
                            if (err) rej(err);
                            res({
                                login: match,
                                token: `Bearer ${token}`,
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                fullName: user.firstName + ' ' + user.lastName,
                                email: user.email,
                                mobNo: user.mobNo
                            })
                        }
                    );
                }).catch(TE);
            } else {
                return { message: 'Incorrect Password!! we are counting it :)' };
            }
        } else
            return { status: false, message: 'user not registered!' };
    }

    this.userRegister = async (body) => {
        const { username } = body
        const user = await User.findOne({ username });
        if (user) {
            return { status: false, message: 'User already registered!' };
        } else {
            const _user = new User(body)
            const response = await _user.save()
            return { status: true, message: 'user registered successfully!' };
        }
    }

    this.userUpdate = async (body) => {
        const { _id } = body;
        const user = await User.findOne({ _id: _id });
        if (user) {
            _.extend(user, body);
            const response = await user.save();
            return { status: true, message: 'user Updated successfully!' };
        }
    }

    this.creatCallSet = async (body) => {
        const call_set = await Call_Set.findOne().limit(1).sort({$natural:-1});
        if (call_set) {
            body['set_name'] = 'Set '+Number(call_set.seq+1);
            body['seq'] = call_set.seq+1;
        } else {
            body['set_name'] = 'Set 1';
        }
        const _call_set = new Call_Set(body)
        const response = await _call_set.save()
        return { status: true, data: response };
    }

    this.creatSundayCallSet = async (body) => {
        const call_set = await Sunday_Call_Set.findOne().limit(1).sort({$natural:-1});
        if (call_set) {
            body['set_name'] = 'Set '+Number(call_set.seq+1);
            body['seq'] = call_set.seq+1;
        } else {
            body['set_name'] = 'Set 1';
        }
        const _sunday_call_set = new Sunday_Call_Set(body)
        const response = await _sunday_call_set.save()
        return { status: true, data: response };
    }

    return this;
})()