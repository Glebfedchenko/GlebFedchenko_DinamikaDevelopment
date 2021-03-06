const express = require('express');
const app = express();
const config = require ('./config')(app);
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use('/views', express.static(__dirname + '/views'));

app.set('views','./views');
app.set('view engine','ejs');

require('./routes')(app);

app.use(function (req,res,next) {

    res.statusMessage = 'This page does not exist.';
    res.status(404).render('error');
});

app.listen(config.get('port'), function (err) {
    if ( err ) console.log('err on server start. Error: ', err.stack);
    
    console.log('Server is running');
});