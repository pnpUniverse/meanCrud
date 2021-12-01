const _ = require('lodash');

const remove = (Models) => async (req, res, next) => {
  const {
    params: { collection, _id }
  } = req;
  if (typeof Models[collection] === 'function') {
    try {
      const data = await Models[collection].findOne({ _id });
      _.extend(data, req.body);
      await data.remove();
      res.status(200).send({ data });
    } catch (error) {
      next(error);
    }
  } else {
    sendNotFound(res);
  }
};

module.exports = { remove };
