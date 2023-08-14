const asyncHandler = require('express-async-handler');

const Author = require('../models/author');
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

exports.author_detail = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_list = asyncHandler(async (req, res) => {
  const allAuthors = await Author.find({}).exec();

  res.render('author_list', {
    title: 'Author List',
    author_list: allAuthors,
  });
});
