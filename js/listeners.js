const options = document.getElementById("select-relative");
var list = document.getElementById("select-list");
var arrow = document.querySelectorAll(".select-wrapper")[0];
options.addEventListener("click", () => {
	let currStyle = list.style["display"];
	if (currStyle == "none" || !currStyle) {
		list.style["display"] = "block";
		arrow.style.setProperty("--rotate", "rotate(180deg)");
	} else {
		list.style["display"] = "none";
		arrow.style.setProperty("--rotate", "0");
	}
});

const playlists = document.querySelectorAll(".playlists li");
playlists.forEach((playlist) => {
	playlist.addEventListener("click", (e) => {
		let currPlaylistId = e.target.id;
		let currPlaylistName = e.target.textContent;
		changePlaylist(eval(currPlaylistId), currPlaylistName);
	});
});

const closeIcons = document.querySelectorAll(".close-icon");
closeIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		icon.parentElement.parentElement.style.display = "none";
	});
});

const icons = document.querySelectorAll(".section-icons ul li");
icons.forEach((icon) => {
	icon.addEventListener("click", () => {
		if (document.querySelector(".is-active")) {
			document.querySelector(".is-active").classList.remove("is-active");
		}
		icon.classList.add("is-active");
		const frame = icon.id + "-frame";
		let zElements = document.getElementsByClassName("global-item");
		for (var i = 0; i < zElements.length; i++) {
			zHighest = Math.max(zElements[i].style.zIndex, zHighest);
		}
		document.getElementById(frame).style.zIndex = zHighest + 2;
	});
});

icons.forEach((icon) => {
	icon.addEventListener("dblclick", () => {
		const frame = document.getElementById(`${icon.id}-frame`);
		frame.style.display = "block";
		let zElements = document.getElementsByClassName("global-item");
		for (var i = 0; i < zElements.length; i++) {
			zHighest = Math.max(zElements[i].style.zIndex, zHighest);
		}
		frame.style.zIndex = zHighest + 2;
	});
});

document.body.addEventListener("mouseup", () => {
	if (document.querySelector(".is-active")) {
		document.querySelector(".is-active").classList.remove("is-active");
	}
});

const frames = document.querySelectorAll(".inner-wrapper");
frames.forEach((frame) => {
	frame.addEventListener("click", () => {
		let zElements = document.getElementsByClassName("global-item");
		for (var i = 0; i < zElements.length; i++) {
			zHighest = Math.max(zElements[i].style.zIndex, zHighest);
		}
		frame.parentElement.style.zIndex = zHighest + 2;
	});
});

const volumeIcon = document.querySelector("#volume-click");
const slider = document.querySelector(".slider");
volumeIcon.addEventListener("click", () => {
	if (slider.style.display === "block") {
		slider.style.display = "none";
	} else {
		slider.style.display = "block";
	}
});
