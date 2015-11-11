var grabTag = function(game, playTag){
	var arrayPlayer = game.split(',');
	var target = playTag.split(',');
	console.log(target);
	console.log(arrayPlayer);
	var inputTag = document.getElementById('tagGetter').value;
		for(var i = 0; i < arrayPlayer.length; i++) {
			if(arrayPlayer[i] === inputTag) {
				var index = i;
				target.splice(arrayPlayer[index], 1);
				alert("target terminated");
		} else {
			alert('fail');
		}
	}
	return target;
};


var deleteGuy = function(gameid, guy){
	$.getJSON("/api/gamePlayer/" + gameid, function( data ) {
		var foundGuy = null;
		for (var i = 0; i < data.length; i++) {	
		  	if( data[i] === guy ) {
				foundGuy = guy;
			};
		};
		if (foundGuy != null) {
			$.ajax({
				url: "/api/gamePlayer/" + gameid,
				type: 'DELETE',
				dataType: 'json',
				data: { "player": guy},
				success: function(result) {
        			console.log('Successfully removed ' + guy);	
        			location.href = "/game/" + gameid;
    			}
			});
		} else {
			console.log("Couldn't find " + guy);
		};	
	});
};


var finalizeGame = function (){
	
		$( ".remove-button" ).hide();
		$( "#startButton").hide();

}

var allPlayers = [];


var playerGetter = function (gameid) {

	var list = document.getElementById("players");

	$.when( 
		$.getJSON( "/api/playerRoutes/"), 
		$.getJSON("/api/gamePlayer/" + gameid)
	).then(

		function( theplayers, gameplayers ) {
			var players = '<option>Choose a player for your game</option>';

			for (var i = 0; i < theplayers[0].length; i++) {
				var p = theplayers[0][i].handle;
				var g = gameplayers[0];

				if(g.indexOf(p) === -1 ){
					players += '<option value="' + p + '">' + p + '</option>';

					allPlayers.push(p);
				}
			}
			list.innerHTML = players;
		}
	);
}


var deleteTarget = function(gameid, tag){
	$.when(
		$.getJSON("/api/playerRoutes/"),
		$.getJSON("/api/gamePlayer/" + gameid)
	).then(
		function(player, playerArray){
			var foundHandle = null;
		  		if( player.tag === tag ) {
				player.handle = foundHandle;
			}else {
				console.log("Can't find that Tag!");
			};
			for (var i = 0; i < playerArray.length; i++) {
				if(foundHandle != null && playerArray[i] === foundHandle){
					$.ajax({
						url: "/api/gamePlayer/" + gameid,
						type: "DELETE",
						dataType: "json",
						data: {'player': foundHandle},
						success: function(result){
							console.log('successfully defeated Agent ' + guy);
							location.href = "/game/" + gameid;
						}
					});
				}else{
					console.log("couldn't accomplish mission against " + guy);
			};
		};		
	});
};




