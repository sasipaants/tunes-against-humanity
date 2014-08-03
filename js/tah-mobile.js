$( document ).ready(function() {
	getSongsAPI();
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
		var titleDiv = $("<div class='song-title' onclick='selectSongAPI(\"hi\")'>"+ data[i].title+"</div>");
		var artistDiv = $("<div class='song-artist'>"+data[i].artist+"</div>");
		var btnDiv = $("<div class='controls btn-plays'></div>");
		var playDiv = $("<a href='#' class='ui-btn ui-btn-inline' onclick=''>&#9654;</a>");
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
	//console.log("Players Response: " + JSON.stringify(data));	
}

function selectSongAPI(song) {
	// call selectSong(title, artist, twitterId);
	$.mobile.changePage( '#waiting', { transition: 'slide'} );

}

function selectSong(title, artist, twitterId) {

}

function saveUser(twitter) {

}