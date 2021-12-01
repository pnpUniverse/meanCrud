const _ = require('lodash');
const { sendList } = require('../../middleware/requests-helpers');

const list = (Models) => async (req, res, next) => {
  let {
    query: { limit, skip, search },
    params: { collection }
  } = req;
  skip = skip ? parseInt(skip, 10) : 0;
  limit = limit ? parseInt(limit, 10) : 100;

  try {
    const query = {};
    if (search) {
      _.extend(query, { title: new RegExp(`${search}`, 'i') })
    }
    const data = await Models[collection].find(query).skip(skip).limit(limit).sort({ _id: 1 });
    return sendList(res, { data });
  } catch (error) {
    next(error);
  }
};

module.exports = { list };
