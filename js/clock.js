function Clock() {
	let date = new Date();
	let hour = date.getHours();
	let mins = date.getMinutes();
	let period = "";

	if (hour >= 12) {
		period = "pm";
	} else {
		period = "am";
	}

	if (hour == 0) {
		hour = 12;
	} else {
		if (hour > 12) {
			hour = hour - 12;
		}
	}

	hour = updateFormat(hour);
	mins = updateFormat(mins);

	document.getElementById("clock").innerHTML = hour + ":" + mins + " " + period;
	document.getElementById("date").innerHTML = date.toDateString();

	setTimeout(Clock, 1000);
}

function updateFormat(t) {
	if (t < 10) {
		return "0" + t;
	} else {
		return t;
	}
}

Clock();
