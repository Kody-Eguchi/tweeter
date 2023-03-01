/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const createTweetElement = function(data) {
    const {name, avatars, handle} = data.user;
    const {text} = data.content;
    const {created_at} = data;
    const days = timeago.format(created_at); 

    return `
      <article>
        <header>
          <div class="profile-info">
            <img src="${avatars}" alt="">
            <p>${name}</p>
          </div>
          <p>${handle}</p>
        </header>
        <div class="tweet-content">
          ${escape(text)}
        </div>
        <footer>
          <p>${days}</p>
          <div class="icon-container">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
  `};

  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      const $element = createTweetElement(tweet);
      $('#tweets-container').prepend($element);
    }
  }

  //Form Submit Handler
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();


    $('#char-limit-alert').slideUp();
    $('#empty-input-alert').slideUp();

    if ($('#tweet-text').val().length < 1) {
      //used setTimeout for smooth transtion from other error message
      setTimeout(() => {
        $('#empty-input-alert').slideDown()
      }, 500)
      ;
      return;
    }

    if ($('#tweet-text').val().length > 140) {
      //used setTimeout for smooth transtion from other error message
      setTimeout(() => {
        $('#char-limit-alert').slideDown();
      }, 500)
      return;
    }

    const serialized = $(this).serialize();
    
    $.ajax({
      type: "POST",
      url: `/tweets`,
      data: serialized,
    }).then(loadtweets());

  });

  const loadtweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then((tweetJson) => {
      renderTweets(tweetJson);
    });
    
  };

  loadtweets();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $('#char-limit-alert').hide();
  $('#empty-input-alert').hide();

});