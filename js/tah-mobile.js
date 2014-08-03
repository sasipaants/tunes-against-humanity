$( document ).ready(function() {
	// getSongsAPI();
	// getPlayersAPI();



});
function getSongsAPI() {
	getSongs(getSongsCallback);
}

function getSongsCallback(error, data) {
	console.log("Songs Error: " + JSON.stringify(error));
	console.log("Songs Response: " + JSON.stringify(data));
	var listMusic = $('#list-music');

	for ( var i = 0; i < data.length; i++ ) {
		var listDiv = $("<li class='list-music-item'></li>");
		var titleDiv = $("<div class='song-title' onclick='selectSongAPI(\""+ data[i].title+"\",\""+ data[i].artist+"\", loggedInUser.id)'>"+ data[i].title+"</div>");
		var artistDiv = $("<div class='song-artist'>"+data[i].artist+"</div>");
		var btnDiv = $("<div class='controls btn-plays'></div>");
		var playDiv = $("<a href='#' class='ui-btn ui-btn-inline' onclick='Bop.playSong(\""+data[i].artist+"\",\""+data[i].title+"\")'>&#9654;</a>");
		var pauseDiv = $("<a href='#' class='ui-btn ui-btn-inline' onclick='Bop.pause();'>&#8214;</a>");

		btnDiv.append(playDiv).append(pauseDiv);
		listDiv.append(titleDiv).append(artistDiv);
		listMusic.append(listDiv);


	}
	$.mobile.changePage("#prompt");
}

function getPlayersAPI() {
	getPlayers(getPlayersCallback);
}

function getPlayersCallback(error, data) {
	console.log("Players Error: " + JSON.stringify(error));
	console.log("Players Response: " + JSON.stringify(data));	

	var listMusic = $('#list-player');

	for ( var i = 0; i < data.length; i++ ) {
		console.log("Getting data " + i );
		var cardDiv = $("<div class='card card-option card-option-vote' onclick='voteOnUserAPI(\""+loggedInUser.id+"\",\""+data[i].id+"\",\""+data[i].image+"\",\""+data[i].name+"\")'></div>");
		var imgDiv = $("<img src='"+data[i].image.replace("_normal", "")+"' class='user-thumbnail'/>");
		var nameDiv = $("<div class='user-name'>"+data[i].name.split(' ')[0]+"</div>");
		cardDiv.append(imgDiv).append(nameDiv);
		listMusic.append(cardDiv);
	}

	$.mobile.changePage( '#guess', { transition: 'slide'} );
}


function selectSongAPI(title, artist, twitterId) {
	submitSong(twitterId, title, artist, selectSongCallback);

}

function selectSongCallback(error, data) {
	console.log("Select Song Error: " + JSON.stringify(error));
	console.log("Select Song Response: " + JSON.stringify(data));
	$.mobile.changePage( '#waiting', { transition: 'slide'} );
}

//User votes on which other user picked that song
function voteOnUserAPI(twitterId, votedUserId, votedUserImage, votedUserName) {
	submitVote(twitterId, votedUserId, votedUserImage, votedUserName, voteOnUserCallback);
	
}

function voteOnUserCallback(error, data) {
	console.log("Vote Error: " + JSON.stringify(error));
	console.log("Vote Response: " + JSON.stringify(data));
	console.log("Result is " +JSON.stringify(data));
	var answerDiv = $('#result');
	var resultHTML;
	if (data.correct) {
		resultHTML = $('<div class="correct">Correct!</div>');
	} else {
		resultHTML = $('<div class="correct">Wrong!</div>');
	}

	resultHTML.append('<div class="myanswer">Your answer was...</div>');

	var cardDiv = $('<div class="card card-answer" id="answer-content"></div>');
	var imgDiv =  $("<img src='"+ data.image.replace("_normal", "") +"' class='user-thumbnail'/>");
	var nameDiv = $("<div class='user-name'>"+ data.name.split(' ')[0] +"</div>");
	cardDiv.append(imgDiv).append(nameDiv);
	resultHTML.append(cardDiv);
	answerDiv.append(resultHTML);
	getMyAnswerAPI(loggedInUser.id);
}

function getMyAnswerAPI(twitterId) {
	getMyAnswer(twitterId, getMyAnswerCallback);
}

function getMyAnswerCallback(error, data) {
	console.log("My Answer Error: " + JSON.stringify(error));
	console.log("My Answer Response: " + JSON.stringify(data));	


	
	$.mobile.changePage( '#answer', { transition: 'slide'} );

	// var answerDiv = $("#answer-content");
	// var imgDiv = $("<img src='"+data.image.replace("_normal", "")+"' class='user-thumbnail'>");
	// var nameDiv = $("<div class='user-name'>"+data.name.split(' ')[0]+"</div>");
	// answerDiv.append(imgDiv).append(nameDiv);
	// <img src="image/user.jpg" class="user-thumbnail">
	// <div class="user-name">Sasi</div>
}


function saveUser(twitter) {

}