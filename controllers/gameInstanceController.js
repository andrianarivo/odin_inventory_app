const asyncHandler = require('express-async-handler');

const GameInstance = require('../models/gameInstance');

exports.game_instance_create_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_create_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_update_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_update_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_delete_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_delete_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
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
