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


//get song name
app.get('/api/name', async (req, res) => {      //changed Name to name maybe not working
    const songName = req.query.name;
    try {
        const result = await client.query('SELECT name FROM songs WHERE name = $1', [songName]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error fetching data');
    }
});


//get song album
app.get('/api/album', async (req, res) => {
    const songName = req.query.name;
    try {
        const result = await client.query('SELECT album FROM songs WHERE name = $1', [songName]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error fetching data');
    }
});

//get song tracknumber
app.get('/api/tracknumber', async (req, res) => {
    const songName = req.query.name;
    try {
        const result = await client.query('SELECT tracknumber FROM songs WHERE name = $1', [songName]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error fetching data');
    }
});

//get song length
app.get('/api/length', async (req, res) => {
    const songName = req.query.name;
    try {
        const result = await client.query('SELECT length FROM songs WHERE name = $1', [songName]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error fetching data');
    }
});

//get song features
app.get('/api/features', async (req, res) => {
    const songName = req.query.name;
    try {
        const result = await client.query('SELECT features FROM songs WHERE name = $1', [songName]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error fetching data');
    }
});