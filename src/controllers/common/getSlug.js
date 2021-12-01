const { sendList, sendError } = require('../../middleware/requests-helpers');

const getSlug = (Models) => async (req, res, next) => {
  const { params: { collection, slug } } = req;
  if (typeof Models[collection] === 'function') {
    try {
      const data = await Models[collection].findOne(
        { slug }
      );
      sendList(res, { data });
    } catch (error) {
      next(error);
    }
  } else {
    sendNotFound(res);
  }
};

module.exports = { getSlug };
