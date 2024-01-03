var express = require('express'),
    path = require('path'),
    bodyparser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();


const client = require('./db');



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

const cors = require('cors');
app.use(cors());


app.get('/', function(req, res){
    res.render('index');
});

// Server
app.listen(3000, function(){
    console.log('Server Started On Port 3000');
});

//get songs

app.get('/api/songs', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM songs');
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error fetching data');
    }
});