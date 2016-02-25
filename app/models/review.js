var mongoose = require('mongoose');


var Schema = mongoose.Schema;

// Reviews schema with review being a number from 1 to 5.
// Comment is optional free form string.
// Date is timestamp when review was added.

var reviewSchema = new Schema({
  review    : Number,
  comment   : String,
  date      : { type: Date, default: Date.now },
  piste: { type: mongoose.Schema.Types.ObjectId, ref: 'Piste' }
});


var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

