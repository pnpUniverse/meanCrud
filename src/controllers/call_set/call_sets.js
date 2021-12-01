const { sendResponse } = require('../../middleware/requests-helpers');
const { creatCallSet, creatSundayCallSet } = require('../../services/authService');

const create_call_set = async (req, res, next) => {
    const { body } = req;
    try {
        return sendResponse(
            res,
            await creatCallSet(body)
        );
    } catch (error) {
        next(error);
    }
};

const create_sunday_call_set = async (req, res, next) => {
    const { body } = req;
    try {
        return sendResponse(
            res,
            await creatSundayCallSet(body)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { create_call_set, create_sunday_call_set };