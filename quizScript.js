var main = function() {
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Define Variables
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// An array of objects that hold all the question information.
	var allQuestions = [
		{	question: "1) Who is Prime Minister of the United Kingdom?", correctAnswer: "A", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png",
			options: ["A) David Cameron", "B) Gordon Brown", "C) Winston Churchill", "D) Tony Blair"], choice: ""},
		{	question: "2) In the children's book series, where is Paddington Bear originally from?", correctAnswer: "B", image: "http://www.yottoy.com/images/large/toy/paddingtonbear.jpg",
			options: ["A) India", "B) Peru", "C) Canada", "D) Iceland"], choice: ""},
		{	question: "3) \"Nephelococcygia\" is the practice of doing what?",	correctAnswer: "A", image: "http://granitegrok.com/wp-content/uploads/2013/07/Question-Mark.jpg",
			options: ["A) Finding shapes in clouds", "B) Sleeping with your eyes open", "C) Breaking glass with your voice", "D) Swimming in freezing water"], choice: ""},
		{	question: "4) Which insect shorted out an early supercomputer and inspired the term \"computer bug\"?", correctAnswer: "A", image: "http://www.peimag.com/wp-content/uploads/2015/05/supercomputers.jpg",
			options: ["A) Moth","B) Roach","C) Fly","D) Japanese beetle"], choice: ""},
		{	question: "5) Which of the following men does not have a chemical element named for him?",	correctAnswer: "C", image: "http://www.ptable.com/Images/periodic%20table.png",
			options: ["A) Albert Einstein", "B) Niels Bohr", "C) Isaac Newton", "D) Enrico Fermi"], choice: ""}];
	
	// We initialize a variable that tracks the question number.
	var questionNumber = 1;
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Initialize UI
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// The try again button was created in HTML but will hide until the end of the quiz.
	$('.tryAgain').hide();
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Defining Functions and Callback Functions
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// Purpose: Allows clicking near the radio buttons to also trigger a selection of 
	// the radio button.
	var checkRadioBox = function() {
		var radioElement;
	
		if (this.firstChild.nodeType == 1) {
			radioElement = this.firstChild
		} else {
			radioElement = this.firstChild.nextSibling;
		}
		radioElement.checked = "checked";
	};
	
	// Purpose: Brings to the screen new questions and choices for the user to choose from.
	// Clicking near the radio box will now cause the radio box to be checked.
	var displayNewQuestions = function(questionNumber) {
		//Get the image.
		document.getElementById("questionImage").src=allQuestions[questionNumber-1].image;
		//Get the question.
		document.getElementById("quizQuestion").innerHTML=allQuestions[questionNumber-1].question;
		//Get the answer choices.
		document.getElementById("aLabel").innerHTML=allQuestions[questionNumber-1].options[0];
		document.getElementById("bLabel").innerHTML=allQuestions[questionNumber-1].options[1];
		document.getElementById("cLabel").innerHTML=allQuestions[questionNumber-1].options[2];
		document.getElementById("dLabel").innerHTML=allQuestions[questionNumber-1].options[3];
	};
	// Set up initial questions
	displayNewQuestions(1);	

	// Purpose: Stores the choice made by the user and unchecks the radio button.
	var storeAnswerChoiceAndUncheck = function(questionNumber) {
		var radios = form1.answerChoice;
		var currentQuestion = allQuestions[questionNumber-1]
		for (var index = 0; index < radios.length; index++) {
			if (radios[index].checked) {
				//If checked then store the user's answer choice in property "choice"
				currentQuestion.choice = radios[index].value;
				radios[index].checked = "";
			}
		}
	};
	
	// Purpose: The final message to the user.  It shows how well they did on the quiz.
	var displayScoringMessage = function() {
		var numberRight = 0;
		var scoringMessage;
		for (var index = 0; index < allQuestions.length; index++) {
			if (allQuestions[index].correctAnswer == allQuestions[index].choice) {
				numberRight++;
			}
		} 
		
		$('#questionImage').hide();
		$('.choice').hide();
		$('.btn').hide();
		if (numberRight != allQuestions.length) {
			scoringMessage = "Thank you for taking the quiz!  You got " + numberRight + " out of " + allQuestions.length + " correct!";
			$('.tryAgain').show();
		}
		else {
			scoringMessage = "Thank you for taking the quiz!  You got " + numberRight + " out of " + allQuestions.length + " correct!  Congratulations!";
		}
		document.getElementById("quizQuestion").innerHTML=scoringMessage;
	};
	
	// Purpose: Find out if a radio button has been chosen.  
	// The quiz won't let you continue until a radio button is chosen.
	var hasCheckedABox = function() {
		var radios = form1.answerChoice;
		for (var index = 0; index < radios.length; index++) {
			if (radios[index].checked) {
				//If checked then store the user's answer choice in property "choice"
				return true;
			}
		}
		return false;
	};
	
	// Purpose: Callback function for clicking on the "Next" button.
	// Calls four of the five functions defined above: 
	// hasCheckedABox(), storeAnswerChoiceAndUncheck(), displayNewQuestions(), and displayScoringMessage().
	var buttonClickEvent = function() {
		if (hasCheckedABox() == true) {
			if (questionNumber < allQuestions.length) {
				document.getElementById("completionProgress").value++
				storeAnswerChoiceAndUncheck(questionNumber);
				questionNumber++;
				displayNewQuestions(questionNumber);
				
			} else { //Finished with all questions
				document.getElementById("completionProgress").value = allQuestions.length;
				storeAnswerChoiceAndUncheck(questionNumber);
				displayScoringMessage()
				//put scoring here
			}
		} else {
			alert('Please select an answer');
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// jQuery listener events
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// Clicking on the "Next" button.
	$('.btn').on('click',buttonClickEvent);
	// Check the radio button if clicked near it.
	$('.choice').on("click",checkRadioBox);	
	// Try again button
	$('.tryAgain').click(function() {
		location.reload();
	});	
};

// jQuery used to call the main function from line 1.
$(document).ready(main);