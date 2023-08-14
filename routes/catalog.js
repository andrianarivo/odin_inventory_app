const express = require('express');

const gameController = require('../controllers/gameController');
const authorController = require('../controllers/authorController');
const categoryController = require('../controllers/categoryController');
const gameInstanceController = require('../controllers/gameInstanceController');

const router = express.Router();

/// GAME ROUTES ///

// GET catalog home page.
router.get('/', gameController.index);

// GET request for creating a Game. NOTE This must come before routes that display Game (uses id).
router.get('/game/create', gameController.game_create_get);

// POST request for creating Game.
router.post('/game/create', gameController.game_create_post);

// GET request to delete Game.
router.get('/game/:id/delete', gameController.game_delete_get);

// POST request to delete Game.
router.post('/game/:id/delete', gameController.game_delete_post);

// GET request to update Game.
router.get('/game/:id/update', gameController.game_update_get);

// POST request to update Game.
router.post('/game/:id/update', gameController.game_update_post);

// GET request for one Game.
router.get('/game/:id', gameController.game_detail);

// GET request for list of all Game items.
router.get('/games', gameController.game_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', authorController.author_create_get);

// POST request for creating Author.
router.post('/author/create', authorController.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', authorController.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', authorController.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', authorController.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', authorController.author_update_post);

// GET request for one Author.
router.get('/author/:id', authorController.author_detail);

// GET request for list of all Authors.
router.get('/authors', authorController.author_list);

/// CATEGORY ROUTES ///

// GET request for creating a Category.
// NOTE This must come before route that displays Category (uses id).
router.get('/category/create', categoryController.category_create_get);

// POST request for creating Category.
router.post('/category/create', categoryController.category_create_post);

// GET request to delete Category.
router.get('/category/:id/delete', categoryController.category_delete_get);

// POST request to delete Category.
router.post('/category/:id/delete', categoryController.category_delete_post);

// GET request to update Category.
router.get('/category/:id/update', categoryController.category_update_get);

// POST request to update Category.
router.post('/category/:id/update', categoryController.category_update_post);

// GET request for one Category.
router.get('/category/:id', categoryController.category_detail);

// GET request for list of all Category.
router.get('/categories', categoryController.category_list);

/// GAME INSTANCE ROUTES ///

// GET request for creating a GameInstance.
// NOTE This must come before route that displays GameInstance (uses id).
router.get(
  '/game_instance/create',
  gameInstanceController.game_instance_create_get,
);

// POST request for creating GameInstance.
router.post(
  '/game_instance/create',
  gameInstanceController.game_instance_create_post,
);

// GET request to delete GameInstance.
router.get(
  '/game_instance/:id/delete',
  gameInstanceController.game_instance_delete_get,
);

// POST request to delete GameInstance.
router.post(
  '/game_instance/:id/delete',
  gameInstanceController.game_instance_delete_post,
);

// GET request to update GameInstance.
router.get(
  '/game_instance/:id/update',
  gameInstanceController.game_instance_update_get,
);

// POST request to update GameInstance.
router.post(
  '/game_instance/:id/update',
  gameInstanceController.game_instance_update_post,
);

// GET request for one GameInstance.
router.get('/game_instance/:id', gameInstanceController.game_instance_detail);

// GET request for list of all GameInstance.
router.get('/game_instances', gameInstanceController.game_instance_list);

module.exports = router;
