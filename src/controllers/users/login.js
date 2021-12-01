const { sendResponse } = require('../../middleware/requests-helpers');
const { userLogin, userRegister, userUpdate } = require('../../services/authService');
const formidable = require('formidable');
const fs = require('fs');
const { random, forEach } = require('lodash');

const login = async (req, res, next) => {
    const { body: { email, password } } = req;
    try {
        return sendResponse(
            res,
            await userLogin(email, password)
        );
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    const form = formidable({ multiples: true });
    let body = {};
    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        fields = fields;
        const { file } = files;
        if(file){
            const oldPath = file.path;
            const duyanicName = Date.now();
            const newPath = global.upload_dir_path + '/'+ duyanicName + '_' +file.name;
            const rawData = fs.readFileSync(oldPath)
            fs.writeFile(newPath, rawData, function(err){
                if(err) console.log(err)
            })
            file.path = newPath;
            if(fs.existsSync(newPath)){
                fields['file'] = duyanicName + '_' +file.name;
                body = fields;
                try {
                    return sendResponse(
                        res,
                        userRegister(body)
                    );
                } catch (error) {
                    next(error);
                }
            } 
        }
    });
    // form.on('end', ()=>{
    // })
};

const UpdateUser = async (req, res, next) => {
    const form = formidable({ multiples: true });
    let body = {};
    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        fields = fields;
        fields['_id'] = req.params._id;
        const { file } = files;
        if(file) {
            const oldPath = file.path;
            const duyanicName = Date.now();
            const newPath = global.upload_dir_path + '/'+ duyanicName + '_' +file.name;
            const rawData = fs.readFileSync(oldPath)
            fs.writeFile(newPath, rawData, function(err){
                if(err) console.log(err)
            })
            file.path = newPath;
            if(fs.existsSync(newPath)){
                fields['file'] = duyanicName + '_' +file.name;
                body = fields;
                try {
                    return sendResponse(
                        res,
                        userUpdate(body)
                    );
                } catch (error) {
                    next(error);
                }
            }
        } else {
            body = fields;
            try {
                return sendResponse(
                    res,
                    userUpdate(body)
                );
            } catch (error) {
                next(error);
            }
        }
    });
};

const change_duration = async (req, res, next) => {
    const { params : { duration } } = req;
    try {
        global.duration = Number(duration);
        return sendResponse(
            res,
            await global.duration
        );
    } catch (error) {
        next(error);
    }
};

const get_call_duration = async (req, res, next) => {
    try {
        return sendResponse(
            res,
            await global.duration
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { login, register, change_duration, get_call_duration, UpdateUser };