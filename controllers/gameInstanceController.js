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

exports.game_instance_detail = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.game_instance_list = asyncHandler(async (req, res) => {
  const allGameInstances = await GameInstance.find({}, 'game publisher status').populate('game').exec();

  res.render('game_instance_list', {
    title: 'Game Instance List',
    game_instance_list: allGameInstances,
  });
});
