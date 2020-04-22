/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---



  const createTweetElement = function(tweetObject) {
    let name = tweetObject.user.name;
    let avatar = tweetObject.user.avatars;
    let handle = tweetObject.user.handle;
    let tweetPost = tweetObject.content.text;
    let date = tweetObject.created_at;
    var s = new Date(date).toLocaleDateString("en-US")
    
    
    const $tweet = $(`<article class="tweet-article"> 
    <header class="tweet-header">
      <img src="${avatar}">
      <p class="user-name">${name}</p>
      <p class="user-handle">${handle}</p>
    </header>
      <p class="tweet-post">${tweetPost}</p>
    <footer>
      <p>${s}</p>
      <span><img src="images/flag.png"><img src="images/repost.png"><img src="images/like.png"></span>
    </footer>
    </article>`);
    
    return $tweet; 
  }

  const renderTweets = function(tweetArray) {
    for (let tweet of tweetArray) {
      let newPost = createTweetElement(tweet);
      $('#tweets-container').append(newPost);
    }
  }

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  let tweetArray = [tweetData, tweetData, tweetData];
  //console.log();

  renderTweets(tweetArray);

  // const $tweet = createTweetElement(tweetData);
  

  // Test / driver code (temporary)
   // to see what it looks like
  //$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



});





