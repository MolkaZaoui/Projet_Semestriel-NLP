module.exports = app =>{
    const express = require('express');
    const router = express.Router();    
    const stagiaireController= require('../controllers/stagiaire.controller');
    const condidatController= require('../controllers/condidat.controller');
    const userController= require('../controllers/user.controller');
    
    router.post('/stagiaires', stagiaireController.upload.single('Cv'), stagiaireController.create);

    router.post('/condidats', condidatController.create);

    router.get('/condidat', condidatController.findAll);
    router.get('/condidat/:id', condidatController.findById);
    router.put('/condidat/edit/:id', condidatController.updateById );


    router.post('/stagiaire/create', stagiaireController.create);
    router.get('/stagiaire', stagiaireController.findAll);
    router.get('/stagiaire/:id', stagiaireController.findById);
    router.put('/stagiaire/edit/:id', stagiaireController.updateById );

    router.post('/register', userController.register);
    router.post('/login', userController.login); 


 

  

   

    app.use('/api/', router);
}