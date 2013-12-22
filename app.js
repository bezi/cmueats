
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var mongo = require('mongodb')
var monk = require('monk')
var db = monk('localhost:27017/cmueats')

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}


// routes
app.get('/', require('./routes/schedule')(db));
app.get('/home', require('./routes/schedule')(db));
app.get('/contact', require('./routes/infoPages').contact);
app.get('/about', require('./routes/infoPages').about);
app.get('/what', require('./routes/infoPages').what);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
