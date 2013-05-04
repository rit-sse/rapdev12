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
  , fs = require('fs')
  , argv = require('optimist').argv
  , optimist = require('optimist');

var setupFile = require('./setup.json');

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
  app.use(express.favicon(__dirname + '/public/assets/images/biogrid.ico'));
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

/* Argument processing */
optimist.usage("Usage: $0 <flags> <filename>")
        .options('c',
          {
            alias: 'count',
            describe: 'The number of creatures of type [filename] to include on the world'
          })
        .options('h',
          {
            alias: 'help',
            describe: 'Returns the ussage message'
          });

if(argv.h || argv.help){
  console.log(optimist.help());
  process.exit(0);
}



console.log();
console.log(setupFile.world);
console.log(setupFile.creatures);



var creature_file = setupFile.creatures;

var world_file = setupFile.world;
var creature_count = setupFile.numOfCreatures;

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

sim = require('./sim')
// Set up comm module and socket.io
var io = require('socket.io').listen(server);
sim.use_comm(comm);
world.use_comm(comm);
sim.startSim(creature_file, creature_count,world_file);
comm.start(io, sim);
