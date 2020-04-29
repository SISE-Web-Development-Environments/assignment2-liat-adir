var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var lastKeyPressed = "right";
var maxMonsters;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

// 4 - Walls
// 1 - Food
// 2 - Pacman start point
// 0 - Pass
// 5 - monster

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	maxMonsters = 4;
	start_time = new Date();
	for (var i = 0; i < 10; i++)
		board[i] = new Array();

	board[0][0] = 5;



		if (maxMonsters > 1)
			board[9][9] = 5;
		
		if (maxMonsters > 2)
			board[0][9] = 5;

		if (maxMonsters > 3)
			board[9][0] = 5;		


	for (var i = 0; i < 10; i++) {
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 0 && j == 3) ||
				(i == 1 && j == 3) ||
				(i == 2 && j == 3) ||
				(i == 0 && j == 8) ||
				(i == 1 && j == 8) ||
				(i == 2 && j == 8) ||
				(i == 4 && j == 5) ||

				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 7 && j == 4) ||
				(i == 8 && j == 4) ||
				(i == 6 && j == 4) ||

				(i == 5 && j == 7) ||
				(i == 5 && j == 8) ||
				(i == 5 && j == 9) ||

				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				if (board[i][j] != 5) {
					var randomNum = Math.random();
					if (randomNum <= (1.0 * food_remain) / cnt) {
						food_remain--;
						board[i][j] = 1;
					} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
						shape.i = i;
						shape.j = j;
						pacman_remain--;
						board[i][j] = 2;
					} else {
						board[i][j] = 0;
					}
					cnt--;
				}

			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}



	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 100);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function isKeyPressed() {

	if (keysDown[38] || keysDown[40] || keysDown[37] || keysDown[39]) 
		return true;

	return false;

}

function GetKeyPressed() {
	
	if (keysDown[38]) {
		lastKeyPressed = "up";
	}
	if (keysDown[40]) {
		lastKeyPressed = "down";
	}
	if (keysDown[37]) {
		lastKeyPressed = "left";
	}
	if (keysDown[39]) {
		lastKeyPressed = "right";
	}

	return lastKeyPressed;
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				var key = GetKeyPressed();
				context.beginPath();
				if (key == "left")
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle left
				else if (key =="right")
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle right
				else if (key =="up")
					context.arc(center.x, center.y, 30, 0 * Math.PI, 2 * Math.PI); // half circle right
				else if (key =="down")
					context.arc(center.x, center.y, 30, 0 * Math.PI, 2 * Math.PI); // half circle right


				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				if (key != "up" && key != "down")
					context.arc(center.x + 5, center.y - 15, 4, 0, 2 * Math.PI); // circle
				if (key == "down")
				{
					context.arc(center.x + 7, center.y - 15, 4, 0, 2 * Math.PI); // circle
					context.arc(center.x - 7, center.y - 15, 4, 0, 2 * Math.PI); // circle
				}

				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();

			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[i][j] == 5) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "red"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	if (isKeyPressed())
	{
		var x = GetKeyPressed();
		if (x == "up") {
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
				shape.j--;
			}
		}
		if (x == "down") {
			if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		if (x == "left") {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		if (x == "right") {
			if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
			}
		}
	}
	
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
