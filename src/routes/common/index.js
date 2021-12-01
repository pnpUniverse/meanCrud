const express = require('express');

const { get, list, create, update, remove, getCount, getSlug } = require('../../controllers/common');
const models = require('../../models');


const router = express();

router.get('/:collection', list(models));
router.get('/:collection/count', getCount(models));
router.get('/:collection/:_id', get(models));
router.get('/:collection/slug/:slug', getSlug(models));
router.post('/:collection/create', create(models));
router.put('/:collection/:_id', update(models));
router.delete('/:collection/:_id', remove(models));

module.exports = router;
