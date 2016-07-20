function rawLapToSeconds(rawLap) {
	var parsedLap = rawLap.split(/[:.]/);
	return parseFloat(parsedLap[0])*60.0 + parseFloat(parsedLap[1])*1.0 + parseFloat(parsedLap[2])*0.001;
}