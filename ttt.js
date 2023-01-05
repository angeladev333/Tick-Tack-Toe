let tiles = document.querySelectorAll(".grid");
console.log(tiles);

let startbutton = document.querySelector("#startbutton");
let restartbutton = document.querySelector("#restartbutton");

let narrator = document.querySelector("#narrator");

//tile row = tile-1/3 only if tile-1>0, tile col = tile-1% 3
let doublearr=[];
let cols = 3;
let rows = 3;
let count = 0;

//make double array
for(var i=0; i<cols; i++){
	doublearr[i] = [];
}

for(var i=0; i< cols; i++){
	for(var j=0; j<3; j++){
		doublearr[i].push(tiles[count]);
		count ++;
	}
}

console.log(doublearr);

// A3: doublearr[0][0]
// B3: doublearr[0][1]
// C3: doublearr[0][2]
// A2: doublearr[1][0]
// B2: doublearr[1][1]
// C2: doublearr[1][2]
// A1: doublearr[2][0]
// B1: doublearr[2][1]
// C1: doublearr[2][2]

let player1 = "";
let player2 = "";
let turns = 0;
let done = false;

//Tiles stuff
  tiles.forEach((tile)=>{

    tile.addEventListener("click", (e)=>{
			console.log(`${tile} clicked!`);
	
			if(tile.selected == false){
				tile.selected = true;
        if (turns % 2 == 1) {
          tile.innerHTML = '<img src="./TTT/Cross.png" />';
        }
        else {
          tile.innerHTML = '<img src="./TTT/Circle.png" />';
        }

				checkTiles(doublearr);

        turns++;
				if (turns % 2 == 1 && done == false) {
		      narrator.innerHTML = `${player1}'s Turn!`;
		    }
		    if(turns % 2 == 0 && done == false){
		      narrator.innerHTML = `${player2}'s Turn!`;
		    }
				
			}
		});
	});

// Start Button Event Listener
startbutton.addEventListener("click", (e)=>{
	startbutton.disabled = true;
	turns = 1;
	narrator.classList.remove("hidden");

	tiles.forEach((tile) =>{
		tile.selected = false;
	});

	// RESTART BUTTON STUFF
	restartbutton.disabled = false;
	
	restartbutton.addEventListener("click", (e)=>{
		narrator.classList.add("hidden");
		// set turn number to 0 again and reset all table contents
		turns = 0;
		for(let i=0; i<3; i++){
			for(let k=0; k<3; k++){
				doublearr[i][k].innerHTML = "";
			}
		}
		//restart button will be disabled again
		restartbutton.disabled = true;
		startbutton.disabled = false;
		done = false;
	});

	// PLAYR STUFF
	player1 = document.getElementById("input1").value;
	
	if(player1 === ""){
		player1 = "Player 1";
	}
	player2 = document.getElementById("input2").value;

	if(player2 === ""){
		player2 = "Player 2";
	}
	console.log(`Player1: ${player1}`);
	console.log(`Player2: ${player2}`);

  narrator.innerHTML = `${player1}'s Turn!`;
	
	done = false;
});

function checkTiles(doublearr){

	if(turns >= 5 && turns!=9){
		//CHECK FOR WIN
		//diagonal down
		if(doublearr[0][0].innerHTML == doublearr[1][1].innerHTML && doublearr[1][1].innerHTML == doublearr[2][2].innerHTML && doublearr[1][1].innerHTML!=""){
			//game over based on whose turn
			someoneWon(turns);
			console.log("diagonal down");
		}
		//diagonal up
		if(doublearr[2][0].innerHTML == doublearr[1][1].innerHTML && doublearr[1][1].innerHTML == doublearr[0][2].innerHTML && doublearr[1][1].innerHTML!=""){
			someoneWon(turns);
			console.log("diagonal up");
		}

		//first row
		if(doublearr[0][0].innerHTML == doublearr[0][1].innerHTML && doublearr[0][1].innerHTML == doublearr[0][2].innerHTML && doublearr[0][1].innerHTML!=""){
			 someoneWon(turns);
			console.log("first row");
		} 

		//second row
		if(doublearr[1][0].innerHTML == doublearr[1][1].innerHTML && doublearr[1][1].innerHTML == doublearr[1][2].innerHTML && doublearr[1][1].innerHTML!=""){
			 someoneWon(turns);
			console.log("second row");
		} 

		//third row
		if(doublearr[2][0].innerHTML == doublearr[2][1].innerHTML && doublearr[2][1].innerHTML == doublearr[2][2].innerHTML && doublearr[2][1].innerHTML !=""){
			 someoneWon(turns);
			console.log("third row");
		} 

		//first column
		if(doublearr[0][0].innerHTML == doublearr[1][0].innerHTML && doublearr[1][0].innerHTML == doublearr[2][0].innerHTML && doublearr[1][0].innerHTML !=""){
			 someoneWon(turns);
			console.log("first column");
		} 

		//second column
		if(doublearr[0][1].innerHTML == doublearr[1][1].innerHTML && doublearr[1][1].innerHTML == doublearr[2][1].innerHTML && doublearr[1][1].innerHTML!=""){
			 someoneWon(turns);
			console.log("second column");
		} 

		//third column
		if(doublearr[0][2].innerHTML == doublearr[1][2].innerHTML && doublearr[1][2].innerHTML == doublearr[2][2].innerHTML && doublearr[1][2].innerHTML!=""){
			 someoneWon(turns);
			console.log("third column");
		}
	}
	else if(turns == 9){
		narrator.innerHTML = "IT'S A TIE! :(";
		done = true;
	}
}

function someoneWon(turns){
	let winner = "";
	if(turns%2==1){
		winner = player1;
	}
	else{
		winner = player2;
	}

	done = true;

	
	//do not allow more clicks
	tiles.forEach((tile)=>{
		tile.selected = true;
	});
	narrator.innerHTML = `${winner} won!`;
}