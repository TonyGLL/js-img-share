/* ====================*/
/*  MODULES REQUIREDS  */
/* ====================*/
const moment = require('moment');

/* ====================*/
/*   FILES REQUIREDS   */
/* ====================*/
const helpers = {};

helpers.timeago = timestamp => {

    return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;