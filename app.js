const express = require('express');
const mysql = require('mysql');
const app = express();
//const io = require('socket.io')(http);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qcm-participatif'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        return;
    }
    console.log('Connexion à la base de données réussie !');
});

// Route "/users"
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête : ', err);
            return;
        }
        res.render('users', {users: rows});
    });
});

// Route "/"
app.get('/', (req, res) => {
    // Rendu de la vue "index.ejs"
    res.render('index', {title: 'Hello World'});
});

app.get('/qcm/:id_qcm', (req, res) => {
  const id_qcm = req.params.id_qcm;
  res.send(`Affichage du QCM numéro ${id_qcm}`);
});

// Configuration de EJS comme moteur de template
app.set('view engine', 'ejs');

// Lancement du serveur sur le port 3000
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

//io.on('connection', (socket) => {
//  console.log('a user connected');
//});
