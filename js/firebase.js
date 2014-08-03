var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
//Firebase Game Ref
var gamesRef = new Firebase(FIREBASE_URL + '/games');
var songsRef = new Firebase(FIREBASE_URL + '/songs');

//Get Random 10 songs 
function getSongs(callback) {
  songsRef.on('value', function (snapshot) {
    var songsArray = [];
    _.each(snapshot.val(), function(song) {
      songsArray.push(song);
    });
    callback(null, _.sample(songsArray, 10));
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

//should return if vote was correct, try to add correct || incorrect to players
function submitVote(userId, votedUserId, votedUserImage, votedUserName, callback) {
  var votedUser = {
      "image": votedUserImage,
      "name": votedUserName,
      "id": votedUserId,
      "correct": false
  };
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var questionRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1");
    questionRef.once('value', function(question) {
      if (question.val().correctAnswer.userId == votedUserId) {
        votedUser.correct = true;
      }
      var answerRef = questionRef.child("playerAnswers");
      answerRef.child(userId).set(votedUser, function(error) {
        callback(error, votedUser);
      });
    });
  }); 
}
/*
submitVote("12323224", "12345", "http://", "blah blah", function(error, vote) {
  console.log(vote);
});
*/

//Mark a song by the userId
function markSongToPlay(callback) {
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
       var currentGame =  new Firebase(FIREBASE_URL + "games/" + snapshot.name());
      currentGame.child("questions/question1/correctAnswer").set(song);
      callback(null, song);
    });
  }); 
}

//which song to play
function getSongToPlay(callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var answerRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/correctAnswer");
    answerRef.once('value', function(snapshot) {
      callback(null,snapshot.val());
    });
  }); 
}

/*
submitSong("12345", "Prince", "Raspberry Beret", function(error) {
  markSongToPlay(function(error, song) {
    getSongToPlay(function (error, song) {
      console.log(song);
    });
  });
});
*/  

/*
who picked the song, who was right, and who was wrong
{
  correct: 
    [{userId: '1234', name: 'Bilbo Baggins', image: 'http://'}],
  wrong: 
    [{userId: '1235', name: 'Gollum', image: 'http://'}],
  owner:
    {userId: '1236', name: 'Sauron', image: 'http://'}
}
*/
function getFinalState(callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var playersRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerAnswers");
    playersRef.on('value', function(snapshot) {
      var playersArray = [];
      _.each(_.map(snapshot.val(), function(value, key) {
        value["userId"] = key;
        return value;
      }), function(player) {
        playersArray.push(player);
      });
      callback(null, playersArray);
    });
  });
}


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
    var MAX_PLAYERS = 2;
    currentGameRef.once('child_added', function(snapshot) {
      var playersRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/players");

      // var playerChoicesRef = newGame.child('questions').child('playerChoices');
      playersRef.on('child_added', function (snapshot) {
          console.log("player count: " + JSON.stringify(snapshot.val()));
          console.log("num song choices: " + num_song_choices);
          user = snapshot.val();
          num_song_choices++;
          if (num_song_choices == MAX_PLAYERS) {
              // $('#btn-play').attr("disabled", false);
              getPlayersAPI();
          } else {
              // $('#btn-play').attr("disabled", true);
          }
      });
  });
}

function waitForNextRound() {
    console.log("Waiting for next round...");
    var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
    var root = new Firebase(FIREBASE_URL);
    var currentGameRef = root.child("games");
    currentGameRef.once('child_added', function(snapshot) {
        console.log("Next round starting.");
        window.location = 'index.html';
    });
}

//Get correct answer for prompt on desktop


//Get game over -  is number of answers == number of players

//list of users with scores, prompt and answer