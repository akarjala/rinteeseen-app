var mongoose = require('mongoose');


var Schema = mongoose.Schema;

// Reviews schema with review being a number from 1 to 5.
// Comment is optional free form string.
// Date is timestamp when review was added.

var reviewSchema = new Schema({
	area      : String,
	review    : Number,
	comment   : { type: String, max: 100 },
	date      : { type: Date, default: Date.now },
	internaldate : { type: Date, default: Date.now },
	internal  : String,
	piste: { type: mongoose.Schema.Types.ObjectId, ref: 'Piste' }
});


var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

