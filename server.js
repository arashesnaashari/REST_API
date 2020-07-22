const express = require('express');
const app = express();
const mongoose = require('mongoose');


//connect to DB
mongoose.connect('mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/restapi?retryWrites=true&w=majority',{ useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('err',(err) => console.log(err));
db.once('open',() => console.log('Connected to DB'));


app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers',subscribersRouter)



app.listen(3000,() => console.log('Server Starte'));