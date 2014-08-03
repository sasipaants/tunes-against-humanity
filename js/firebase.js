var FIREBASE_URL = "https://vivid-fire-183.firebaseio.com/";
//Firebase Game Ref
var gamesRef = new Firebase(FIREBASE_URL + '/games');

var songsRef = new Firebase(FIREBASE_URL + '/songs').limit(10);
var songs = [];

function initGame() {
  var game = {
    prompts: [
      //hard code a prompt here
    ],
    numberOfPlayers: 4,
    answersCount: 0,
    players: [
      //maybe hard code players here
    ]
  };

  gamesRef.push(game);
}

//Get Random 10 songs 
function getSongs(callback) {
  songsRef.on('value', function (snapshot) {
    callback(null, snapshot.val());
  }, function (errorObject) {
    console.log(errorObject.code);
  });
}
getSongs(function(error, songs){
  console.log(songs);
});

//Get List of Players

//Submit Answer for Prompt (add choice to game)

//Get correct answer for prompt

//Get game over -  is number of answers == number of players

//list of users with scores, prompt and answer