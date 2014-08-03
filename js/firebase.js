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
      callback(error, questionsRef);
    });
  }); 
}

submitSong("12345", "Music for breaking up with your cofounder", "Purple Rain", function(error, questions) {
  console.log(error);
  console.log(questions);
});

function submitVote(userId, votedUserId, callback) {
  
  var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
  var root = new Firebase(FIREBASE_URL);
  var currentGameRef = root.child("games").limit(1);
  currentGameRef.once('child_added', function(snapshot) {
    var answersRef = new Firebase(FIREBASE_URL + "games/" + snapshot.name() + "/questions/question1/playerAnswers");
    answersRef.child(userId).set(votedUserId, function(error) {
      callback(error, answersRef);
    });
  }); 
}

submitVote("12345", "999999", function(error, answers) {
  console.log(error);
});

//Get correct answer for prompt

//Get game over -  is number of answers == number of players

//list of users with scores, prompt and answer