/*
 * app.js
 *
 * Entry point for the application's execution. 
 */

var flatiron = require('flatiron')
  , app = flatiron.app
  , ecstatic = require('ecstatic')
  , cv = require('opencv');

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
  var self = this;
  var targetURL = this.req.query.targetURL;

  rasterizer(targetURL, function(err, bufferStream) {
    if (err) return self.res.end();
   
    var imageStream = new cv.ImageStream();

    imageStream.on('load', function(screenMat) {
      console.log(screenMat.get(0,0));
      screenMat.convertGrayscale();
      self.res.writeHead(200, {'Content-Type': 'text/plain'});
      self.res.end(screenMat.toBuffer().toString('base64'));
    });

    bufferStream.pipe(imageStream);
  });
});

app.start(port);
console.log('Listening on port', port);
