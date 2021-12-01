const { sendList, sendError, sendNotFound} = require('../../middleware/requests-helpers');

const getCount = (Models) => async (req, res, next) => {
  const { params: { collection, _id } } = req;
  if (typeof Models[collection] === 'function') {
    try {
        const data = await Models[collection].estimatedDocumentCount();
        sendList(res, { data });
    } catch (error) {
      next(error);
    }
  } else {
    sendNotFound(res);
  }
};

module.exports = { getCount };
