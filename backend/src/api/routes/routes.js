module.exports = app =>{
    const router = require('express').Router();
    const stagiaireController= require('../controllers/stagiaire.controller');
    const condidatController= require('../controllers/condidat.controller');
    
    router.post('/stagiaires', stagiaireController.upload.single('Cv'), stagiaireController.create);


    //router.post('/stagiaire/create', stagiaireController.create);
    router.get('/stagiaire', stagiaireController.findAll);
    router.get('/stagiaire/:id', stagiaireController.findById);
    router.put('/stagiaire/edit/:id', stagiaireController.updateById );


    router.post('/condidat/create', condidatController.create);
    router.get('/condidat', condidatController.findAll);
    router.get('/condidat/:id', condidatController.findById);
    router.put('/condidat/edit/:id', condidatController.updateById );


  

   

    app.use('/api/', router);
}