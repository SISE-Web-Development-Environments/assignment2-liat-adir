var context;
var shape = new Object();
var mob1 = new Object();
var mob2 = new Object();
var mob3 = new Object();
var mob4 = new Object();
var movingFood = new Object();
var movingFoodAlive = true;
var board;
var score;
var start_time;
var time_elapsed;
var timeLeft;
var interval;
var movingFoodInterval;
var mobsInterval;
var lastKeyPressed;
var maxMonsters;
var health;
var gameTime;
var food;
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
var remainingBalls = 0;
var audio = new Audio();
var users = {}
var names = {}
var keyUpChange = 38;
var keyDownChange = 40;
var keyLeftChange = 37;
var keyRightChange = 39;
var mobSpeed = "Medium";
var currentUserName;
var titleColors;
var shown = false;

$(document).ready(function() {

	disableScrollbarArrows();

	
	titleColors = ["White", "Red", "Orange", "Yellow", "Green", "Blue", "Pink", "Purple"];
	
	window.setInterval(colorTitle, 100);

	users['p'] = 'p';
	names['p'] = 'PPP';

	context = canvas.getContext("2d");

	$("#about").click(function ()
      {
		 $("#modalBox").show();


		 window.addEventListener('click', function(e){   

			  if (!(document.getElementById('about').contains(e.target) || document.getElementById('modalBox').contains(e.target)))
				  document.getElementById("modalBox").style.display = 'none';
			
		});

		$(document).keydown(function(event) { 
			if (event.keyCode == 27) { 
				document.getElementById("modalBox").style.display = 'none';
			}
		  });



	});

	  


	windows.clearInterval(colorTitle);

});

function closeAbout() {
	document.getElementById("modalBox").style.display = "none";
  }

function checkRegistrationFields()
{
	
	var reg_username = $("#Register_username").val();
	var reg_password = $("#Register_password").val();
	var reg_fullName = $("#Register_fullName").val();
	var reg_mail = $("#Register_mail").val();
	var reg_birthday = $("#Register_birthday").val();

	if (reg_username.trim() == "")
	{
		$("#lbl_username_error").html("Invalid");
		$("#lbl_username_error").css('color','Red');
		return false;
	}
	else
		$("#lbl_username_error").html("");


	if (reg_password == "" || reg_password.length < 6 || !hasLetters(reg_password) || !hasNumber(reg_password))
	{
		$("#lbl_password_error").html("Invalid");
		$("#lbl_password_error").css('color','Red');
		return false;
	}
	else
		$("#lbl_password_error").html("");

	if (reg_fullName.trim() == "" || hasNumber(reg_fullName))
	{
		$("#lbl_fullName_error").html("Invalid");
		$("#lbl_fullName_error").css('color','Red');
		return false;
	}
	else
		$("#lbl_fullName_error").html("");

	if (reg_mail.trim() == "" || !isValidMail(reg_mail))
	{
		$("#lbl_mail_error").html("Invalid");
		$("#lbl_mail_error").css('color','Red');
		return false;
	}
	else
		$("#lbl_mail_error").html("");	

	if (reg_birthday.trim() == "")
	{
		$("#lbl_birthday_error").html("Invalid");
		$("#lbl_birthday_error").css('color','Red');
		return false;
	}
	else
		$("#lbl_birthday_error").html("");

	return true;


}

$( function() {

	$( "#Register_birthday" ).datepicker({ dateFormat: 'dd.mm.yy' , maxDate: new Date()});
  } );

function hasNumber(str)
{
	var code, i, len;
  
	for (i = 0, len = str.length; i < len; i++) {
	  code = str.charCodeAt(i);
	  if (code > 47 && code < 58)
		return true;
	
	}

	return false;

}

function hasLetters(str)
{
	var code, i, len;
  
	for (i = 0, len = str.length; i < len; i++) {
	  code = str.charCodeAt(i);
	  if ((code > 64 && code < 91) || (code > 96 && code < 123))
		return true;
	
	}

	return false;

}

function isValidMail(email)
{
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

  function isAlphabetic(str) {
	var code, i, len;
  
	for (i = 0, len = str.length; i < len; i++) {
	  code = str.charCodeAt(i);
	  if (!(code > 47 && code < 58) && // numeric (0-9)
		  !(code > 64 && code < 91) && // upper alpha (A-Z)
		  !(code > 96 && code < 123)) { // lower alpha (a-z)
		return false;
	  }
	}
	return true;
  };

function shiftTitleColors()
{
	var col = titleColors[7];

	for (var i = 7; i > 0; i--)
		titleColors[i] = titleColors[i-1];

	titleColors[0] = col;
}

function colorTitle()
{
	document.getElementById("lbl_p").innerHTML = "<font color='" + titleColors[0] + "'>" + "P" + "</font>";
	document.getElementById("lbl_a1").innerHTML = "<font color='" + titleColors[1] + "'>" + "a" + "</font>";
	document.getElementById("lbl_c").innerHTML = "<font color='" + titleColors[2] + "'>" + "c" + "</font>";
	document.getElementById("lbl_o1").innerHTML = "<font color='" + titleColors[3] + "'>" + "o" + "</font>";
	document.getElementById("lbl_r").innerHTML = "<font color='" + titleColors[4] + "'>" + "r" + "</font>";
	document.getElementById("lbl_o2").innerHTML = "<font color='" + titleColors[5] + "'>" + "o" + "</font>";
	document.getElementById("lbl_n").innerHTML = "<font color='" + titleColors[6] + "'>" + "n" + "</font>";
	document.getElementById("lbl_a2").innerHTML = "<font color='" + titleColors[7] + "'>" + "a" + "</font>";

	shiftTitleColors();

}

function startGame()
{


	if(initOptions())
	{
		initBoardSettings();
		hideAllBut("pacman_gameDiv");
		playAudio();
		Start();
	}


	

}

function disableScrollbarArrows()
{
	window.addEventListener("keydown", function(e) {
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	}, false);
}

function initBoardSettings()
{

	document.getElementById("keyUpOptionsLabel").innerHTML = document.getElementById("keyUpLabel").innerHTML;
	document.getElementById("keyDownOptionsLabel").innerHTML = document.getElementById("keyDownLabel").innerHTML;
	document.getElementById("keyLeftOptionsLabel").innerHTML = document.getElementById("keyLeftLabel").innerHTML;
	document.getElementById("keyRightOptionsLabel").innerHTML = document.getElementById("keyRightLabel").innerHTML;

	document.getElementById("numOfBalls").innerHTML = food;
	document.getElementById("smallCol").innerHTML = "<font color='" + smallBallColor + "'>" + smallBallColor + "</font>";
	document.getElementById("mediumCol").innerHTML =  "<font color='" + mediumBallColor + "'>" + mediumBallColor + "</font>";
	document.getElementById("largeCol").innerHTML =  "<font color='" + largeBallColor + "'>" + largeBallColor + "</font>";
	document.getElementById("numOfMobs").innerHTML = maxMonsters;
	document.getElementById("speedOfMobs").innerHTML = mobSpeed;
	var song = document.getElementById("song").value;
	if (song == "golddigger")
		document.getElementById("songLabel").innerHTML = "Gold Digger";
	else
		document.getElementById("songLabel").innerHTML = "Baby Shark";

	document.getElementById("usernameLabel").innerHTML = currentUserName;

}

function initOptions()
{
	var time = document.getElementById("timeChosen").value;
	var isNumber = time.match(/^[0-9]+$/) != null;

	if (!isNumber || time < 60)
	{
		alert("Time field is invalid or less than 60 seconds");
		return false;
	}
	else
	{
		var smallBall = document.getElementById("smallBallsColor").value;
		var mediumBall = document.getElementById("mediumBallsColor").value;
		var largeBall = document.getElementById("largeBallsColor").value;

		if (smallBall == mediumBall || smallBall == largeBall || mediumBall == largeBall)
		{
			alert("Balls colors must be different");
			return false;
		}
		else
		{
			gameTime = time;
			timeLeft = time;

			smallBallColor = smallBall;
			mediumBallColor = mediumBall;
			largeBallColor = largeBall;

			up = keyUpChange;
			down = keyDownChange;
			left = keyLeftChange;
			right = keyRightChange;
		
			mobSpeed = document.getElementById("mobSpeed").value;

			food = document.getElementById("ballsNumber").value;
	
			maxMonsters = document.getElementById("mobsNumber").value;

			return true;
		}

		
	}






}

function playAudio()
{
	var audioChosen = document.getElementById("song").value;

	if (audioChosen == "golddigger")
		audio.src = "./resources/golddigger.mp3";
	else
		audio.src = "./resources/babyshark.mp3";

	audio.loop = true;
	audio.play();
}


function changeKey(op) {
	var label;
	var div;

	if (op == 'up')
	{
		label = document.getElementById("keyUpLabel");
		div = document.getElementById("keyUpDiv")
	}

	else if (op == 'down')
	{
		label = document.getElementById("keyDownLabel");
		div = document.getElementById("keyDownDiv")

	}

	else if (op == 'left')
	{
		label = document.getElementById("keyLeftLabel");
		div = document.getElementById("keyLeftDiv")

	}

	else
	{
		label = document.getElementById("keyRightLabel");
		div = document.getElementById("keyRightDiv")

	}

	div.style.backgroundColor="#66FF66";

	$("#keyUpDiv").css('pointer-events','none');
	$("#keyDownDiv").css('pointer-events','none');
	$("#keyLeftDiv").css('pointer-events','none');
	$("#keyRightDiv").css('pointer-events','none');


	addEventListener('keydown', function(event) {
		const key = event.keyCode; 

	while (key == "undefined");

	this.removeEventListener('keydown',arguments.callee,false);	
	
	if (key == 32)
		alert("Space is not a valid key");
	else
		label.innerHTML = event.key;

	$("#keyUpDiv").css('pointer-events','');
	$("#keyDownDiv").css('pointer-events','');
	$("#keyLeftDiv").css('pointer-events','');
	$("#keyRightDiv").css('pointer-events','');

	div.style.backgroundColor="white";

	if (op == 'up')
		keyUpChange = key;

	else if (op == 'down')
		keyDownChange = key;

	else if (op == 'left')
		keyLeftChange = key;

	else
		keyRightChange = key;


	});
	

}

function hideAllBut(except)
{
	document.getElementById("loginDiv").style.display = "none";
	document.getElementById("optionsDiv").style.display = "none";
	document.getElementById("registerDiv").style.display = "none";
	document.getElementById("pacman_gameDiv").style.display = "none";
	document.getElementById("welcomeDiv").style.display = "none";


	document.getElementById(except).style.display = "block";

}

function login()
{	

	var username = document.getElementById("Login_username").value;
	var password = document.getElementById("Login_password").value;

	if (users[username] == password)
	{
		currentUserName = names[username];
		hideAllBut("optionsDiv");
	}
	
	else
		alert("Username or Password incorrect");

}

function register()
{

	if(checkRegistrationFields())
	{

		var username = document.getElementById("Register_username").value;
		var password = document.getElementById("Register_password").value;
		var fullName = document.getElementById("Register_fullName").value;
		var mail = document.getElementById("Register_mail").value;
		var birthday = document.getElementById("Register_birthday").value;
	
		
		if (users[username] != undefined)
			alert("Username already exists");
		else
		{
			users[username] = password;
			names[username] = fullName;
	
			alert("Registraion succeed");
			hideAllBut("welcomeDiv");
	
			document.getElementById("Register_username").value = "";
			document.getElementById("Register_password").value = "";
			document.getElementById("Register_fullName").value = "";
			document.getElementById("Register_mail").value = "";
			document.getElementById("Register_birthday").value = "";
			
			$("#lbl_username_error").html("");
			$("#lbl_mail_error").html("");
			$("#lbl_fullName_error").html("");
			$("#lbl_mail_error").html("");

	}


	}
}




// 4 - Walls
// 1 - Food (+5, 60%), small green
// 11 - Food (+15, 30%), medium purple
// 111 - Food (+25, 10%), large blue
// 2 - Pacman start point
// 0 - Pass
// 5 - monster
// 9 - health (+1 life)
// 10 - timeBonus (+10)
// 7 - moving food (+50 score)

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

	timeLeft = gameTime;
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
		food = ballsNumber;
	else
		food = 70;
}

function randomizeValues()
{
	var colors = ["Red", "Green", "Blue", "Black", "Purple", "Yellow"];
	var used = [0,0,0,0,0,0];

	var rndTime = Math.floor(Math.random()*60+61); // between 60 and 120
	var rndBallsNumber = Math.floor(Math.random()*40+51);
	var rndMobs = Math.floor(Math.random()*4 + 1);

	var rndBallsColors = new Array();

	var rndColor = Math.floor(Math.random()*5);

	for (var i = 0; i < 3; i++)
	{
		while (used[rndColor] == 1)
			rndColor = Math.floor(Math.random()*6);

		rndBallsColors[i] = colors[rndColor];
		used[rndColor] = 1;
	}

	var song = Math.floor(Math.random()*2);
	var songRand;

	if (song == 0)
		songRand = "golddigger";
	else
		songRand = "babyshark";

	var rndSpeed = Math.floor(Math.random()*3) + 1;
	mobSpeed = rndSpeed;

	maxMonsters = rndMobs;
	gameTime = rndTime;
	timeLeft = rndTime;
	food = rndBallsNumber;
	smallBallColor = rndBallsColors[0];
	mediumBallColor = rndBallsColors[1];
	largeBallColor = rndBallsColors[2];

	document.getElementById("smallBallsColor").value = smallBallColor;
	document.getElementById("mediumBallsColor").value = mediumBallColor;
	document.getElementById("largeBallsColor").value = largeBallColor;

	document.getElementById("mobsNumber").value = maxMonsters;
	document.getElementById("ballsNumber").value = food;
	document.getElementById("song").value = songRand;
	document.getElementById("timeChosen").value = gameTime;
	document.getElementById("mobSpeed").value = mobSpeed;
}

function Start() {
	board = new Array();
	score = 0;
	timeBonusAvailable = true;
	lastKeyPressed = "down";
	var cnt = 100;
	var pacman_remain = 1;
	health = 5;
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
					if (randomNum <= (1.0 * food) / cnt) {
						food--;
						board[i][j] = 0;
						actualFood++;
					} else if (randomNum < (1.0 * (pacman_remain + food)) / cnt) {
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

	initMovingFood();


	var healthCell = findRandomEmptyCell(board);
	board[healthCell[0]][healthCell[1]] = 9;

	var mediumAmount = Math.floor(0.3 * actualFood);
	var largeAmount = Math.floor(0.1 * actualFood);
	var cell;

	for (var count = 0; count < mediumAmount; count++)
	{
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 11;
		remainingBalls++;
	}
	
	for (var count = 0; count < largeAmount; count++)
	{
		cell = findRandomEmptyCell(board);
		board[cell[0]][cell[1]] = 111;
		remainingBalls++;
	}

	while (actualFood > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		actualFood--;
		remainingBalls++;
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
	movingFoodInterval = setInterval(moveMovingFood, 200);


	if (mobSpeed == "2")
		mobsInterval = setInterval(moveMobs, 300);

	else if (mobSpeed == "1")
		mobsInterval = setInterval(moveMobs, 400);

	else
		mobsInterval = setInterval(moveMobs, 200);

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
	document.getElementById("lblScore").innerHTML = score;
	document.getElementById("lblTime").innerHTML = timeLeft.toFixed(2);
	document.getElementById("healthLabel").innerHTML = health;

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			var center = new Object();
			center.x = i * base_size + base_size/2;
			center.y = j * base_size + base_size/2;
			if (board[i][j] == 2) {
				var key = GetKeyPressed();
				context.beginPath();
				if (key == "left")
				{
					base_image = new Image();
					base_image.src = './resources/left.jpg';
					context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);
				}
				else if (key =="right")
				{
					base_image = new Image();
					base_image.src = './resources/right.jpg';
					context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);
				}
				else if (key =="up")
				{
					base_image = new Image();
					base_image.src = './resources/back.jpg';
					context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);
				}
				else if (key =="down")
				{
					base_image = new Image();
					base_image.src = './resources/front.jpg';
					context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);
				}


			} else if (board[i][j] == 1) {
				base_image = new Image();
				base_image.src = './resources/' + smallBallColor + '.jpg';
				context.drawImage(base_image, center.x - base_size/6, center.y - base_size/6, base_size/3, base_size/3);

			}
			else if (board[i][j] == 11) {
				base_image = new Image();
				base_image.src = './resources/' + mediumBallColor + '.jpg';
				context.drawImage(base_image, center.x - base_size/4, center.y - base_size/4, base_size/2, base_size/2);

			}
			else if (board[i][j] == 111) {
				base_image = new Image();
				base_image.src = './resources/' + largeBallColor + '.jpg';
				context.drawImage(base_image, center.x - base_size/3, center.y - base_size/3, base_size*2/3, base_size*2/3);

			}

			else if (board[i][j] == 10) {
				base_image = new Image();
				base_image.src = './resources/hourglass.jpg';
				context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);

			}

			else if (board[i][j] == 9) {

				base_image = new Image();
				base_image.src = './resources/doctor.jpg';
				context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);

			}
			else if (board[i][j] == 4) {
				base_image = new Image();
				base_image.src = './resources/wall.jpg';
				context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);
			}

			if (movingFoodAlive && i == movingFood.i && j == movingFood.j)
				drawMovingFood(context, center);

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

}

function drawMovingFood(context, center)
{
	base_image = new Image();
	base_image.src = './resources/movingFood.jpg';
	context.drawImage(base_image, center.x - base_size/2, center.y - base_size/2, base_size, base_size);

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

	if (movingFoodAlive && checkMovingFoodPlayerLocation())
	{
		score = score + 50;
		movingFoodAlive = false;
		window.clearInterval(movingFoodInterval);
	}


	if (board[shape.i][shape.j] == 9) {
		health++;
	}

	if (board[shape.i][shape.j] == 10) {
		gameTime = parseFloat(gameTime) + 10;
		timeLeft = parseFloat(timeLeft) + 10;
	}

	if (checkMobsPlayerLocations())
	{
		board[shape.i][shape.j] = 0;
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
	timeLeft = timeLeft - 0.1;

	if (timeBonusAvailable && (timeLeft <= 10)) {
		var timeBonusCell = findRandomEmptyCell(board);
		board[timeBonusCell[0]][timeBonusCell[1]] = 10;
		timeBonusAvailable = false;
	}

	if (health == 0) {
		window.clearInterval(interval);
		window.clearInterval(mobsInterval);
		window.clearInterval(movingFoodInterval);
		window.alert("Loser!");
		audio.src = "";
	}

	else if (remainingBalls == 0)
	{
		window.clearInterval(interval);
		window.clearInterval(mobsInterval);
		window.clearInterval(movingFoodInterval);
		Draw();
		window.alert("Winner!");
		audio.src = "";

	}

	else if (timeLeft <= 0)
	{
		document.getElementById("lblTime").innerHTML = "0.00";

		if (score < 100)
		{
			window.clearInterval(interval);
			window.clearInterval(mobsInterval);
			window.clearInterval(movingFoodInterval);
			window.alert("You are better than " + score + " points!");
			audio.src = "";

		}
		else
		{
			window.clearInterval(interval);
			window.clearInterval(mobsInterval);
			window.clearInterval(movingFoodInterval);
			window.alert("Winner!");
			audio.src = "";

		}

	}	
	 else {
		Draw();
	}
}

function checkMovingFoodPlayerLocation()
{
	if (movingFood.i == shape.i && movingFood.j == shape.j)
		return true;

	return false;
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

function initMovingFood()
{
	var emptyCell = findRandomEmptyCell(board);
	movingFood.i = emptyCell[0];
	movingFood.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 7;
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

function moveMovingFood()
{
	var moved = false;
	var rnd;


	while (!moved)
	{
		rnd = Math.floor(Math.random()*4);


		if (rnd == 0)
		{
			if (movingFood.i > 0 && board[movingFood.imovingFood- 1][movingFood.j] != 4)
				movingFood.i--;
				moved = true;
			}

		else if (rnd == 1)
		{
			if (movingFood.i < rows-1 && board[movingFood.i + 1][movingFood.j] != 4) 
				movingFood.i++;
				moved = true;
			}

		else if (rnd == 2)
		{
			if (movingFood.j > 0 && board[movingFood.i][movingFood.j - 1] != 4) 
				movingFood.j--;
				moved = true;

			}
		else
		{

			if (movingFood.j < columns-1 && board[movingFood.i][movingFood.j + 1] != 4) 
				movingFood.j++;
				moved = true;

		}


	}

	if (movingFood.i == shape.i && movingFood.j == shape.j)
	{
		score = score + 50;
		movingFoodAlive = false;
		window.clearInterval(movingFoodInterval);
	}


}

function showAbout()
{
	document.getElementById("modalBox").style.display = "block";
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
		board[shape.i][shape.j] = 0;
		score = score - 10;
		if (score < 0)
			score = 0;
		health--;
		var newCell = findRandomEmptyCell(board);
		shape.i = newCell[0];
		shape.j = newCell[1];
		initMobs();
	}


}