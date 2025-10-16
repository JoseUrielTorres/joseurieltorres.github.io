let playListArray = [jqPlaylist];
let isLoading = false;
let currentTrack = document.createElement("audio");
let trackIndex = 0;
let updateTimer;
let isPlaying = false;
let currentPlaylist =
	playListArray[Math.floor(Math.random() * playListArray.length)];
let playButton = document.getElementById("play-pause");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let currTime = document.getElementById("currTime");
let totalTime = document.getElementById("totalTime");
let albumCover = document.getElementById("album-cover");
let displayPlaylist = document.getElementById("displayPlaylist");
let volumeSlider = document.querySelector(".volume-slider");

let titleTrack = document.getElementById("titleTrack");
let artistName = document.getElementById("artistName");

displayPlaylist.textContent = currentPlaylist[0].list_name;

playButton.addEventListener("click", playpauseTrack);
prevButton.addEventListener("click", () => {
	resetValues();
	setTimeout(prevTrack, 1000);
});
nextButton.addEventListener("click", () => {
	resetValues();
	setTimeout(nextTrack, 1000);
});

function loadTrack(trackIndex, playlist) {
	clearInterval(updateTimer);

	currentTrack.src = playlist[trackIndex].path;
	currentTrack.load();

	titleTrack.textContent = playlist[trackIndex].name;
	artistName.textContent = playlist[trackIndex].artists;
	setAlbumCover(trackIndex, playlist);

	updateTimer = setInterval(seekUpdate, 100);
	isLoading = false;
	currentTrack.addEventListener("ended", nextTrack);
}

function resetValues() {
	isLoading = true;
	currTime.textContent = "...";
	totalTime.textContent = "...";
	titleTrack.textContent = "Loading ...";
	artistName.textContent = "We'll be right back";
	currentTrack.pause();
}

function playpauseTrack() {
	if (!isPlaying) playTrack();
	else pauseTrack();
}

function playTrack() {
	currentTrack.play();
	isPlaying = true;

	playButton.classList.replace("paused", "playing");
}

function pauseTrack() {
	currentTrack.pause();
	isPlaying = false;

	playButton.classList.replace("playing", "paused");
}

function nextTrack() {
	if (trackIndex < currentPlaylist.length - 1) {
		trackIndex += 1;
	} else {
		trackIndex = 0;
	}
	loadTrack(trackIndex, currentPlaylist);
	playTrack();
}

function prevTrack() {
	if (trackIndex > 0) {
		trackIndex -= 1;
	} else {
		trackIndex = currentPlaylist.length - 1;
	}
	loadTrack(trackIndex, currentPlaylist);
	playTrack();
}

function seekUpdate() {
	if (!isNaN(currentTrack.duration)) {
		seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);

		let currentMinutes = Math.floor(currentTrack.currentTime / 60);
		let currentSeconds = Math.floor(
			currentTrack.currentTime - currentMinutes * 60
		);
		let durationMinutes = Math.floor(currentTrack.duration / 60);
		let durationSeconds = Math.floor(
			currentTrack.duration - durationMinutes * 60
		);

		if (currentSeconds < 10) {
			currentSeconds = "0" + currentSeconds;
		}
		if (durationSeconds < 10) {
			durationSeconds = "0" + durationSeconds;
		}
		if (currentMinutes < 10) {
			currentMinutes = "0" + currentMinutes;
		}
		if (durationMinutes < 10) {
			durationMinutes = "0" + durationMinutes;
		}

		if (isLoading) return;
		currTime.textContent = currentMinutes + ":" + currentSeconds;
		totalTime.textContent = durationMinutes + ":" + durationSeconds;
	}
}

function changePlaylist(playlist, playlistName) {
	pauseTrack();
	currentPlaylist = playlist;
	displayPlaylist.textContent = playlistName;
	trackIndex = Math.floor(Math.random() * currentPlaylist.length);
	loadTrack(trackIndex, currentPlaylist);
	playTrack();
}

function setAlbumCover(trackIndex, playlist) {
	albumCover.src = playlist[trackIndex].cover_url;
}

const volumeIndicator = document.getElementById("volume-indicator");
function setVolume() {
	console.log(volumeSlider.value);
	currentTrack.volume = volumeSlider.value / 100;
	if (volumeSlider.value == 100) {
		volumeIndicator.src = "./assets/icons/volume.png";
	} else if (volumeSlider.value < 100 && volumeSlider.value >= 50) {
		volumeIndicator.src = "./assets/icons/volume2.png";
	} else if (volumeSlider.value < 50 && volumeSlider.value > 0) {
		volumeIndicator.src = "./assets/icons/volume3.png";
	} else if (volumeSlider.value == 0) {
		volumeIndicator.src = "./assets/icons/volume4.png";
	}
}

const body = document.getElementById("everything");
$(document).ready(() => {
	body.style.setProperty("--app-height", `${window.innerHeight - 20}px`);
	window.addEventListener("resize", () => {
		body.style.setProperty("--app-height", `${window.innerHeight - 20}px`);
	});
	trackIndex = Math.floor(Math.random() * currentPlaylist.length);
	loadTrack(trackIndex, currentPlaylist);
});
