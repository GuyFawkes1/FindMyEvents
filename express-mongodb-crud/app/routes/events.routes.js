module.exports = (app) => {
    const events = require('../controllers/event.controller.js');

    // Create a new event
    app.post('/events', events.create);

    // Retrieve all events
    app.get('/events', events.findAll);

    // Retrieve a single event with eventId
    app.get('/events/:eventId', events.findOne);

    // Update a event with eventId
    app.put('/events/:eventId', events.update);

    // Delete a event with eventId
    app.delete('/events/:eventId', events.delete);

    app.get('/events/category/:categoryId', events.findByCategory);

    app.get('/events/category/name/:catName',events.findByCatName);
}