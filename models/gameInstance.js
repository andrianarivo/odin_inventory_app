const { Schema, model } = require('mongoose');

const GameInstanceSchema = new Schema({
  game: { type: Schema.Types.ObjectId, required: true, ref: 'Game' },
  publisher: { type: String, required: true },
  status: { type: String, enum: ['InStock', 'Maintenance', 'Reserved'] },
  number_in_stock: { type: Number, required: true },
  price: { type: Number, required: true },
});

GameInstanceSchema.virtual('url').get(function handler() {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/game_instance/${this._id}`;
});

module.exports = model('GameInstance', GameInstanceSchema);
