$(document).ready(function() {
  // --- our code goes here ---

  $('.new-tweet form textarea').on('keyup', function() {
    let currentCount = 140 - this.value.length;

    let counter = $(this).next().next();

    if (currentCount < 0) {
      counter.css("color", "red");
    } else if (currentCount > 0) {
      counter.css("color", "#545149");
    }
    
    $(counter).text(currentCount);
  });

});



