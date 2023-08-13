const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const AuthorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: Date,
  date_of_death: Date,
});

AuthorSchema.virtual('url').get(function handler() {
// eslint-disable-next-line no-underscore-dangle
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('name').get(function handler() {
  let fullName = '';
  if (this.first_name && this.family_name) {
    fullName = `${this.family_name}, ${this.first_name}`;
  }
  return fullName;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function handler() {
  if (this.date_of_birth) {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  return '...';
});

AuthorSchema.virtual('date_of_death_formatted').get(function handler() {
  if (this.date_of_death) {
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  }
  return '...';
});

AuthorSchema.virtual('lifespan').get(function handler() {
  return `${this.date_of_birth_formatted} to ${this.date_of_death_formatted}`;
});

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function handler() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function handler() {
  return DateTime.fromJSDate(this.date_of_death).toISODate();
});

module.exports = model('Author', AuthorSchema);
