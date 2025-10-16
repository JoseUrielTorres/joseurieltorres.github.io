function createVisualizer() {
	// The number of bars that should be displayed
	const NBR_OF_BARS = 90;

	// Create an audio context
	const ctx = new AudioContext();

	// Create an audio source
	const audioSource = ctx.createMediaElementSource(currentTrack);

	// Create an audio analyzer
	const analayzer = ctx.createAnalyser();

	// Connect the source, to the analyzer, and then back the the context's destination
	audioSource.connect(analayzer);
	audioSource.connect(ctx.destination);

	// Print the analyze frequencies
	const frequencyData = new Uint8Array(analayzer.frequencyBinCount);
	analayzer.getByteFrequencyData(frequencyData);

	// Get the visualizer container
	const visualizerContainer = document.querySelector(".visualizer-container");

	// Create a set of pre-defined bars
	for (let i = 0; i < NBR_OF_BARS; i++) {
		const bar = document.createElement("I");
		bar.setAttribute("id", "bar" + i);
		bar.setAttribute("class", "bars");
		visualizerContainer.appendChild(bar);
	}

	// This function has the task to adjust the bar heights according to the frequency data
	function renderFrame() {
		// Update our frequency data array with the latest frequency data
		analayzer.getByteFrequencyData(frequencyData);

		for (let i = 0; i < NBR_OF_BARS; i++) {
			// Since the frequency data array is 1024 in length, we don't want to fetch
			// the first NBR_OF_BARS of values, but try and grab frequencies over the whole spectrum
			const index = (i + 10) * 2;
			// fd is a frequency value between 0 and 255
			const fd = frequencyData[index];
			const ratio = (fd * 100) / 255;
			const ratioBar = (ratio * visualizerContainer.offsetHeight) / 100;
			// Fetch the bar DIV element
			const bar = document.querySelector("#bar" + i);
			if (!bar) {
				continue;
			}
			// If fd is undefined, default to 0, then make sure fd is at least 4
			// This will make make a quiet frequency at least 4px high for visual effects
			const barHeight = Math.max(5, ratioBar || 0);
			bar.style.height = barHeight + "px";
		}

		// At the next animation frame, call ourselves
		window.requestAnimationFrame(renderFrame);
	}

	renderFrame();
}
