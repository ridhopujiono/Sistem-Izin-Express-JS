const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/date', express.static(__dirname + '/node_modules/flatpickr/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/izitoast', express.static(__dirname + '/node_modules/izitoast/dist'));





const routes = require('./routes/index.js');
app.use(routes);

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})