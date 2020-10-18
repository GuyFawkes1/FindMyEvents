const Event = require('../models/event.model.js');
const Category = require('../models/category.model.js');
// Create and Save a new Event
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Event Name cannot be empty"
        });
    }

    if(!req.body.venue) {
        return res.status(400).send({
            message: "Event Venue cannot be empty"
        });
    }

    if(!req.body.startDate) {
        return res.status(400).send({
            message: "Event start Date cannot be empty"
        });
    }



    // Create a Event
    const event = new Event({
        title : req.body.title,
        venue : req.body.venue,
        startDate : req.body.startDate,
        photoPath : req.body.photoPath || 'No photo',
        endDate: req.body.endDate || 'No end date',
        details: req.body.details || '',
        organizer: req.body.organizer || '',
        paid: req.body.paid,
        category: req.body.category
    });

    // Save Event in the database
    event.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Event."
        });
    });
};

// Retrieve and return all events from the database.
exports.findAll = (req, res) => {
    Event.find().populate('category')
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving events."
        });
    });
};

// Find a single event with a eventId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId).populate('category')
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving event with id " + req.params.eventId
        });
    });
};

// Update a event identified by the eventId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Event Name cannot be empty"
        });
    }

    if(!req.body.venue) {
        return res.status(400).send({
            message: "Event Venue cannot be empty"
        });
    }

    if(!req.body.startDate) {
        return res.status(400).send({
            message: "Event start Date cannot be empty"
        });
    }

    // Find event and update it with the request body
    Event.findByIdAndUpdate(req.params.eventId, {
        title : req.body.title,
        venue : req.body.venue,
        startDate : req.body.startDate,
        photoPath : req.body.photoPath || "No photo",
        endDate: req.body.endDate || "No end date",
        details: req.body.details || "",
        organizer: req.body.organizer || "",
        paid: req.body.paid,
        category: req.body.category
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error updating event with id " + req.params.eventId
        });
    });
};

// Delete a event with the specified eventId in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send({message: "Event deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Could not delete event with id " + req.params.eventId
        });
    });
};

exports.findByCategory = (req, res) => {
    Event.find({ category : req.params.categoryId }).populate('category')
	.exec(function (err, events) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Events not found with given Category " + req.params.categoryId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Category " + req.params.categoryId
			});
		}
					
		res.send(events);
	});
};

exports.findByCatName = (req, res) => {
    Category.find({name:req.params.catName})
    .exec(function(err2,cats){
        Event.find({ category : cats[0]._id }).populate('category')
        .exec(function (err, events) {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Events not found with given Category " + catID
                    });                
                }
                return res.status(500).send({
                    message: "Error retrieving Events with given Category " + req.params.catName
                });
            }
                        
            res.send(events);
        }); 
    });
    
};
