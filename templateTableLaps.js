function templateTableLaps (context){
	var mostLaps = 0;
	_.each(context.racerResults, function(racer){
		if (racer.laps.length > mostLaps) {
			mostLaps = racer.laps.length;
		}
	});

	var html = `
<table class="table">
`;

	html += `
		<tr>
			<th>Lap</th>
	`;
	for (var i = 0; i < context.racerResults.length; i++){
		var racer = context.racerResults[i];
		html += `
			<th>${racer.name} (${racer.number})</th>
		`;
	}
	html += '</tr>';

	for (var lap = 0; lap < mostLaps; lap++){
		html += '<tr>'
		html += `<td>${lap + 1}</td>`;
		_.each(context.racerResults, function(racer){
			html += `<td>${racer.laps[lap]? racer.laps[lap].rawTime : ''}</td>`;
		});
		html += '</tr>';
	}

	html += '</table>';

	return html;
}