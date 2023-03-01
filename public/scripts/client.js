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
        <p>${days}days ago</p>
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
    console.log(tweet);
    const element = createTweetElement(tweet);
    $('#tweets-container').append(element);
  }
}

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }




const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1677506948784
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1677593348784
  }
];

// const $tweet = createTweetElement(tweetData);

// console.log($tweet);
// $('#tweets-container').append($tweet);

renderTweets(tweetData);

});