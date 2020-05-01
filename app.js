var context;
var shape = new Object();
var mob1 = new Object();
var mob2 = new Object();
var mob3 = new Object();
var mob4 = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval2;
var lastKeyPressed;
var maxMonsters;
var health;
var gameTime;
var timeBonusAvailable;
var up = 38;
var down = 40;
var left = 37;
var right = 39;
var smallBallColor;
var mediumBallColor;
var largeBallColor;
var base_size = 40;
var rows = 25;
var columns = 12;
var remainingBalls;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

// 4 - Walls
// 1 - Food (+5, 60%), small green
// 11 - Food (+15, 30%), medium purple
// 111 - Food (+25, 10%), large blue
// 2 - Pacman start point
// 0 - Pass
// 5 - monster
// 9 - health (+1 life)
// 10 - timeBonus (+10)

function initButtons(upKey, downKey, leftKey, rightKey)
{
	up = upKey;
	down = downKey;
	left = leftKey;
	right = rightKey;
}

function setGameTime(time)
{
	if (time >= 60)
		gameTime = time;
	else
		gameTime = 60;
}

function setMobs(mobsNumber)
{
	maxMonsters = mobsNumber;
}

function setBallsColors(small, medium, large)
{
	smallBallColor = small;
	mediumBallColor = medium;
	largeBallColor = large;
}

function setBallsNumber(ballsNumber)
{
	if (ballsNumber <= 90 && ballsNumber >= 50)
		food_remain = ballsNumber;
	else
		food_remain = 70;
}

function randomizeValues()
{
	var colors = ["red", "green", "blue", "black", "purple"];
	var used = [0,0,0,0,0];

	var rndTime = Math.floor(Math.random()*60+61); // between 60 and 120
	var rndBallsNumber = Math.floor(Math.random()*40+51);
	var rndMobs = Math.floor(Math.random()*4 + 1);

	var rndBallsColors = new Array();

	var rndColor = Math.floor(Math.random()*5);

	for (var i = 0; i < 3; i++)
	{
		while (used[rndColor] == 1)
			rndColor = Math.floor(Math.random()*5);

		rndBallsColors[i] = colors[rndColor];
		used[rndColor] = 1;
	}

	maxMonsters = rndMobs;
	gameTime = rndTime;
	food_remain = rndBallsNumber;
	smallBallColor = rndBallsColors[0];
	mediumBallColor = rndBallsColors[1];
	largeBallColor = rndBallsColors[2];

}

function Start() {
	board = new Array();
	score = 0;
	gameTime = 60;
	timeBonusAvailable = true;
	lastKeyPressed = "right";
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 5;
	var pacman_remain = 1;
	remainingBalls = food_remain + 1;
	health = 5;
	maxMonsters = 4;
	start_time = new Date();
	for (var i = 0; i < rows; i++)
		board[i] = new Array();

	initMobs();

	var actualFood = 0;
	
	for (var i = 0; i < rows; i++) {
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < columns; j++) {
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

				(i == 12 && j == 7) ||
				(i == 12 && j == 8) ||
				(i == 12 && j == 9) ||

				(i == 12 && j == 11) ||

				(i == 16 && j == 0) ||
				(i == 16 && j == 1) ||
				(i == 16 && j == 2) ||
				(i == 16 && j == 3) ||

				(i == 9 && j == 1) ||
				(i == 9 && j == 2) ||

				(i == 21 && j == 11) ||
				(i == 21 && j == 10) ||
				(i == 21 && j == 9) ||


				(i == 20 && j == 5) ||
				(i == 20 && j == 6) ||
				(i == 20 && j == 7) ||


				(i == 15 && j == 7) ||

				(i == 17 && j == 7) ||
				(i == 18 && j == 7) ||
				(i == 14 && j == 7) ||

				(i == 10 && j == 5) ||
				(i == 11 && j == 5) ||
				(i == 12 && j == 5) ||

				(i == 12 && j == 2) ||
				(i == 12 && j == 3) ||
				(i == 12 && j == 4) ||

				(i == 7 && j == 8) ||
				(i == 8 && j == 8) ||
				(i == 9 && j == 8) ||
				(i == 10 && j == 8) ||
				(i == 8 && j == 7) ||

				(i == 22 && j == 2) ||
				(i == 23 && j == 2) ||
				(i == 24 && j == 2) ||

				(i == 19 && j == 2) ||
				(i == 20 && j == 2) ||
				
				(i == 23 && j == 3) ||
				(i == 23 && j == 4) ||
				(i == 23 && j == 5) ||




				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				if (board[i][j] != 5) {
					var randomNum = Math.random();
					if (randomNum <= (1.0 * food_remain) / cnt) {
						food_remain--;
						board[i][j] = 0;
						actualFood++;
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

	var healthCell = findRandomEmptyCell(board);
	board[healthCell[0]][healthCell[1]] = 9;

	var mediumAmount = Math.floor(0.3 * actualFood);
	var largeAmount = Math.floor(0.1 * actualFood);
	var cell;

	for (var count = 0; count < mediumAmount; count++)
	{
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 11;
	}
	
	for (var count = 0; count < largeAmount; count++)
	{
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 111;
	}

	while (actualFood > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		actualFood--;
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
	interval2 = setInterval(moveMobs, 350);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (rows));
	var j = Math.floor(Math.random() * (columns));
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (rows));
		j = Math.floor(Math.random() * (columns));
	}
	return [i, j];
}

function findRandomFoodCell(board) {
	var i = Math.floor(Math.random() * (rows));
	var j = Math.floor(Math.random() * (columns));
	while (board[i][j] != 1) {
		i = Math.floor(Math.random() * (rows));
		j = Math.floor(Math.random() * (columns));
	}
	return [i, j];
}

function isKeyPressed() {

	if (keysDown[up] || keysDown[down] || keysDown[left] || keysDown[right]) 
		return true;

	return false;

}

function GetKeyPressed() {
	
	if (keysDown[up]) {
		lastKeyPressed = "up";
	}
	if (keysDown[down]) {
		lastKeyPressed = "down";
	}
	if (keysDown[left]) {
		lastKeyPressed = "left";
	}
	if (keysDown[right]) {
		lastKeyPressed = "right";
	}

	return lastKeyPressed;
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	healthLabel.value = health;
	lblTime.value = time_elapsed;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			var center = new Object();
			center.x = i * base_size + base_size/2;
			center.y = j * base_size + base_size/2;
			if (board[i][j] == 2) {
				var key = GetKeyPressed();
				context.beginPath();
				if (key == "left")
					context.arc(center.x, center.y, base_size/2, 1.15 * Math.PI, 0.85 * Math.PI); // half circle left
				else if (key =="right")
					context.arc(center.x, center.y, base_size/2, 0.15 * Math.PI, 1.85 * Math.PI); // half circle right
				else if (key =="up")
					context.arc(center.x, center.y, base_size/2, 0 * Math.PI, 2 * Math.PI); // half circle right
				else if (key =="down")
					context.arc(center.x, center.y, base_size/2, 0 * Math.PI, 2 * Math.PI); // half circle right


				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				if (key != "up" && key != "down")
					context.arc(center.x + base_size/12, center.y - base_size/4, base_size/15, 0, 2 * Math.PI); // circle
				if (key == "down")
				{
					context.arc(center.x + base_size/10, center.y - base_size/4, base_size/15, 0, 2 * Math.PI); // circle
					context.arc(center.x - base_size/10, center.y - base_size/4, base_size/15, 0, 2 * Math.PI); // circle
				}

				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();

			}
			else if (board[i][j] == 11) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = "purple"; //color
				context.fill();

			}
			else if (board[i][j] == 111) {
				context.beginPath();
				context.arc(center.x, center.y, 13, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();

			}

			else if (board[i][j] == 10) {
				context.beginPath();
				context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, 17, 0, 2 * Math.PI); // circle
				context.fillStyle = "white"; //color
				context.fill();
				context.moveTo(center.x-6, center.y-5);
				context.lineTo(center.x+6, center.y-5);
				context.moveTo(center.x, center.y-5);
				context.lineTo(center.x, center.y+8);
				context.strokeStyle="red";
				context.stroke()

			}

			else if (board[i][j] == 9) {
				context.beginPath();
				context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, 17, 0, 2 * Math.PI); // circle
				context.fillStyle = "white"; //color
				context.fill();
				context.moveTo(center.x-7, center.y);
				context.lineTo(center.x+7, center.y);
				context.moveTo(center.x, center.y-7);
				context.lineTo(center.x, center.y+7);
				context.strokeStyle="red";
				context.stroke()

			}
			else if (board[i][j] == 4) {
				base_image = new Image();
				base_image.src = './resources/wall.jpg';
				context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);
			}

			if (i == mob1.i && j == mob1.j)
				drawMob(context, center);


			if (mob2.i != -1)
				if (i == mob2.i && j == mob2.j)
					drawMob(context, center);

			if (mob3.i != -1)
				if (i == mob3.i && j == mob3.j)
					drawMob(context, center);

				if (mob4.i != -1)
					if (i == mob4.i && j == mob4.j)
						drawMob(context, center);
			
		}
	}
}

function drawMob(context, center)
{
	base_image = new Image();
	base_image.src = './resources/mob.jpg';
	context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);

	/*
	context.beginPath();
	context.rect(center.x - 30, center.y - 30, 60, 60);
	context.fillStyle = "red"; //color
	context.fill();
	*/
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
		else if (x == "down") {
			if (shape.j < columns-1 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		else if (x == "left") {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		else if (x == "right") {
			if (shape.i < rows-1 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
			}
		}
	}
	
	if (board[shape.i][shape.j] == 1) {
		score = score + 5;
		remainingBalls--;
	}
	if (board[shape.i][shape.j] == 11) {
		score = score + 15;
		remainingBalls--;
	}
	if (board[shape.i][shape.j] == 111) {
		score = score + 25;
		remainingBalls--;
	}



	if (board[shape.i][shape.j] == 9) {
		health++;
	}

	if (board[shape.i][shape.j] == 10) {
		gameTime = gameTime + 10;
	}

	if (checkMobsPlayerLocations())
	{
		score = score - 10;
		if (score < 0)
			score = 0;
		health--;
		var newCell = findRandomEmptyCell(board);
		shape.i = newCell[0];
		shape.j = newCell[1];
		initMobs();
	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if (timeBonusAvailable && ((gameTime-time_elapsed) <= 10)) {
		var timeBonusCell = findRandomEmptyCell(board);
		board[timeBonusCell[0]][timeBonusCell[1]] = 10;
		timeBonusAvailable = false;
	}

	if (health == 0) {
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.alert("Loser!");
	}

	else if (remainingBalls == 0)
	{
		window.clearInterval(interval);
		window.clearInterval(interval2);
		Draw();
		window.alert("Winner!");
	}

	else if (gameTime <= time_elapsed)
	{
		if (score < 100)
		{
			lblTime.value = gameTime;
			window.clearInterval(interval);
			window.clearInterval(interval2);
			window.alert("You are better than " + score + " points!");
		}
		else
		{
			window.clearInterval(interval);
			window.clearInterval(interval2);
			window.alert("Winner!");
		}

	}	
	 else {
		Draw();
	}
}

function checkMobsPlayerLocations()
{
	if (mob1.i == shape.i && mob1.j == shape.j)
		return true;

	if (mob2.i != -1 && mob2.i == shape.i && mob2.j == shape.j)
		return true;

	if (mob3.i != -1 && mob3.i == shape.i && mob3.j == shape.j)
		return true;

	if (mob4.i != -1 && mob4.i == shape.i && mob4.j == shape.j)
		return true;

	return false;

}

function initMobs()
{

	for (var i = 0; i < rows; i++)
		for (var j = 0; j < columns; j++)
			if (board[i][j] == 5)
				board[i][j] = 0;

	board[0][0] = 5;
	mob1.i = 0;
	mob1.j = 0;

	mob2.i = -1;
	mob3.i = -1;
	mob4.i = -1;

	if (maxMonsters > 1)
	{
		board[rows-1][columns-1] = 5;
		mob2.i = rows-1;
		mob2.j = columns-1;
	}
	
	if (maxMonsters > 2)
	{
		board[0][columns-1] = 5;
		mob3.i = 0;
		mob3.j = columns-1;
	}

	if (maxMonsters > 3)
	{
		board[rows-1][0] = 5;
		mob4.i = rows-1;
		mob4.j = 0;
	}
}

function moveMobs()
{
	moveMob(mob1);

	if (mob2.i != -1)
		moveMob(mob2);

	if (mob3.i != -1)
		moveMob(mob3);

	if (mob4.i != -1)
		moveMob(mob4);
}

function moveMob(mob)
{

	var randMove;
	var moved = false;
	tries = 0;

	while (!moved && tries < 10)
	{
		randMove = Math.floor(Math.random()*2);

		if (randMove == 0)
		{

			tries++;
			if (mob.i > 0 && board[mob.i - 1][mob.j] != 4 && mob.i > shape.i) {
				mob.i--;
				moved = true;
			}
		
			else if (mob.i < rows-1 && board[mob.i + 1][mob.j] != 4 && mob.i < shape.i) {
				mob.i++;
				moved = true;
			}
		}

		else
		{
			tries++;
			if (mob.j > 0 && board[mob.i][mob.j - 1] != 4 && mob.j > shape.j) {
				mob.j--;
				moved = true;
			}
		
			else if (mob.j < columns-1 && board[mob.i][mob.j + 1] != 4 && mob.j < shape.j) {
				mob.j++;
				moved = true;
			}
		}

		while (!moved)
		{
			var rnd = Math.floor(Math.random()*4);


			if (rnd == 0)
			{
				if (mob.i > 0 && board[mob.i - 1][mob.j] != 4)
					mob.i--;
					moved = true;
				}

			else if (rnd == 1)
			{
				if (mob.i < rows-1 && board[mob.i + 1][mob.j] != 4) 
					mob.i++;
					moved = true;
				}

			else if (rnd == 2)
			{
				if (mob.j > 0 && board[mob.i][mob.j - 1] != 4) 
					mob.j--;
					moved = true;

				}
			else
			{

				if (mob.j < columns-1 && board[mob.i][mob.j + 1] != 4) 
					mob.j++;
					moved = true;

			}







			

		}
	}


	if (mob.i == shape.i && mob.j == shape.j)
	{
		
	}


}