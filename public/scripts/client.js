/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // ERROR HANDLING ----------------------------------------

  const createErrorElement = function(errorText) {
    const $error = $(`<div id="error-message">
    <img src="/images/error.png">
    <span>${errorText}</span>
    </div>`);
    return $error;
  };

  const renderError = function(error) {
    let errorPost = createErrorElement(error);
    $(".new-tweet").prepend(errorPost).hide().slideDown();
  }

  // -------------------------------------------------------

  // CREATING A NEW POST WITH JQUERY -----------------------

  const createTweetElement = function(tweetObject) {
    let name = tweetObject.user.name;
    let avatar = tweetObject.user.avatars;
    let handle = tweetObject.user.handle;
    let tweetPost = tweetObject.content.text;
    let date = tweetObject.created_at;
    
    let escapedText = $("<div>").text(tweetPost).html();
    
    
    const $tweet = $(`<article class="tweet-article"> 
    <header class="tweet-header">
      <img src="${avatar}">
      <p class="user-name">${name}</p>
      <p class="user-handle">${handle}</p>
    </header>
      <p class="tweet-post">${escapedText}</p>
    <footer>
      <p>${timeago.format(date)}</p>
      <span><img src="images/flag.png"><img src="images/repost.png"><img src="images/like.png"></span>
    </footer>
    </article>`);
    
    return $tweet; 
  }
  // -------------------------------------------------------
  
  // RENDERING TWEETS FROM JQUERY OBJECT -------------------

  const renderTweets = function(tweetArray) {
    for (let tweet of tweetArray) {
      let newPost = createTweetElement(tweet);
      $('#tweets-container').prepend(newPost);
    }
  }
  // -------------------------------------------------------

  // POSTING TWEETS FROM ARRAY or POSTING NEW TWEET --------

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
  
  // -------------------------------------------------------

  // SUBMITING NEW TWEET ON FORM SUBMISSION EVENT ----------

  $("#submit-form").submit(function(event){
    event.preventDefault();

    let input = $("#tweet-text").val();

    $('#error-message').slideUp("fast", function() {
      $(this).remove();
    });

    if (input === null || input === "") {
      renderError("Type something before posting!");
      return false;
    }

    if (input.length > 140) {
      renderError("The tweet is too long!");
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

    
    $(".counter").val("140");
 
  });

  // -------------------------------------------------------

  // NEW TWEET FORM TOGGLE ON CLICK  -----------------------

  $("#new-post-button").click(function() {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });

  // -------------------------------------------------------
  
});








