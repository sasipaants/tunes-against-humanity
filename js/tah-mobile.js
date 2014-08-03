$( document ).ready(function() {
	// getSongsAPI();
	getPlayersAPI();

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
		listDiv.append(titleDiv).append(artistDiv).append(btnDiv);
		listMusic.append(listDiv);


	}
	
// <li class="list-music-item">
// 	<div class="song-title"> Turn Down For What</div>
// 	​<div class="song-artist">Lil Jon</div>
// 	<div class="controls btn-plays">
// 		<a href="#" onclick="Bop.playSong('Lil Jon', 'Turn Down For What');" class="ui-btn ui-btn-inline">&#9654;</a>
// 		<a href="#" onclick="Bop.pause();" class="ui-btn ui-btn-inline">&#8214;</a>
// 	</div>
// </li>
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
		var cardDiv = $("<div class='card card-option card-option-vote' onclick='voteOnUserAPI(loggedInUser.id,\""+data[].id+"\")'>"+data[loggedInUser.uid].displayName+"</div>");
		var imgDiv = $("<img src='"+data[loggedInUser.uid].image+"' class='user-thumbnail'/>");
		var nameDiv = $("<div class='user-name'>"+data[loggedInUser.uid].displayName+"</div>");
		cardDiv.append(imgDiv).append(nameDiv);
		listMusic.append(cardDiv);
	}



// <div class="card card-option card-option-vote">
// 	<img src="image/user.jpg" class="user-thumbnail">
// 	<div class="user-name">Sasi</div>
// </div>
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
function voteOnUserAPI(twitterId, votedUserId) {
	submitVote(twitterId, votedUserId, voteOnUserCallback);
}

function voteOnUserCallback(error, data) {
	console.log("Vote Error: " + JSON.stringify(error));
	console.log("Vote Response: " + JSON.stringify(data));	
	$.mobile.changePage( '#answer', { transition: 'slide'} );
}

function saveUser(twitter) {

}