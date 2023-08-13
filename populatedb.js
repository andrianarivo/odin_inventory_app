console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const Game = require('./models/game');
const Author = require('./models/author');
const Category = require('./models/category');
const GameInstance = require('./models/gameInstance');

const categories = [];
const authors = [];
const games = [];
const gameInstances = [];

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createAuthors();
  await createGames();
  await createGameInstances();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({name, description});
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function authorCreate(index, first_name, last_name, d_birth, d_death) {
  const authordetail = {first_name, last_name};
  if (d_birth != false) authordetail.date_of_birth = d_birth;
  if (d_death != false) authordetail.date_of_death = d_death;

  const author = new Author(authordetail);

  await author.save();
  authors[index] = author;
  console.log(`Added author: ${first_name} ${last_name}`);
}

async function gameCreate(index, name, description, pub_date, author, category) {
  const gameDetail = {
    name,
    description,
    author,
  };
  if (category != false) gameDetail.genre = category;
  if (pub_date != false) gameDetail.publish_year = pub_date;

  const game = new Game(gameDetail);
  await game.save();
  games[index] = game;
  console.log(`Added game: ${name}`);
}

async function gameInstanceCreate(index, game, publisher, status, number_in_stock, price) {
  const gameInstanceDetail = {
    game,
    publisher,
    number_in_stock,
    price
  };
  if (status != false) gameInstanceDetail.status = status;

  const gameInstance = new GameInstance(gameInstanceDetail);
  await gameInstance.save();
  gameInstances[index] = gameInstance;
  console.log(`Added game instance: ${publisher}_${number_in_stock}_${price}`);
}

async function createCategories() {
  console.log('Adding genres');
  await Promise.all([
    categoryCreate(0, 'Abstract', 'These games involve strategy and little hidden information among players. They do not have a theme or have a minimal theme'),
    categoryCreate(1, 'Campaign', 'These games are like a series, where each session picks up where it left off. A good example of a campaign game is Gloomhaven'),
    categoryCreate(2, 'Card', 'These games deal with playing cards, often instead of game pieces. Sometimes, a card game may not even have a board at all'),
    categoryCreate(3, 'Strategy', 'These games relies primarily on strategy.'),
    categoryCreate(4, 'Casual', 'These games are played in under an hour, set up and taught in under 10 minutes, and requires some light strategic thought.'),
  ]);
}

async function createAuthors() {
  console.log('Adding authors');
  await Promise.all([
    authorCreate(0, 'Reiner', 'Knizia', '1957-11-16', false),
    authorCreate(1, 'Uwe', 'Rosenberg', '1970-03-27', false),
    authorCreate(2, 'Vlaada', 'Chvátil', '1971-09-14', false),
    authorCreate(3, 'Martin', 'Wallace', '1962-06-01', false),
    authorCreate(4, 'Stefan', 'Feld', '1971-12-16', false),
    authorCreate(4, 'Antoine', 'Bauza', '1970-01-01', false),
  ]);
}

async function createGames() {
  console.log('Adding Books');
  await Promise.all([
    gameCreate(
        0,
        'My City',
        'My City is a competitive legacy game where you will develop a city on a personal playing board as you play through the ages. The player who has performed the best throughout the course of the entire legacy experience is declared the winner.',
        2020,
        authors[0],
        [categories[1]],
    ),
    gameCreate(
        1,
        'Modern Art Card Game',
        'Players represent art dealers, both buying and selling works of art by five different fictional artists.[1] At the end of each round, they sell the paintings they bought back to the "bank". More popular artists\' works are worth more, and the value carries over into future rounds. Although the game is played entirely using cards, a board is used for scoring, so the game is sometimes referred to as a board game.',
        1992,
        authors[0],
        [categories[2]],
    ),
    gameCreate(
        2,
        'Lord Of The Rings',
        'The Lord of the Rings: The Board Game is a unique cooperative board game for two to five players. Legendary designer Reiner Knizia puts players in the roles of hobbits on a perilous quest to destroy the One Ring. Their journey is brought to life by world renowned Tolkien artist John Howe, whose illustrations make this game an immersive work of art.',
        2000,
        authors[0],
        [categories[1]],
    ),
    gameCreate(
        3,
        'Patchwork',
        'In the long-awaited digital adaptation of Uwe Rosenberg’s award-winning Patchwork, players patch their way to victory using fabric pieces of assorted sizes, colors, and buttons. The best quilt is the fullest, and whoever can patch up their quilt the most and collect more buttons wins the game – but be resourceful and plan every stitch',
        2014,
        authors[1],
        [categories[3]],
    ),
    gameCreate(
        4,
        'Bohnanza',
        ' It is played with a deck of cards with comical illustrations of eleven different types of beans of varying scarcity, which the players are trying to plant and sell in order to earn money. The principal restriction is that players may only farm two or three types of beans at once (limited by the number of fields they own), but they obtain beans of all different types randomly from the deck and so must engage in trade with the other players to be successful.',
        1997,
        authors[1],
        [categories[2]],
    ),
    gameCreate(
        5,
        'Wildlands',
        'The game is set in a post-apocalyptic world where the great Darkness has fallen, and the Empire with it. The arcane crystals which once powered entire cities were shattered, and the Darkness was destroyed by the magics unleashed. All that remains are the lawless ruins known as the Wildlands, and the shards of the crystals that have been strewn across them. Players take control of one of four factions, from the spell-slinging Mages’ Guild or the nimble Gnomads to the versatile Lawbringers or the hard-hitting Pit Fighters. Each brings their own playstyle, with unique decks of action cards determining their abilities on the battlefield, so players must plan their tactics carefully.',
        '2018',
        authors[3],
        [categories[3], categories[4]],
    ),
    gameCreate(
        6,
        'Railways of the World',
        'The game takes place in the eastern United States in 1830, where each player takes charge of a pioneering new railway company. Players score victory points by delivering goods between cities, using their own railway links as much as possible. In order to do that, players must build railroad tracks between cities, upgrade locomotives and find the best delivery lines to get the right cargo to the right city.',
        2005,
        authors[3],
        false,
    ),
  ]);
}

async function createGameInstances() {
  console.log('Adding authors');
  await Promise.all([
    gameInstanceCreate(0, games[0], 'Thames and Kosmos', 'InStock', 4, 41.26),
    gameInstanceCreate(1, games[1], 'CMON', 'Maintenance', 3, 19.99),
    gameInstanceCreate(2, games[2], 'Wizards of the Coast', 'InStock', 10, 105.97),
    gameInstanceCreate(
        3,
        games[2],
        'Parker Brothers',
        'InStock',
        10,
        48.90
    ),
    gameInstanceCreate(
        4,
        games[3],
        'Lookout Games',
        'InStock',
        2,
        6.99
    ),
    gameInstanceCreate(
        5,
        games[4],
        'AMIGO',
        'Maintenance',
        0,
        12.99
    ),
    gameInstanceCreate(
        6,
        games[2],
        'Kosmos',
        'InStock',
        13,
        92.13
    ),
    gameInstanceCreate(
        7,
        games[2],
        'Hasbro',
        'Maintenance',
        8,
        146.43,
    ),
    gameInstanceCreate(
        8,
        games[2],
        'Fantasy Flight Games',
        'InStock',
        5,
        63.03
    ),
    gameInstanceCreate(9, games[3], 'Twin Sales Interactive', false, 1, 6.99),
    gameInstanceCreate(10, games[4], 'Rio Grande Games', false, 0, 19.95),
  ]);
}
