//LoadFile


function LoadFile(){
	let file;
	file = fileInput.files[0];
	console.log("Importing:",file.name);
	let azip = new JSZip();
	azip.loadAsync(file).then(function(zip){
		let infoFile = azip.file("info.dat");
		if(infoFile != null){
			console.log("found info.dat");
			infoFile.async("string")
			.then(function (infoString){ //After the info file is read
				console.log(infoString);
				infoObj = JSON.parse(infoString);
				console.log("Loaded " + infoObj._songName);
				let diffObj = infoObj._difficultyBeatmapSets[0]._difficultyBeatmaps[0];
				console.log("Loading: " + diffObj._beatmapFilename);
				let beatFile = azip.file(diffObj._beatmapFilename); // Loads the Beat file
				if(beatFile != null){
					beatFile.async("string")
					.then(function (beatString){ //After the beat file is read
						//console.log(beatString);
						beatObj = JSON.parse(beatString);
						console.log("loaded " + beatFile.name);
						UpdateBeatMap();
					});
				}else{
					console.log("Could not find " + diffObj._beatmapFilename);
				}

				//SONG
				let songFile = azip.file(infoObj._songFilename);
				if(songFile != null){
					console.log("loading: " + songFile.name);
					songFile.async("blob")
					.then(function (songBlob){
						songUrl = URL.createObjectURL(songBlob);
						console.log("Song stored as URL");
						UpdateSong();
					})
				}else{
					console.log("Could not find " + infoObj._songFilename);
				}

				///COVER
				let coverFile = azip.file(infoObj._coverImageFilename);
				if(coverFile != null){
					console.log("loading: " + coverFile.name);
					coverFile.async("blob")
					.then(function (coverBlob){
						coverUrl = URL.createObjectURL(coverBlob);
						
						console.log("Cover stored as URL");
						UpdateImage();
					})
				}else{
					console.log("Could not find " + infoObj._coverImageFilename);
				}

			});
		}else{
			console.log("Could not load info.dat");
		}
	});
}