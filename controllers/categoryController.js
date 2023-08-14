const asyncHandler = require('express-async-handler');

const Category = require('../models/category');
const Game = require('../models/game');

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

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, gamesByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Game.find({ category: req.params.id }).populate('author').exec(),
  ]);

  if (category == null) {
    const err = new Error('Category Not Found');
    err.status = 404;
    next(err);
  } else {
    res.render('category_detail', {
      title: category.name,
      category,
      game_list: gamesByCategory,
    });
  }
});

exports.category_list = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}).exec();

  res.render('category_list', {
    title: 'Category List',
    category_list: allCategories,
  });
});
