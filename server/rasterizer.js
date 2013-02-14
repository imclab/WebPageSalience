var webshot = require('webshot');

module.exports = function(pageURL, cb) { 
  webshot(pageURL, function(err, renderStream) {
    if (err) return cb(err);

    var imageData = '';

    renderStream.on('data', function(data) {
      imageData += data.toString('base64');
    });

    renderStream.on('end', function() { 
      cb(null, imageData);
    });
  });
};
