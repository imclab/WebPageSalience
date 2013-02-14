;(function() {'use strict';

  $(document).ready(function() {
    $('#salience-go').click(function() {
      var targetURL = $('#target-url').val();
      $.ajax({
        url: '/salience'
      , data: {targetURL: targetURL}
      })
      .success(function(imageData) {
        $('#salience-map').attr('src', 'data:image/png;base64,' + imageData);
      })
    });
  });
})();
