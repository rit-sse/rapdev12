/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , sim = require('./sim')
  , world = require('./world/world')
  , comm = require('./comm')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , uploads = require('./routes/file_upload')
  , fs = require('fs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir: './tmp'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/file_upload', uploads.index);
app.post('/file_upload', uploads.post);

var server = http.createServer(app)
var arguments = process.argv.splice(2);

var creature_file = null
if(arguments.size != 0){
  creature_file = path.join(__dirname, arguments[0]);
  if(!fs.existsSync(creature_file)){
    throw {
      name : "File Error",
      message : "File provided does not exist"
    }
  }
}

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

sim = require('./sim')
// Set up comm module and socket.io
var io = require('socket.io').listen(server);
sim.use_comm(comm);
world.use_comm(comm);
sim.startSim(creature_file);
comm.start(io, sim);
