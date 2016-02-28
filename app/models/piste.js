var mongoose = require('mongoose');


// Piste schemas

var Schema = mongoose.Schema;

var pisteSchema = new Schema({
  country    : String,
  area       : String,
  name       : String,
  date       : Date,
  status     : String,
  difficulty : String,
  length     : String,
  hidden     : Boolean,
  extrainfo  : String,
  reviews    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});




// Compile a 'Piste' model using the pisteSchema as a structure.
// Mongoose also creates MongoDB collection called 'Pistes' for the documents.

var Piste = mongoose.model('Piste', pisteSchema);
module.exports = Piste;

