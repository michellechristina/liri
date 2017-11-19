// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var twitterPackage = require('twitter');
var spotify = require('node-spotify-api');
var twitterInfo = require("./keys.js");

//console.log("keys " +twitterInfo.consumer_key);
// console.log("twitter key ");
// console.log(JSON.stringify(twitterKey));

// make a new twitter object with our keys
var twitter = new twitterPackage(twitterInfo);

var action = process.argv[2];
// var value = process.argv[3];


// The switch-case statement directs which function gets run.
switch (action) {
  case "movie-this":
    movie();
    break;

  case "my-tweets":
    tweet();
    break;

  case "do-what-it-says":
    command();
    break;

  case "spotify-this-song":
    spotify();
    break;
}

function movie() {
    }


/// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html

function tweet() {
    twitter.get('statuses/user_timeline', "MichelleCB111", function(error, tweets, response) {
      if (!error) {
        tweets.forEach(element => {
            console.log("Tweet: " +element.text+ " | Created on: " + element.created_at);
        });
       
      }
      else {
          console.log("oops, not working");
      }

    });
}

function command() {
    
}

function spotify() {
    
}





// // Then run a request to the OMDB API with the movie specified
// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });


