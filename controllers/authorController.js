const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Author = require('../models/author');
const Game = require('../models/game');

exports.index = asyncHandler((req, res) => {
  res.end('Not Yet implemented');
});

exports.author_create_get = asyncHandler((req, res) => {
  res.render('author_form', {
    title: 'Create Author',
  });
});

exports.author_create_post = [
  body('first_name', 'Firstname must be specified').trim().isLength({ min: 1 }).escape(),
  body('last_name', 'Lastname must be specified').trim().isLength({ min: 1 }).escape(),
  body('date_of_birth').optional({ values: 'falsy' }).isISO8601().escape(),
  body('date_of_death').optional({ values: 'falsy' }).isISO8601().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const author = new Author({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'Create Author',
        author,
        errors: errors.array(),
      });
    } else {
      await author.save();
      res.redirect(author.url);
    }
  }),
];

exports.author_update_get = asyncHandler(async (req, res, next) => {
  const author = await Author.findById(req.params.id).exec();

  if (!author) {
    const err = new Error('Category Not Found');
    err.status = 404;
    next(err);
  } else {
    res.render('author_form', {
      title: 'Update Author',
      author,
    });
  }
});

exports.author_update_post = [
  body('first_name', 'Firstname must be specified').trim().isLength({ min: 1 }).escape(),
  body('last_name', 'Lastname must be specified').trim().isLength({ min: 1 }).escape(),
  body('date_of_birth').optional({ values: 'falsy' }).isISO8601().escape(),
  body('date_of_death').optional({ values: 'falsy' }).isISO8601().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const author = new Author({
      _id: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'Create Author',
        author,
        errors: errors.array(),
      });
    } else {
      const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, author, {});
      res.redirect(updatedAuthor.url);
    }
  }),
];

exports.author_delete_get = asyncHandler(async (req, res) => {
  const [author, gamesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Game.find({ author: req.params.id }).exec(),
  ]);
  if (!author) {
    res.redirect('/catalog/authors');
  }

  res.render('author_delete', {
    title: 'Delete Author',
    author,
    game_list: gamesByAuthor,
  });
});

exports.author_delete_post = asyncHandler(async (req, res) => {
  const [author, gamesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Game.find({ author: req.params.id }).exec(),
  ]);

  if (author) {
    if (gamesByAuthor.length) {
      res.render('author_delete', {
        title: 'Delete Author',
        author,
        game_list: gamesByAuthor,
      });
    } else {
      await Author.findByIdAndRemove(req.body.author_id);
    }
  }

  res.redirect('/catalog/authors');
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
