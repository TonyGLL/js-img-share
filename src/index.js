// Modules Requireds
const express = require('express');

// Files Requireds
const config = require('./server/config');

// Database
require('./database');

// Inicializations
const app = config(express());

// Server Init
app.listen(app.get('port'), () => {

    console.log('Server on port:', app.get('port'));
});