$( document ).ready(function() {
	getSongsAPI();
});
function getSongsAPI() {
	getSongs(getSongsCallback);
}

function getSongsCallback(error, data) {
	console.log("Songs Error: " + JSON.stringify(error));
	console.log("Songs Response: " + JSON.stringify(data));
	var listMusic = $('#list-music');
	var listDiv = $("<li class='list-music-item'>hi</li>");
	listMusic.append(listDiv);
}