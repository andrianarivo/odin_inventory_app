const asyncHandler = require('express-async-handler');

const Category = require('../models/category');

exports.category_create_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.category_create_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.category_update_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.category_update_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.category_delete_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.category_delete_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.category_detail = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.category_list = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}).exec();

  res.render('category_list', {
    title: 'Category List',
    category_list: allCategories,
  });
});
