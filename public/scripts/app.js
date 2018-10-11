/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
 function createTweetElement(tweet) {
  const name = tweet.user.name;
  const avatar =  tweet.user.avatars.small;
  const handle = tweet.user.handle;
  const tweetText = tweet.content.text;
  const timeStamp = tweet.created_at;

  const article = $('<article>').addClass('tweet');
  // //for the header
  const container = $("<header>");
  const image = $(`<img src ='${avatar}'>`);
  const h1 = $('<h1>').text(name);
  const h3 = $('<h3>').text(handle);

 let finalHead = container.append(image).append(h1).append(h3);

  // //for div
  const division = $('<div>').text(tweetText);

  // //for footer
  const footer = $('<footer>');
  const section = $('<section>').text(timeStamp);

  let finalFoot = footer.append(section).addClass('time');


  return article.append(finalHead).append(division).append(finalFoot); //append and return everything


 }

 function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(let i = 0; i < tweets.length; i ++){
      $('#tweets-container').prepend(createTweetElement(tweets[i]));
    }
}

// renderTweets(data);


$("#new-tweet").on('submit', (event) => {
  event.preventDefault();

  let data = ($(event.target).serialize()); //taking data from the input field and turning it into a query string

  let inputText = $(event.target).children('textarea').val();

  if (inputText === '') {
    alert("Please enter something");
  } else if (inputText.length > 140) {
    alert("Too many characters")
  } else {

    $.ajax('/tweets', {method: 'POST', data: data}).then(() => {
      loadTweets();
    });
  }
});

function loadTweets(){
  $.ajax('/tweets', {method: 'GET'})
  .then(function(tweet){
    $('#tweets-container').empty();
    renderTweets(tweet);
  });
}

loadTweets();

$('.compose').on("click", (event) => {
  $('.new-tweet').slideToggle('slow');
  $('textarea').focus();
})

});

