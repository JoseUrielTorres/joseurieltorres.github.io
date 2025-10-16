let secondLine = document.getElementById("secondP");
let press = document.getElementById("press");
let firstLine = document.getElementById("firstP");

function intro() {
	setTimeout(() => {
		secondLine.style.display = "block";
	}, 3000);
	setTimeout(() => {
		press.style.display = "flex";
	}, 3000);
}

async function typeSentence(sentence, eleRef, delay = 100) {
	const letters = sentence.split("");
	let i = 0;
	while (i < letters.length) {
		await waitForMs(delay);
		$(eleRef).append(letters[i]);
		i++;
	}
	return;
}

function waitForMs(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

$(document).ready(() => {
	typeSentence("hello world, lets jam!", firstLine);
	intro();
});
