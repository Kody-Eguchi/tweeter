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
    const createdDate = new Date(created_at);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

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
          ${text}
        </div>
        <footer>
          <p>${days} days ago</p>
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
      $('#tweets-container').append($element);
    }
  }

  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    const serialized = $( this ).serialize();

    $.ajax({
      type: "POST",
      url: `/tweets`,
      data: serialized,
    });
  });

  const loadtweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then((tweetJson) => {
      renderTweets(tweetJson);
    });
    
  };

  loadtweets();

});