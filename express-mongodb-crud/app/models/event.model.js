const mongoose = require('mongoose');

/**
 * This is schema for events
 */

const eventSchema = new mongoose.Schema({
    title : {type : String, unique : true, lowercase: true},
    venue : String,
    startDate : String,
    photoPath : String,
    endDate   : String,
    details : String,
    organizer : String,
    paid: Boolean,
    category: String
});

module.exports = mongoose.model('event', eventSchema);
