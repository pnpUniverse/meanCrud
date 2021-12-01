const { sendCreated, sendNotFound } = require('../../middleware/requests-helpers');

const create = (models) => async (req, res, next) => {
  const { params: { collection } } = req;
  if (typeof models[collection] === 'function') {
    try {
      const data = new models[collection](req.body);
      await data.save();
      return sendCreated(res, data);
    } catch (error) {
      next(error);
    }
  } else {
    sendNotFound(res);
  }
};

module.exports = { create };
