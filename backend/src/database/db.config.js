const mongoose = require('mongoose');
const config = require('../config/config');



const db = {};
mongoose.Promise=global.Promise;
mongoose.set('strictQuery',false);
db.mongoose=mongoose;
db.url=config.DB_URL;

db.condidat=require('../api/models/condidat.model')(mongoose);
db.stagiaire=require('../api/models/Stagiaire.model')(mongoose);

module.exports = { db }; 