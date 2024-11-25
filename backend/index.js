const express=require('express');
const database= require('./src/database/db.config');
require('dotenv').config();
const app=express();
const multer = require('multer');
const path = require('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

database.mongoose.connect(database.url,{
useNewUrlParser: true,
useUnifiedTopology:true
}
).then(()=>{
    console.log('connected to database');
})
.catch(err => {
    console.log(err);
});
// Route de test pour débogage
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});
app.get('/', (req, res)=>{
    res.send({message: "Hello word!"});
})
require('./src/api/routes/routes')(app);


app.listen(process.env.PORT, ()=>{
    console.log('listening on port', process.env.PORT);
});

