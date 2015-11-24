$(document).ready(function(){
	console.log("ready");

//NOTHING STARTED: WRITE A CLOSURE TO TRIGGER GAMESTART FUNCTION



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
});
//making a game board as an array
var gameBoard = [
	[["R",1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],["L",0],["L",0],[0,0],[0,0],["L",0],["L",0],[0,0],[0,0]],
	[[0,0],[0,0],["L",0],["L",0],[0,0],[0,0],["L",0],["L",0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
];
// setting the current player's turn
var playerTurn = "R";
// the starting position of a move
var startPos = [];
// the ending position of a move
var endPos = [];
// setting phase for set-up or play
var gamePhase = "play";

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
	}	else if (!checkMoveUp() || !checkMoveDown() || !checkMoveRight() || !checkMoveLeft()) {
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
			fightCheck(elem);
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
	$("div[data-row="+startPos[0]+"],[div[data-col="+startPos[1]+"]").removeAttr("data-color data-value");//need line to clear .data-color and /data-value from start div
	if (gameBoard[endPos[0]][endPos[1]][1] === "f"){
		win();
	} else if (nonMinerVsBomb()){
		$("#messageBox").html("BOOM! "+ startPos[2]+ " " + startPos[3] + " found a bomb.");

	} else if (minerVsBomb()){
		$("#messageBox").html(startPos[2] + " " + startPos[3] + " defused a bomb!");
		move();
	} else if (spyVsMarshall){
		$("#messageBox").html(startPos[2] + " Spy killed the enemy marshall!");
		move();
	} else if (spyVsNotMarshall){
		$("#messageBox").html(startPos[2] + "Spy was killed by " + endPos[2] + " " + endPos[3] +"."]);
	}

var sameValue = function(){};

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
	if (gameBoard[startPos[0]][startPos[1]][1] === 1 && gameBoard[endPos[0]][endPos[1]][1] === 1){
		return true;
	}
};


var twoValues = function(){};



//checking the outcome of a fight
var fight = function(){};

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
var movePiece = function(){};

//to implement if moveCheck returns false
//var sorry = function(){};

//Sean's advice: pass "this down the chain for the orginial function." Reach the 1st click with this., reach the second click with .closest, looking for the specifc row and col data of the target.






});