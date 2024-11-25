const express=require('express');
const database= require('./src/database/db.config');
require('dotenv').config();
const app=express();

//app.use(express.json());

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

app.get('/', (req, res)=>{
    res.send({message: "Hello word!"});
})
app.use(express.urlencoded({extended: true}));
require('./src/api/routes/routes')(app);

app.listen(process.env.PORT, ()=>{
    console.log('listening on port', process.env.PORT);
});
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).send('Something went wrong!');
});