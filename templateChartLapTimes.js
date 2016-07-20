function templateChartLapTimes(context){

	return `

<div id="chart_laps"></div>
<script>
	function formatLapTime(value){
		var minutes = Math.floor(value/60.0);
		var seconds = Math.floor(value - (minutes*60.0));
		var valueAsStr = value.toString();
		var millis = 0;
		
		if (valueAsStr.indexOf('.') !== -1) {
			millis = valueAsStr.split('.')[1];
		}

		return '' + minutes + ':' + seconds + '.' + millis;
	}

	$(function () {
	    $('#chart_laps').highcharts({
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: 'Lap Times Chart'
	        },
	        series: generateSeries(),
	        yAxis: {
	        	labels: {
	        		formatter: function(){
	        			return formatLapTime(this.value);
	        		}
	        	}
	        },

	        tooltip: {
	        	formatter: function() {
					return formatLapTime(this.y);
	        	}
	        }
	    });

	    function generateSeries(){
	    	var series = [];
	    	for (var i=0; i < racerResults.length; i++) {
	    		var lapTimes = [];

	    		for (var l = 0; l < racerResults[i].laps.length; l++) {
	    			var parsedLap = racerResults[i].laps[l].rawTime.split(/[:\.]/);
	    			lapTimes.push(parseFloat(parsedLap[0])*60.0 + parseFloat(parsedLap[1])*1.0 + parseFloat(parsedLap[2])*0.001);
	    		}

	    		series.push({ name: racerResults[i].number, data: lapTimes });
	    	}

	    	return series;
	    }
	});
</script>
`;

}