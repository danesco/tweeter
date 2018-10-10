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

});


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
