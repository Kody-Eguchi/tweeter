$(document).ready(function() {

  
  $('#tweet-text').on('input', function() {
    let charCount = $('#tweet-text').val().length;
    let counter = 140 - charCount;
    if (counter < 0) {
      $('#counter').css('color',"red");
    }
    $('#counter').html(counter);

  });


  
  
 
});