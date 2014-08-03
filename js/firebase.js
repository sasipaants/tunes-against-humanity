var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
//Firebase Game Ref
var gamesRef = new Firebase(FIREBASE_URL + '/games');
var songsRef = new Firebase(FIREBASE_URL + '/songs').limit(10);

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
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var playersRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/players");
    playersRef.on('value', function(snapshot) {
      var playersArray = [];
      _.each(_.map(snapshot.val(), function(value, key) {
        value["userId"] = key;
        return value;
      }), function(player) {
        playersArray.push(player);
        // callback(null, playersArray);
      });
      callback(null, playersArray);
    });
  });
}

//Submit Answer for Prompt (add choice to game)

function submitSong(userId, song, artist, callback) {
  var data = {
    song: song,
    artist: artist
  };

  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var questionsRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerChoices");
    questionsRef.child(userId).set(data, function(error) {
      callback(error, data);
    });
  }); 
}

function submitVote(userId, votedUserId, votedUserImage, votedUserName, callback) {
  var votedUser = {
      "image": votedUserImage,
      "name": votedUserName,
      "id": votedUserId
  };
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var answersRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerAnswers");
    answersRef.child(userId).set(votedUser, function(error) {
      callback(error, votedUser);
    });
  }); 
}

function markSongToPlay(callback) {

}

//which song to play
function getSongToPlay(callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var choicesRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerChoices");
    choicesRef.once('value', function(snapshot2) {
      var song = _.sample(_.map(snapshot2.val(), function(value, key) {
        value["userId"] = key;
        return value;
      }));
      snapshot.child("questions/question1/correctAnswer").set(song.userId);
      callback(null, song);
    });
  }); 
}

/*
submitSong("12345", "Purple Rain", "Prince", function(error) {
  getSongToPlay(function(error, game) {
    console.log(game);
  });
});
*/

//who picked the song, who was right, and who was wrong
function getFinalState(callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    console.log(snapshot.val());
    callback(null, game);
  });
}

/*
getFinalState(function(error, game) {
  console.log(game);
});
*/

//Get your answer for final page on mobile
function  getMyAnswer(twitterId, callback) {
    var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
    var root = new Firebase(FIREBASE_URL);
    var currentGameRef = root.child("games").limit(1);
    currentGameRef.once('child_added', function(snapshot) {
      console.log("Getting answer for game " + (snapshot.name()) + " for user " + twitterId);
      var choicesRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerAnswers/" + twitterId);
        choicesRef.once('value', function(snapshot) {
        console.log(snapshot.val());
        callback(null, snapshot.val());
      });
    });
}

function startGuessing() {
    console.log("Start guessing...");
    var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
    var root = new Firebase(FIREBASE_URL);
    var currentGameRef = root.child("games").limit(1);
    var num_song_choices = 0;
    var MAX_PLAYERS = 4;
    currentGameRef.once('child_added', function(snapshot) {
      var playersRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/players");

      // var playerChoicesRef = newGame.child('questions').child('playerChoices');
      playersRef.on('child_added', function (snapshot) {
          console.log("player count: " + JSON.stringify(snapshot.val()));
          console.log("num song choices: " + num_song_choices);
          user = snapshot.val();
          num_song_choices++;
          if (num_song_choices == MAX_PLAYERS) {
              $('#btn-play').attr("disabled", false);
          } else {
              $('#btn-play').attr("disabled", true);
          }
      });
  });
}

//Get correct answer for prompt on desktop


//Get game over -  is number of answers == number of players

//list of users with scores, prompt and answer