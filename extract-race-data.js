var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function handleRequestForRaceResults(raceUrl, callback){
	var raceDesc = getLocation(raceUrl).pathname.replace(/\//gi, ' ').replace(/\%20/gi, ' ').replace(/\..*$/gi, '');

	console.log('request for results of ' + raceUrl);

	async.waterfall([
		getRacePage,
		extractRacerUrls,
		extractRacerResults,
	], function(err, racerResults){
		console.log('rendering results page...');
		callback(templateResults({ racerResults: racerResults, raceDesc: raceDesc }));
	});

	function getRacePage(callback){
		console.log('getting race page');

		$.ajax(raceUrl, { success: function(response){
			callback(null, response);
		} });
	}

	function extractRacerUrls(rawRacePage, callback){
		console.log('extracing racer urls');
		var $racePage = $(rawRacePage);
		var racers = [];
		var racerATags = $racePage.find('a');
		_.each(racerATags, function(aTag){
			var parentTr = $(aTag).closest('tr');
			racers.push({
				name: $($(parentTr[0]).find('td')[2]).text(),
				position: $($(parentTr).find('td')[0]).text(),
				number: $($(parentTr).find('td')[1]).text(),
				resultsUrl: $(aTag).attr('href')
			});
		});

		callback(null, racers);
	}

	function extractRacerResults(racers, callback){
		console.log('extracting race results');
		var numRacersProcessed = 0;

		var racerProcessed = function(){
			numRacersProcessed += 1;

			if (numRacersProcessed === racers.length){
				callback(null, racers);
			}
		}

		_.each(racers, function(racer, index){
			var racerUrl = [raceUrl, '..', racer.resultsUrl].join('/');
			console.log('Requesting racer page ' + racerUrl + ' ...');
			$.ajax(racerUrl, { success: function(response){
				var laps = [];
				console.log('finished consuming racer page data!');
				_.each($(response).find('tr'), function(tr){
					var number = $($(tr).find('td')[1]).text();
					var rawTime = $($(tr).find('td')[2]).text();
					if (number && rawTime && rawTime !== 'Laptime'){ 
						laps.push({
							number: $($(tr).find('td')[1]).text(),
							rawTime: $($(tr).find('td')[2]).text()
						});
					}
				});
				racers[index].laps = laps;
				racerProcessed();
			} });
		});
	}
}