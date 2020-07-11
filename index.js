// Get models
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path'); // Ordena las rutas sin importar el sistema operativo.
const mongoose = require('mongoose');

// Connecting to database.
mongoose.connect('mongodb://localhost/crud-mongodb')
    .then(db => console.log("Database connecting"))
    .catch(err => console.log(err));

// Importing Routes
const indexRoutes = require('./src/routes/index');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', indexRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});