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
      _.each(snapshot.val(), function(player) {
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

function submitVote(userId, votedUserId, callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var answersRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerAnswers");
    answersRef.child(userId).set(votedUserId, function(error) {
      callback(error, votedUserId);
    });
  }); 
}

//which song to play
function getSongToPlay(callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var choicesRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerChoices");
    choicesRef.once('value', function(snapshot) {
      var song = _.sample(_.map(snapshot.val(), function(value, key) {
        value["userId"] = key;
        return value;
      }));
      callback(null, song);
    });
  }); 
}


//who picked the song, who was right, and who was wrong
function getFinalState(callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    console.log(snapshot.val());
    var game = currentGameRef.child("/games").child(snapshot.name());
    callback(null, game);
  });
}

/*
getFinalState(function(error, game) {
  console.log(game);
});
*/
//Get correct answer for prompt

//Get game over -  is number of answers == number of players

//list of users with scores, prompt and answer