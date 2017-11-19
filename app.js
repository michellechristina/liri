// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var twitterPackage = require('twitter');
var spotifyPackage = require('node-spotify-api');
var key = require("./keys.js");
var fs = require("fs");

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
// console.log("value: " +value);

// .join("+")


// The switch-case statement directs which function gets run.
switch (action) {
    case "movie-this":
        movie(value);
        break;

    case "my-tweets":
        tweet();
        break;

    case "do-what-it-says":
        command();
        break;

    case "spotify-this-song":
        getSong(value);
        break;
}

//////////////////////////////

function command() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }


        var dataArr = data.split(",");

        var action = dataArr[0];
        var value = dataArr[1];

        // console.log("action " + dataArr[0]);
        // console.log("value " + dataArr[1]);

        if (action === "spotify-this-song") {
            getSong(value);
            console.log("loading song...")
        } else if (action === "movie-this") {
            movie(value);
        } else if (action === "my-tweets") {
            tweet()
        }

    });

}

//////////////////////////////

function movie(value) {
    if (!value) {
        value = 'Mr Nobody';
    }
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

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

    });
}

//////////////////////////////

function tweet() {
    twitter.get('statuses/user_timeline', "MichelleCB111", function (error, tweets, response) {
        console.log("--------------------------------------");
        if (!error) {
            tweets.forEach(element => {
                console.log("Tweet: " + element.text + " | Created on: " + element.created_at);
            });
            console.log("--------------------------------------");
        } else {
            console.log("oops, not working");
        }

    });
}

//////////////////////////////

function getSong(value) {
    if (!value) {
        value = 'the sign ace of base';
    }

    spotify
        .search({
            type: 'track',
            query: value,
            limit: 1
        })
        .then(function (response) {

            var songDetails = response.tracks.items[0];
            // console.log(songDetails);
            console.log("--------------------------------------");
            console.log("Song Name: " + songDetails.name);
            console.log("Artist: " + songDetails.artists[0].name);
            console.log("Album: " + songDetails.album.name);
            console.log("Preview: " + songDetails.preview_url);
            console.log("--------------------------------------");

        })
        .catch(function (err) {
            console.log(err);
        });
}