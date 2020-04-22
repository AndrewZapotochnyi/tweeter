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

  


  $("#submit-form").submit(function(event){
    event.preventDefault();

    let tweetForm = $("#submit-form").serialize();
    
    console.log(tweetForm);

    $.ajax({
      url: `/tweets`,
      type: "POST",
      dataType: "text",
      data: tweetForm
    })
    .then((response) => {
      console.log("ajax done");
    });

    
  });
  


  let loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (response) {
      renderTweets(response);
    });
  };

  loadTweets();


});








