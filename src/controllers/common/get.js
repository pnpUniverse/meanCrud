const { sendList, sendError } = require('../../middleware/requests-helpers');

const get = (Models) => async (req, res, next) => {
  const { params: { collection, _id } } = req;
  if (typeof Models[collection] === 'function') {
    try {
      const data = await Models[collection].findOne(
        { _id }
      );
      sendList(res, { data });
    } catch (error) {
      next(error);
    }
  } else {
    sendNotFound(res);
  }
};

module.exports = { get };
