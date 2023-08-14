const asyncHandler = require('express-async-handler');

const Author = require('../models/author');
const Game = require('../models/game');

exports.index = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_create_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_create_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_update_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_update_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_delete_get = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_delete_post = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, gamesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Game.find({ author: req.params.id }).exec(),
  ]);

  if (author == null) {
    const err = new Error('Author Not Found');
    err.status = 404;
    next(err);
  } else {
    res.render('author_detail', {
      title: author.name,
      author,
      game_list: gamesByAuthor,
    });
  }
});

exports.author_list = asyncHandler(async (req, res) => {
  const allAuthors = await Author.find({}).exec();

  res.render('author_list', {
    title: 'Author List',
    author_list: allAuthors,
  });
});
