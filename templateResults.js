function templateResults(context){
	var html = `
			<body>
				<script>var racerResults = ${ JSON.stringify(context.racerResults) };</script>
				<h1>${ context.raceDesc }</h1>
				<div class="container-fluid">
					<h2>Laps</h2>
					${ templateTableLaps(context) }

					<h2>Lap Chart</h2>
					${ templateChartLapTimes(context) }

					<h2>Lap Diff Chart</h2>
					${ templateChartLapDiff(context) }
				</div>
			</body>
	`;

	return html;
}