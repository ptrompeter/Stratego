
var startPos = [];
var gameBoard = [
	[["R",2],["B",4],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],["B",1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],["L",0],["L",0],[0,0],[0,0],["L",0],["L",0],[0,0],[0,0]],
	[[0,0],[0,0],["L",0],["L",0],[0,0],[0,0],["L",0],["L",0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
];


$(document).ready(function(){
	console.log("ready");

//NOTHING STARTED: WRITE A CLOSURE TO TRIGGER GAMESTART FUNCTION
// setting the current player's turn
var playerTurn = "R";
// the starting position of a move
//var startPos = [];
// the ending position of a move
var endPos = [];
// setting phase for set-up or play
var gamePhase = "setup";

//making a game board as an array
// var gameBoard = [
// 	[["R",2],["B",4],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
// 	[[0,0],["B",1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
// 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
// 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
// 	[[0,0],[0,0],["L",0],["L",0],[0,0],[0,0],["L",0],["L",0],[0,0],[0,0]],
// 	[[0,0],[0,0],["L",0],["L",0],[0,0],[0,0],["L",0],["L",0],[0,0],[0,0]],
// 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
// 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
// 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
// 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
// ];



//adding an event listener to squares on the game board:
$("#gameBoard > div > div").click(function(){
	var e = $(this);
	var row = e.attr("data-row");
	var col = e.attr("data-col");
	console.log('First Row: ' + row, 'First Col: ' + col);
	if (gamePhase === "play"){
		if(startPos.length === 0){
			$("#messageBox").html(" ");
			moveStart(row, col);
		} else {
			moveCheck(row, col);
		}
	}
	if (gamePhase === "setup"){
		if(startPos.length === 0){
			$("#messageBox").html("Please select a piece from your set-up box.");
		} else {
			addToBoard(row, col, e);

		}
	}
});
//adding event listener to red box starting squares
$("#redStartBox > div > div").click(function(){
	if (gamePhase === "setup" && playerTurn === "R"){
		startPos = [0,0,"R",($(this).html())];
		console.log(startPos);

		if (!isNaN(parseInt(startPos[3]))){
			startPos[3] = parseInt(startPos[3]);
			console.log(startPos);
		}
	}
});

$("#blueStartBox > div > div").click(function(){
	if (gamePhase === "setup" && playerTurn === "B"){
		startPos = [0,0,"B",($(this).html())];
		console.log(startPos);

		if (!isNaN(parseInt(startPos[3]))){
			startPos[3] = parseInt(startPos[3]);
			console.log(startPos);
		}
	}
});

$("#ready").click(function(){
	if (gamePhase === "setup"){
		if (playerTurn === "R"){
			// if (setupCheck()){
				playerTurn = "B";
				$("#messageBox").html("Blue player, your turn! Click 'ready' when your setup is complete!");
			// }
			startPos=[];
		} else {
			// if (setupCheck()){
				gamePhase = "play";
				playerTurn = "R";
				$("#messageBox").html("Red player goes first.");
			// }
			startPos=[];
		}
	}
});

$("#hidePieces").click(function(){
	hideValues();
});

$("#showPieces").click(function(){
	console.log('show pieces')
	if (playerTurn === "R"){
		showRedValues();
	} else {
		showBlueValues();
	}
});

function addToBoard(row, col, e){
	startPos[0]=parseInt(row);
	startPos[1]=parseInt(col);
	if ((playerTurn === "R" && row < 4) || (playerTurn === "B" && row > 5)){
		gameBoard[startPos[0]][startPos[1]][0] = startPos[2];
		gameBoard[startPos[0]][startPos[1]][1] = startPos[3];
		addToCss(e);
	} else {
		$("#messageBox").html("Pieces can only be played on your side of the board.");
	}
}

function addToCss(e){
	e.find('.color').addClass(startPos[2]);
	e.find('.color > .value').html(startPos[3]);
}


function changePlayer() {
	startPos = [];
	endPos = [];
	hideValues();
	if (playerTurn === "R"){
		playerTurn = "B";
		//$("#messageBox").html("Blue's Turn!");
	} else {
		playerTurn = "R";
		//$("#messageBox").html("Red's Turn!");
	}
}

function showRedValues(){
	$(".R").children().each(function(i){
		$(this).show();
	});
}

function showBlueValues(){
	$(".B").children().each(function(i){	
		$(this).show();
	});
}

function hideValues(){
	$(".value").each(function(i){
		$(this).hide();
	});
}


//checking the legality of a move
var moveCheck = function(row, col){
	endPos.push(parseInt(row));
	endPos.push(parseInt(col));
	endPos.push(gameBoard[endPos[0]][endPos[1]][0]);
	endPos.push(gameBoard[endPos[0]][endPos[1]][1]);
	console.log("endPos:", endPos);
	if (gameBoard[startPos[0]][startPos[1]][1] === 'f'){
			startPos = [];
			endPos = [];
			$("#messageBox").html("Sorry.  Flags don't move.");
	} 	else if (gameBoard[startPos[0]][startPos[1]][1] === 'b'){
			startPos = [];
			endPos = [];
		$("#messageBox").html("Sorry.  Bombs don't move.");
	}	else if (!checkMoveUp() && !checkMoveDown() && !checkMoveRight() && !checkMoveLeft()) {
			startPos = [];
			endPos = [];
			$("#messageBox").html("Sorry - pieces can only move exactly one space at a time.  Please select a piece to move.");

	}   else if (gameBoard[endPos[0]][endPos[1]][0] === "L") {
			$('#messageBox').html("Sorry.  You can't move onto a lake. Please select a piece to move.");
			startPos = [];
			endPos = [];		
	}	else if (gameBoard[endPos[0]][endPos[1]][0] === playerTurn){
			$('#messageBox').html("Sorry.  You can't move onto your own piece. Please select a piece to move.");
			startPos = [];
			endPos = [];			
	}	else if (gameBoard[endPos[0]][endPos[1]][0] !== 0){
			fightCheck();
	}	else {
			movePiece();
	}
 
};

function checkMoveUp(){
	if (startPos[0] - endPos[0] === 1 && startPos[1] === endPos[1]){
		return true;
	} else {
		return false;
	}

}
function checkMoveDown(){
	if (endPos[0] - startPos[0] === 1 && startPos[1] === endPos[1]){
		return true;
	} else {
		return false;
	}
}
function checkMoveRight(){
	if (endPos[0] === startPos[0] && endPos[1] - startPos[1] === 1){
		return true;
	} else {
		return false;
	}
}
function checkMoveleft(){
	if (endPos[0] === startPos[0] && startPos[1] - endPos[1] === 1){
		return true;
	} else {
		return false;
	}
}
// I realized I didnt' need the following function because to pass checkmove something has to equal 1.
//function noMove(){
// 	if (endPos[0] === startPos[0] && endPos[1] === endPos[1]){
// 		return false;
// 	}
// }
var fightCheck = function(){
	emptyStartSquare();

	if (gameBoard[endPos[0]][endPos[1]][1] === "f"){
		win();
	} else if (nonMinerVsBomb()){
		$("#messageBox").html("BOOM! "+ startPos[2]+ " " + startPos[3] + " found a bomb. He didn't survive.");
		changePlayer();

	} else if (minerVsBomb()){
		$("#messageBox").html(startPos[2] + " " + startPos[3] + " defused a bomb!");
		movePiece();
	} else if (spyVsMarshall()){
		$("#messageBox").html(startPos[2] + " Spy killed the enemy marshall!");
		movePiece();
	} else if (spyVsNotMarshall()){
		$("#messageBox").html(startPos[2] + " Spy was killed by " + endPos[2] + " " + endPos[3] +".");
		changePlayer();
	} else if (marshallVsSpy()){
		$("#messageBox").html(startPos[2] + " Marshall attacked the enemy spy! The marshall died!");
		changePlayer();
	} else if (notMarshallVsSpy()){
		$("#messageBox").html(startPos[2] + " " + startPos[3] + " killed the enemy spy!");
		movePiece();
	} else if (sameValue()){
		$("#messageBox").html(startPos[2] + " " + startPos[3] + " attacked " + endPos[2] + " " + endPos[3] + ". They both died.");
		emptyEndSquare();
		changePlayer();
	} else {
		if (startPos[3] < endPos[3]){
			$("#messageBox").html(startPos[2] + " " + startPos[3] + " attacked " + endPos[2] + " " + endPos[3] + ". He wins!");
			movePiece();
		} else {
			$("#messageBox").html(startPos[2] + " " + startPos[3] + " attacked " + endPos[2] + " " + endPos[3] + ". He lost. And died.");
			changePlayer();
		}
	}
};
var emptyStartSquare = function(){
	//removes grid attributes
	$("[data-row="+startPos[0]+"][data-col="+startPos[1]+"]").removeAttr("data-color data-value");
	//removes color class
	$("[data-row="+startPos[0]+"][data-col="+startPos[1]+"] > div").removeClass(startPos[2]);
	//adds value text and hides
	$("[data-row="+startPos[0]+"][data-col="+startPos[1]+"] > div > div").html("");
};

var emptyEndSquare = function()	{
//removes grid attributes
	$("[data-row="+endPos[0]+"][data-col="+endPos[1]+"]").removeAttr("data-color data-value");
	//removes color class
	$("[data-row="+endPos[0]+"][data-col="+endPos[1]+"] > div").removeClass(endPos[2]);
	//adds value text and hides
	$("[data-row="+endPos[0]+"][data-col="+endPos[1]+"] > div > div").html();
};

var sameValue = function(){
	if (startPos[3] === endPos[3]){
		return true;
	}
};

var minerVsBomb = function(){
	if (gameBoard[endPos[0]][endPos[1]][1] === "b" && gameBoard[startPos[0]][startPos[1]][1] === 8){
		return true;
	}
};

var nonMinerVsBomb = function(){
	if (gameBoard[endPos[0]][endPos[1]][1] === "b" && gameBoard[startPos[0]][startPos[1]][1] !== 8){
		return true;
	}
};

var spyVsMarshall = function(){
	if (gameBoard[startPos[0]][startPos[1]][1] === "s" && gameBoard[endPos[0]][endPos[1]][1] === 1){
		return true;
	}
};

var spyVsNotMarshall = function(){
	if (gameBoard[startPos[0]][startPos[1]][1] === "s" && gameBoard[endPos[0]][endPos[1]][1] !== (1 || "f")){
		return true;
	}
};

var marshallVsSpy  = function(){
	if (gameBoard[startPos[0]][startPos[1]][1] === 1 && gameBoard[endPos[0]][endPos[1]][1] === "s"){
		return true;
	}
};
var notMarshallVsSpy = function(){
	if ((startPos[3] !== (1 || 's')) && endPos[3] === 's'){
		return true;
	}
};


//to be run when a player selects a tile
var moveStart = function(row, col){
	console.log('Row: ' + row, 'Col: ' + col);
	startPos.push(parseInt(row));
	startPos.push(parseInt(col));
	startPos.push(gameBoard[startPos[0]][startPos[1]][0]);
	startPos.push(gameBoard[startPos[0]][startPos[1]][1]);
	console.log(startPos);
	if (gameBoard[startPos[0]][startPos[1]][0] !== playerTurn){
		startPos = [];
		$("#messageBox").html("Please select one of your pieces.");
	} else {
		$("#messageBox").html("Please select a destination for your piece.");
	}
};

//to be run on page load or reset
var gameStart = function(){};

//to implement a player's move after moveCheck returns true
var movePiece = function(){
	console.log('Hit movePiece function');
	//removes color and piece value attributes from starting div
	console.log($("[data-row='0'][data-col='0']"));
	emptyStartSquare();
	//adds color and piece value attributes to ending div
	$("[data-row="+endPos[0]+"][data-col="+endPos[1]+"]").attr({"data-color": startPos[2], "data-value": startPos[3]});
	//adds color to piece div
	$("[data-row="+endPos[0]+"][data-col="+endPos[1]+"] > div").addClass(startPos[2]);
	//adds value to value div
	$("[data-row="+endPos[0]+"][data-col="+endPos[1]+"] > div > div").html(startPos[3]);
	//updates gameBoard
	gameBoard[startPos[0]][startPos[1]][0] = 0;
	gameBoard[startPos[0]][startPos[1]][1] = 0;
	gameBoard[endPos[0]][endPos[1]][0] = startPos[2];
	gameBoard[endPos[0]][endPos[1]][1] = startPos[3];
	//resets variables:
	startPos = [];
	endPos = [];
	//changes player
	changePlayer();
};

var gamePieces = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0,
	7: 0,
	8: 0,
	9: 0,
	's': 0,
	'f': 0,
	'b': 0
};

var corretSetup = {
	1: 1,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 4,
	7: 4,
	8: 5,
	9: 8,
	's': 1,
	'f': 1,
	'b': 6
}



function gamePiecesBuilder(color){
	for (i=0; i < gameBoard.length; i++){
		console.log("i loop");
		for (j=0; j < gameBoard[i].length; i++){
			console.log("j loop");
			if (gameBoard[i][j][0] === color){
				gamePieces[gameBoard[i][j][1]]++;
			}
		}
	}
}
function setupCheck(){
	gamePiecesBuilder(playerTurn);
	if(gamePieices === correctSetup){
		console.log("setup passed");
		return true;

	} else{
		$("#messageBox").html("there is a problem with your setup.  Remember: one 1, one 2, two 3s, three 4s, four 5-7s, five 8s, eight 9s, one S, one F, six Bs.");
	}
	gamePieces = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0,
		9: 0,
		's': 0,
		'f': 0,
		'b': 0
		
	};

}

//to implement if moveCheck returns false
//var sorry = function(){};

//Sean's advice: pass "this down the chain for the orginial function." Reach the 1st click with this., reach the second click with .closest, looking for the specifc row and col data of the target.
//
//SETUP




});