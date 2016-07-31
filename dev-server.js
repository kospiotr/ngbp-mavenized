var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// ROUTES
// ==============================================

var baseServeDir = __dirname + '/bin';

if (process.argv.indexOf('--src-build') > -1) {
    baseServeDir = __dirname + '/build';
}

console.log('Serving from "' + baseServeDir + '" directory');
app.use("/", express.static(baseServeDir));

// START THE SERVER
// ==============================================
app.listen(port);
console.log('App started on port ' + port);
