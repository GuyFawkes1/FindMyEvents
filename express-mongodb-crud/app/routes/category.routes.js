module.exports =  (app) => {

	var category= require('../controllers/category.controller.js');
	
    app.get('/api/category/init', category.init);


	app.post('/api/category', category.create);

    
    app.get('/api/category/:categoryId', category.findOne);
    
    // app.get('/api/category/:categoryId',category.findAllByCategory);
    
	app.get('/api/category', category.findAll);

    app.put('/api/category/:categoryId', category.update);

    app.delete('/api/category/:categoryId', category.delete);


}