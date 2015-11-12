

var arrayPlayerOfIds = [];
var deleteGuy = function(gameid, guy){

		$.getJSON("/api/gamePlayer/" + gameid, function( data ) {
			arrayPlayerOfIds = data;
			console.log(guy, arrayPlayerOfIds.toString());
		});
		for (var i = 0; i < arrayPlayerOfIds; i++) {
			console.log("inside for loop")
			console.log(arrayPlayerOfIds[i].toString())
			if(guy === arrayPlayerOfIds[i].toString()){
			console.log("preparing to enter ajax", gameid, guy)
			$.ajax({
				url: "/api/gameRoutes/" + gameid,
				type: 'DELETE',
				dataType: 'json',
				data: { "_players" : 'ObjectId("' + arrayPlayerOfIds[i] + '")'},
				success: function(result) {

					console.log(result)
        			console.log('Successfully removed ' + guy);	
        			location.href = "/game/" + gameid;
    			},
    			error: function(err){
    				console.log(err)
    			}
			});
			}
		};
		

	};



var finalizeGame = function (){
	
	$( ".remove-button" ).hide();
	$( "#startButton").hide();

}
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
	return target;
	};

	};

var allUsers = [];

var playerGetter = function (gameid) {

	var list = document.getElementById("users");

	$.when( 
		// $.getJSON( "/completeGame/"), 
		$.getJSON("/api/gamePlayer/" + gameid)
	).then(

		function( theUsers, gameUsers ) {
			var users = '<option>Choose a player for your game</option>';

			for (var i = 0; i < theUsers.length; i++) {
				var p = theUsers[i].local.handle;
				var g = gameUsers[0];

				if(g.indexOf(p) === -1 ){
					users += '<option value="' + p + '">' + p + '</option>';

					allUsers.push(p);
				}
			}
			list.innerHTML = users;
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





