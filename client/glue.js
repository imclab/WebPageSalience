;(function() {'use strict';

  $(document).ready(function() {
    $('#salience-go').click(function() {
      var targetURL = $('#target-url').val();
      $.ajax({
        url: '/salience'
      , dataType: 'json'
      , data: {targetURL: targetURL}
      })
      .success(function(imageData) {
        console.log(imageData);
      })
    });
  });
})();
