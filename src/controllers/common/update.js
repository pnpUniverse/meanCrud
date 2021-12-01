const _ = require('lodash');

const update = (Models) => async (req, res, next) => {
  const {
    params: { collection, _id }
  } = req;

  if (typeof Models[collection] === 'function') {
    try {
      const data = await Models[collection].findOne({ _id });
      _.extend(data, req.body);
      await data.save();
      res.status(200).send({ data });
    } catch (error) {
      next(error);
    }
  } else {
    sendNotFound(res);
  }
};

module.exports = { update };
