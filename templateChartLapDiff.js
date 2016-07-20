function templateChartLapDiff(context){

	return `
	
<div id="chart_diffs"></div>
<script>
	$(function () {
	    $('#chart_diffs').highcharts({
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: 'How Far Behind'
	        },
	        series: generateSeries(),
	        yAxis: {
	        	labels: {
	        		formatter: function(){
	        			return '+' + this.value + 's';
	        		}
	        	}
	        },

	        tooltip: {
	        	formatter: function() {
					return '+' + this.y.toFixed(3) + 's';
	        	}
	        }
	    });

	    function generateSeries(){
	    	var series = [];
	    	var bestCumulative = [];

	    	// Add cumulative lap times to racerResults:
	    	for (var i=0; i < racerResults.length; i++) {
	    		var currentCumulative = 0.0;

	    		for (var l = 0; l < racerResults[i].laps.length; l++) {
	    			var lapSeconds = rawLapToSeconds(racerResults[i].laps[l].rawTime);
	    			currentCumulative += lapSeconds;
	    			racerResults[i].laps[l].cumulative = currentCumulative;

	    			if (bestCumulative.length < (l + 1)) bestCumulative.push(currentCumulative);
	    			else if (currentCumulative < bestCumulative[l]) bestCumulative[l] = currentCumulative;
	    		}
	    	}

			// Generate graph series as difference from best cumulative:
	    	for (var i=0; i < racerResults.length; i++) {
	    		var diffs = [];

				for (var l = 0; l < racerResults[i].laps.length; l++) {
					diffs.push(racerResults[i].laps[l].cumulative - bestCumulative[l]);
				}
				series.push({ name: racerResults[i].number, data: diffs });
	    	}

	    	return series;
	    }
	});
</script>
`;

};