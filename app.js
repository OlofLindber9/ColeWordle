var express = require('express'),
    path = require('path'),
    bodyparser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();


// DB Connect String
var connect = "postgres://Olof_Lindberg:3113@localhost/ColeWordleDB";

// Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);

// set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( {extended: false}));


app.get('/', function(req, res){
    res.render('index');
});


// Server
app.listen(3000, function(){
    console.log('Server Started On Port 3000');
});