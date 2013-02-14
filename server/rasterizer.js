var webshot = require('webshot');

module.exports = function(pageURL, cb) { 
  webshot(pageURL, function(err, renderStream) {
    if (err) return cb(err);

    renderStream.on('data', function(data) {
      console.log(typeof data, data);
    });
  });
};
