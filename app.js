// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var twitterPackage = require('twitter');
var spotifyPackage = require('node-spotify-api');
var key = require("./keys.js");

//console.log("keys " +twitterInfo.consumer_key);
// console.log("twitter key ");
// console.log(JSON.stringify(twitterKey));

// make a new twitter object with our keys
var twitter = new twitterPackage(key.twitterKeys);

// make a new spotify object with our keys
var spotify = new spotifyPackage(key.spotKey);

var action = process.argv[2];
// var value = process.argv[3];
var value = process.argv.slice(3).join(" ");
console.log("value: " +value);

// .join("+")


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
    song();
    break;
}

function movie() {

    // Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
    
        // console.log(body);
        // console.log(JSON.parse(body, null, '  '));
        console.log("--------------------------------------");
        console.log("Movie: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        // console.log("Tomato Rating: " + JSON.parse(body).tomatoMeter);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("--------------------------------------");
      }

      else {

        //   var value = "Mr Nobody"
        //   movie();
        // //   console.log("things happen");

        
      }
    });
    }




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

function song() {
    // console.log("inside spotify function");
    spotify
    .search({ type: 'track', query: value, limit: 1 })
    .then(function(response) {
        // console.log(JSON.stringify(response, null, '  '));
        // console.log(JSON.stringify(response.tracks[].artists[].items[].name));
        // console.log(JSON.stringify(response.models.tracks[].artists.items.name));
      
        var songDetails = response.tracks.items[0];
        // console.log(songInfo);
        console.log("--------------------------------------");
        console.log("Song Name: " +songDetails.name);
        console.log("Artist: " +songDetails.artists[0].name);
        console.log("Album: " +songDetails.album.name);
        console.log("Preview: " +songDetails.preview_url);
        console.log("--------------------------------------");

    //   console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
    
}