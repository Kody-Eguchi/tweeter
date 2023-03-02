$(document).ready(function() {

  
  $('#tweet-text').on('input', function() {
    let charCount = $('#tweet-text').val().length;
    let counter = 140 - charCount;
    if (counter < 0) {
      $('#counter').css('color',"red");
    }
    $('#counter').html(counter);

  });

  $('#scrollUp-wrapper').hide();

  $('#scrollUp-wrapper').on('click', () => {
    $('#toggle-form').show();
    $('.new-tweet').slideDown();
    $('#scrollUp-wrapper').hide();
  })

  $(window).scroll( () => {
    if(($('#main-header').position().top - $(window).scrollTop()) === 0) {
      $('#toggle-form').fadeIn(1000);
      $('#scrollUp-wrapper').fadeOut(1000);
    } else {
      $('#toggle-form').fadeOut(1000);
      $('#scrollUp-wrapper').fadeIn(1000);
    }
    
  });
  
});