/* ====================*/
/*  MODULES REQUIREDS  */
/* ====================*/
const path = require('path');
const expHBS = require('express-handlebars');
const Handelbars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

/* ====================*/
/*   FILES REQUIREDS   */
/* ====================*/
const routes = require('../routes/routes-index');

module.exports = app => {

    /* ====================*/
    /*      SETTINGS       */
    /* ====================*/
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', expHBS({

        defaultLayout: 'main',
        handlebars: allowInsecurePrototypeAccess(Handelbars),
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    /* ====================*/
    /*     MIDDLEWARES     */
    /* ====================*/
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    /* ====================*/
    /*        ROUTES       */
    /* ====================*/
    routes(app);

    /* ====================*/
    /*     STATIC FILES     */
    /* ====================*/
    app.use('/public', express.static(path.join(__dirname, '../public')));

    /* ====================*/
    /*    ERRORHANDLERS    */
    /* ====================*/
    if('development ' === app.get('env')) {

        app.use(errorHandler);
    };

    return app;
}