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
	var listDiv = $("<li class='list-music-item' onclick='selectSongAPI(\"hi\")'>hi</li>");
	listMusic.append(listDiv);
}

function getPlayersAPI() {
	getPlayers(getPlayersCallback);
}

function getPlayersCallback(error, data) {
	console.log("Players Error: " + JSON.stringify(error));
	console.log("Players Response: " + JSON.stringify(data));	
}

function selectSongAPI(song) {
	// call selectSong(title, artist, twitterId);
	$.mobile.changePage( '#waiting', { transition: 'slide'} );

}

function selectSong(title, artist, twitterId) {

}

function saveUser(twitter) {

}