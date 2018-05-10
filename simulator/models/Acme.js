var mongoose = require('mongoose');

var AcmeSchema = new mongoose.Schema( {
	name: String,
	dev_location: String,
	updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Acme', AcmeSchema);


