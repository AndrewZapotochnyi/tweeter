/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---

  // 
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
      $('#tweets-container').prepend(newPost);
    }
  }

  
  let loadTweets = function(latestTweet = false) {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (response) {
      if (latestTweet === false) {
        renderTweets(response);
      } else if (latestTweet === true) {
        var last_item = null;
        for(key in response) {
          last_item = key;
        }
        renderTweets([response[key]]);
      }
    });
  };
  loadTweets();
  

  $("#submit-form").submit(function(event){
    event.preventDefault();

    let input = $("#tweet-text").val();

    if (input === null || input === "") {
      alert("Type something");
      return false;
    }

    if (input.length > 140) {
      alert("Tweet is too long");
      return false;
    }
    
    let tweetForm = $("#submit-form").serialize();

    $.ajax({
      url: `/tweets`,
      type: "POST",
      dataType: "text",
      data: tweetForm
    })
    .then((response) => {
      loadTweets(true);
      $('#tweet-text').val('').change();

    });

    
  });

});








