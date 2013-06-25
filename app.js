
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
    , store = require('./routes/game');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('title', '4pic1word');
app.set('view engine', 'ejs');
app.set('view engine', 'html');

app.engine('.html', require('ejs').__express);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('try-to-forget'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/load', store.load_level);
app.get('/start', store.start);
app.get('/img/:level/:num', store.image);

app.get('/check', store.checkAnswer);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Game server started on port ' + app.get('port'));
});
