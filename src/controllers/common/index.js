const { get } = require('./get');
const { list } = require('./list');
const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');
const { getCount } = require('./getCount');
const { getSlug } = require('./getSlug');

module.exports = {
  get,
  list,
  create,
  update,
  remove,
  getCount,
  getSlug
};
