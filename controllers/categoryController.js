const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Game = require('../models/game');

exports.category_create_get = asyncHandler((req, res) => {
  res.render('category_form.ejs', {
    title: 'Create Category',
  });
});

exports.category_create_post = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      }
      await category.save();
      res.redirect(category.url);
    }
  }),
];

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
