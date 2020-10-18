const Category = require('../models/category.model.js');


exports.init = (req, res) => {
    let movies = new Category({ 
	    name: 'Movies',  
    });

    movies.save(function (err) {
        if(err) return console.error(err.stack)  
    });

    let plays = new Category({ 
	    name: 'Plays',  
    });

    plays.save(function (err) {
        if(err) return console.error(err.stack)  
    });

    let camps = new Category({ 
	    name: 'Camps',  
    });

    camps.save(function (err) {
        if(err) return console.error(err.stack)  
    });

    let other = new Category({ 
	    name: 'Other',  
    });

    other.save(function (err) {
        if(err) return console.error(err.stack)  
    });

    let concerts = new Category({ 
	    name: 'Concerts',  
    });

    concerts.save(function (err) {
        if(err) return console.error(err.stack)  
    });

    res.send("intiialization Done");
};

exports.findAll = (req, res) => {
	Category.find()
    .then(cats => {
        res.send(cats);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
    .then(cat => {
        if(!cat) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });            
        }
        res.send(cat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving category with id " + req.params.categoryId
        });
    });
};







// Create and Save a new category
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Category Name can not be empty"
        });
    }


    // Create a category
    const category = new Category({
        name: req.body.name,
    });

    // Save category in the database
    category.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Category."
        });
    });
};


exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name of category can not be empty"
        });
    }

	// Find category and update it with the request body
	Category.findByIdAndUpdate(req.params.categoryId, {
        name: req.body.name,
    }, {new: true})
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error updating category with id " + req.params.categoryId
        });
    });
};


exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });
        }
        res.send({message: "category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.categoryId
        });
    });
};

