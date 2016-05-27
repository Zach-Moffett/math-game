$(document).ready(function() {
	var digit1 = 0;
	var digit2 = 0;
	var answer = 0;
	var timer = 0;
	var incorrect = 2;
	var score = 0;
	var operators = [

	function(a, b) {
		return [a + b, '+'];
	}, function(a, b) {
		return [a - b, '-'];
	}, function(a, b) {
		return [a * b, 'x'];
	}];

	function getQuestion() {
		digit1 = Math.floor((Math.random() * 10) + 1)
		digit2 = Math.floor((Math.random() * 10) + 1)
		var opRand = Math.floor(Math.random() * operators.length);
		var opp = operators[opRand](digit1, digit2);
		answer = opp[0];
		var operator = opp[1];
		$('#theQuestion').html(digit1 + ' ' + operator + ' ' + digit2);
	}

	function gameOver() {
		$('#gameOver').html('Final Score ' + score)
		clearInterval(timer)
		$('#gameOver').html('GAME OVER<BR>FINAL SCORE: ' + score)
		$('#gameOverContainer').show();
	}

	function wrong() {
		incorrect--;
		$('#incorrect').append('X')
	}

	function startTimer() {
		timer = setInterval(function() {
			console.log(incorrect);
			if (incorrect == 0) {
				gameOver()
			} else {
				wrong()
				clearInterval(timer);
				getQuestion()
				startTimer()
			}
		}, 3000);
	}
	$('#submitAnswer').on('click', function() {
		var userAnswer = $('#userInput').val();
		console.log(incorrect)
		if (userAnswer == answer) {
			score++;
			clearInterval(timer);
			getQuestion()
			startTimer();
		} else {
			if (incorrect == 0) {
				gameOver()
			} else {
				wrong()
				clearInterval(timer);
				getQuestion()
				startTimer();
			}
		}
		$('#userInput').val('').focus();
	})
	$('#userInput').keydown(function(event) {
		if (event.keyCode == 13) {
			$('#submitAnswer').trigger('click');
		}
	});
	$('#playAgain').on('click', function() {
		$('#gameOverContainer').hide();
		$('#incorrect').html('');
		incorrect = 2;
		score = 0;
		clearInterval(timer);
		getQuestion()
		startTimer()
	});
	$('#userInput').focus();
	getQuestion();
	startTimer();
});