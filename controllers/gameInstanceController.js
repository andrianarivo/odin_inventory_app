const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const GameInstance = require('../models/gameInstance');
const Game = require('../models/game');

exports.game_instance_create_get = asyncHandler(async (req, res) => {
  const allGames = await Game.find().exec();
  res.render('game_instance_form', {
    title: 'Create Game Instance',
    game_list: allGames,
  });
});

exports.game_instance_create_post = [
  body('game', 'Game must be specified').trim().isLength({ min: 1 }).escape(),
  body('publisher', 'Publisher must not be empty').trim().isLength({ min: 1 }).escape(),
  body('status').trim().escape(),
  body('number_in_stock', 'Number in stock must be specified').trim().isNumeric().escape(),
  body('price', 'Price must be specified').trim().isNumeric().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const allGames = await Game.find().exec();

    const gameInstance = new GameInstance({
      game: req.body.game,
      publisher: req.body.publisher,
      number_in_stock: req.body.number_in_stock,
      price: req.body.price,
    });

    if (req.body.status) {
      gameInstance.status = req.body.status;
    }

    if (!errors.isEmpty()) {
      res.render('game_instance_form', {
        title: 'Create Game Instance',
        game_instance: gameInstance,
        selected_game: gameInstance.game,
        game_list: allGames,
        errors: errors.array(),
      });
    } else {
      await gameInstance.save();
      res.redirect(gameInstance.url);
    }
  }),
];

exports.game_instance_update_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_update_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_delete_get = asyncHandler(async (req, res) => {
  const gameInstance = await GameInstance.findById(req.params.id).exec();

  if (!gameInstance) {
    res.redirect('/catalog/game_instances');
  } else {
    res.render('game_instance_delete', {
      title: 'Delete Game Instance',
      game_instance: gameInstance,
    });
  }
});

exports.game_instance_delete_post = asyncHandler(async (req, res) => {
  const gameInstance = await GameInstance.findById(req.params.id).exec();

  if (gameInstance) {
    await GameInstance.findByIdAndRemove(req.body.game_instance_id).exec();
  }

  res.redirect('/catalog/game_instances');
});

exports.game_instance_detail = asyncHandler(async (req, res, next) => {
  const gameInstance = await GameInstance.findById(req.params.id).populate('game').exec();

  if (gameInstance == null) {
    const err = new Error('Gmae Instance Not Found');
    err.status = 404;
    next(err);
  } else {
    res.render('game_instance_detail', {
      // eslint-disable-next-line no-underscore-dangle
      title: gameInstance._id,
      game_instance: gameInstance,
    });
  }
});

exports.game_instance_list = asyncHandler(async (req, res) => {
  const allGameInstances = await GameInstance.find({}, 'game publisher status').populate('game').exec();

  res.render('game_instance_list', {
    title: 'Game Instance List',
    game_instance_list: allGameInstances,
  });
});
