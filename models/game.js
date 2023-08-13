const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  publish_year: Number,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

GameSchema.virtual('url').get(function handler() {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/game/${this._id}`;
});

module.exports = model('Game', GameSchema);
