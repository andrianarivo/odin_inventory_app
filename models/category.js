const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

CategorySchema.virtual('url').get(function handler() {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/category/${this._id}`;
});

module.exports = model('Category', CategorySchema);
