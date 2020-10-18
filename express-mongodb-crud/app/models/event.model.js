const mongoose = require('mongoose');

/**
 * This is schema for events
 */

const eventSchema = new mongoose.Schema({
    title : {type : String, unique : true},
    venue : String,
    startDate : String,
    photoPath : String,
    endDate   : String,
    details : String,
    organizer : String,
    paid: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category'}
});

module.exports = mongoose.model('event', eventSchema);
