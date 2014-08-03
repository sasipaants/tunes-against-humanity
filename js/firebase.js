var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
//Firebase Game Ref
var gamesRef = new Firebase(FIREBASE_URL + '/games');
var songsRef = new Firebase(FIREBASE_URL + '/songs').limit(10);
var playersRef = new Firebase(FIREBASE_URL + '/users');

function initDesktop(callback) {
  var game = {
    prompts: [
      {
        id: "1",
        text: "What song does Paul Graham sing in the shower?"
      }
    ],
    numberOfPlayers: 4,
    answersCount: 0,
    players: [
      //maybe hard code players here
    ]
  };

  gamesRef.push(game, function(errorObject) {
    if (errorObject) {
      callback(errorObject.code);
    }
    else {
      var currentGameRef = new Firebase(FIREBASE_URL + '/games').limit(1);
      currentGameRef.on('value', function(snapshot) {
        callback(null, snapshot.val());
      }, function(errorObject) {
        callback(errorObject.code);
      });
    }
  });
}

function initMobile(callback) {

}

//Get Random 10 songs 
function getSongs(callback) {
  songsRef.on('value', function (snapshot) {
    var songsArray = [];
    _.each(snapshot.val(), function(song) {
      songsArray.push(song);
    });
    callback(null, songsArray);
  }, function (errorObject) {
    callback(errorObject.code);
  });
}

//Get List of Players
function getPlayers(callback) {
  playersRef.on('value', function(snapshot) {
    callback(null, snapshot.val());
  }, function(errorObject) {
    callback(errorObject.code);
  });
}

//Submit Answer for Prompt (add choice to game)
/*
function submitSong(userId, song, artist, callback) {
  var data = {
    song_title: song,
    song_artist: artist
  };
  var playerRef = new Firebase(FIREBASE_URL + '/game/userId');
  playerRef.push(data, function(error) {
    callback(error);
  }
}
*/


//Get correct answer for prompt

//Get game over -  is number of answers == number of players

//list of users with scores, prompt and answer