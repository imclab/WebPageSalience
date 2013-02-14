/*
 * app.js
 *
 * Entry point for the application's execution. 
 */

var flatiron = require('flatiron')
  , app = flatiron.app
  , ecstatic = require('ecstatic');

var rasterizer = require('./server/rasterizer')
  , port = 8888;

app.use(flatiron.plugins.http);
app.http.before.push(ecstatic(__dirname + '/client'));
app.router.configure({ 
  recurse: false
, strict: false
, async: true
});

app.router.get('/salience', function() {
  var targetURL = this.req.query.targetURL;

  rasterizer(targetURL, function(err, imageData) { 
    this.res.writeHead(200, {'Content-Type': 'application/json'});
    this.res.end(JSON.stringify({target: targetURL}));
  });
});

app.start(port);
console.log('Listening on port', port);
