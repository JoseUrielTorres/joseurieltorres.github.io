const mePath = "./assets/me/";
const sceneryPath = "./assets/scenery/";
const myImages = [
	{
		path: `${mePath}proProfile.jpg`,
	},
	{
		path: `${mePath}atComputer.jpg`,
	},
];
const filmImages = [
	{
		path: `${sceneryPath}tulips.JPG`,
	},
	{
		path: `${sceneryPath}path.JPG`,
	},
	{
		path: `${sceneryPath}lava.JPG`,
	},
	{
		path: `${sceneryPath}hotel.JPG`,
	},
	{
		path: `${sceneryPath}green.JPG`,
	},
	{
		path: `${sceneryPath}glassgarden.JPG`,
	},
	{
		path: `${sceneryPath}glass.JPG`,
	},
	{
		path: `${sceneryPath}garden2.JPG`,
	},
	{
		path: `${sceneryPath}garden.JPG`,
	},
	{
		path: `${sceneryPath}fountain.JPG`,
	},
	{
		path: `${sceneryPath}beach2.JPG`,
	},
	{
		path: `${sceneryPath}beach.JPG`,
	},
];

let daydreamIndex = Math.floor(Math.random() * myImages.length);
let filmIndex = Math.floor(Math.random() * filmImages.length);
const changeButtons = document.querySelectorAll(".next-bar span");
const daydreamsPic = document.getElementById("daydreams-pic");
const filmPic = document.getElementById("film-pic");

$(document).ready(() => {
	daydreamsPic.src = myImages[daydreamIndex].path;
	filmPic.src = filmImages[filmIndex].path;
});

changeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const buttonId = button.id;
		if (buttonId.includes("prev")) {
			if (buttonId.includes("daydreams")) {
				if (daydreamIndex == 0) {
					daydreamIndex = myImages.length - 1;
				} else {
					daydreamIndex -= 1;
				}
				daydreamsPic.src = myImages[daydreamIndex].path;
			} else if (buttonId.includes("film")) {
				if (filmIndex == 0) {
					filmIndex = filmImages.length - 1;
				} else {
					filmIndex -= 1;
				}
				filmPic.src = filmImages[filmIndex].path;
			}
		} else if (buttonId.includes("next")) {
			if (buttonId.includes("daydreams")) {
				if (daydreamIndex == myImages.length - 1) {
					daydreamIndex = 0;
				} else {
					daydreamIndex += 1;
				}
				daydreamsPic.src = myImages[daydreamIndex].path;
			} else if (buttonId.includes("film")) {
				if (filmIndex == filmImages.length - 1) {
					filmIndex = 0;
				} else {
					filmIndex += 1;
				}
				filmPic.src = filmImages[filmIndex].path;
			}
		}
	});
});
