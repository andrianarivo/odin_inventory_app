const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Game = require('../models/game');
const Author = require('../models/author');
const Category = require('../models/category');
const GameInstance = require('../models/gameInstance');

exports.index = asyncHandler(async (req, res) => {
  const [
    gamesCount,
    authorsCount,
    categoriesCount,
    gameInstancesCount,
  ] = await Promise.all([
    Game.countDocuments().exec(),
    Author.countDocuments().exec(),
    Category.countDocuments().exec(),
    GameInstance.countDocuments().exec(),
  ]);

  res.render('index', {
    title: 'Meta Boarder Home',
    game_count: gamesCount,
    author_count: authorsCount,
    category_count: categoriesCount,
    game_instance_count: gameInstancesCount,
  });
});

exports.game_create_get = asyncHandler(async (req, res) => {
  const [allAuthor, allCategories] = await Promise.all([
    Author.find().exec(),
    Category.find().exec(),
  ]);

  res.render('game_form', {
    title: 'Create Game',
    authors: allAuthor,
    categories: allCategories,
  });
});

exports.game_create_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === 'undefined') req.body.category = [];

      else req.body.category = new Array(req.body.category);
    }
    next();
  },
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('publish_year', 'Publish year must be a number.').trim().isNumeric().escape(),
  body('category.*').escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const game = new Game({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      publish_year: req.body.publish_year,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allCategories] = await Promise.all([
        Author.find().exec(),
        Category.find().exec(),
      ]);
      const allCategoriesChecked = allCategories.map((category) => {
        const newCategory = category;
        // eslint-disable-next-line no-underscore-dangle
        if (game.category.includes(category._id.toString())) {
          newCategory.checked = true;
        }
        return newCategory;
      });
      res.render('game_form', {
        title: 'Create Game',
        authors: allAuthors,
        categories: allCategoriesChecked,
        selected_author: game.author,
        game,
        errors: errors.array(),
      });
    } else {
      await game.save();
      res.redirect(game.url);
    }
  }),
];

exports.game_update_get = asyncHandler(async (req, res, next) => {
  const [game, allAuthors, allCategories] = await Promise.all([
    Game.findById(req.params.id).exec(),
    Author.find().exec(),
    Category.find().exec(),
  ]);

  if (!game) {
    const err = new Error('Game not found');
    err.status = 404;
    next(err);
  }

  const allCategoriesChecked = allCategories.map((category) => {
    const newCategory = category;
    // eslint-disable-next-line no-underscore-dangle
    if (game.category.includes(category._id.toString())) {
      newCategory.checked = true;
    }
    return newCategory;
  });

  res.render('game_form', {
    title: 'Update Game',
    game,
    selected_author: game.author,
    authors: allAuthors,
    categories: allCategoriesChecked,
  });
});

exports.game_update_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === 'undefined') req.body.category = [];

      else req.body.category = new Array(req.body.category);
    }
    next();
  },
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('publish_year', 'Publish year must be a number.').trim().isNumeric().escape(),
  body('category.*').escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const game = new Game({
      _id: req.params.id,
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      publish_year: req.body.publish_year,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allCategories] = await Promise.all([
        Author.find().exec(),
        Category.find().exec(),
      ]);
      const allCategoriesChecked = allCategories.map((category) => {
        const newCategory = category;
        // eslint-disable-next-line no-underscore-dangle
        if (game.category.includes(category._id.toString())) {
          newCategory.checked = true;
        }
        return newCategory;
      });
      res.render('game_form', {
        title: 'Create Game',
        authors: allAuthors,
        categories: allCategoriesChecked,
        selected_author: game.author,
        game,
        errors: errors.array(),
      });
    } else {
      const udpatedGame = await Game.findByIdAndUpdate(req.params.id, game, {});
      res.redirect(udpatedGame.url);
    }
  }),
];

exports.game_delete_get = asyncHandler(async (req, res) => {
  const [game, gameInstances] = await Promise.all([
    Game.findById(req.params.id).exec(),
    GameInstance.find({ game: req.params.id }).populate('game').exec(),
  ]);
  if (game == null) {
    res.redirect('/catalog/games');
  } else {
    res.render('game_delete', {
      title: 'Delete Game',
      game,
      game_instances: gameInstances,
    });
  }
});

exports.game_delete_post = asyncHandler(async (req, res) => {
  const [game, gameInstances] = await Promise.all([
    Game.findById(req.params.id).exec(),
    GameInstance.find({ game: req.params.id }).populate('game').exec(),
  ]);
  if (game) {
    if (gameInstances.length) {
      res.render('game_delete', {
        title: 'Delete Game',
        game,
        game_instances: gameInstances,
      });
    } else {
      await Game.findByIdAndRemove(req.body.game_id);
    }
  }

  res.redirect('/catalog/games');
});

exports.game_detail = asyncHandler(async (req, res, next) => {
  const [game, allGameInstances] = await Promise.all([
    Game.findById(req.params.id).populate('author').populate('category').exec(),
    GameInstance.find({ game: req.params.id }).exec(),
  ]);

  if (game == null) {
    const err = new Error('Game not found');
    err.status = 404;
    next(err);
  } else {
    res.render('game_detail', {
      title: game.name,
      game,
      game_instances: allGameInstances,
    });
  }
});

exports.game_list = asyncHandler(async (req, res) => {
  const allGames = await Game.find({}, 'name description').exec();
  res.render('game_list', {
    title: 'Game List',
    game_list: allGames,
  });
});
