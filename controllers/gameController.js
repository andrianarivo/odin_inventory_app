const asyncHandler = require('express-async-handler');

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

exports.game_create_get = function (req, res) {
  res.end('Not Yet implemented');
};

exports.game_create_post = function (req, res) {
  res.end('Not Yet implemented');
};

exports.game_update_get = function (req, res) {
  res.end('Not Yet implemented');
};

exports.game_update_post = function (req, res) {
  res.end('Not Yet implemented');
};

exports.game_delete_get = function (req, res) {
  res.end('Not Yet implemented');
};

exports.game_delete_post = function (req, res) {
  res.end('Not Yet implemented');
};

exports.game_detail = function (req, res) {
  res.end('Not Yet implemented');
};

exports.game_list = function (req, res) {
  res.end('Not Yet implemented');
};
