// Quiz questions
const questions = [
    // ... existing questions ...
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctChoice: 3
      },
      {
        question: "Commonly used data types DO Not Include: ",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctChoice: 1
      },
      {
        question: "The condition in an if / else statement is enclosed with ________. ",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctChoice: 2
      },
      // Add more questions here
    ]
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const gameOverScreen = document.getElementById('game-over-screen');
  
  const startBtn = document.getElementById('start-btn');
  const questionEl = document.getElementById('question');
  const choicesEl = document.getElementById('choices');
  const feedbackEl = document.getElementById('feedback');
  const timeLeftEl = document.getElementById('time-left');
  const scoreEl = document.getElementById('score');
  const initialsForm = document.getElementById('initials-form');
  const initialsInput = document.getElementById('initials');
  const resetBtn = document.getElementById('reset-btn');
  const scoreboardEl = document.getElementById('scoreboard');
  const resetScore = document.getElementById('reset-score');


  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerId;
  let scoreboardData = [];
  
  // Event listeners
  startBtn.addEventListener('click', startQuiz);
  choicesEl.addEventListener('click', handleChoice);
  initialsForm.addEventListener('submit', saveScore);
  resetBtn.addEventListener('click', resetQuiz);
  resetScore.addEventListener('click', resetScoreboard);

  // Start the quiz
  function startQuiz() {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    startTimer();
    showQuestion();
  }
  
  // Start the timer
  function startTimer() {
    timeLeftEl.textContent = timeLeft;
  
    timerId = setInterval(function () {
      timeLeft--;
      timeLeftEl.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Show a question
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    choicesEl.innerHTML = '';
  
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];
      const choiceBtn = document.createElement('button');
      choiceBtn.classList.add('choice');
      choiceBtn.textContent = choice;
      choicesEl.appendChild(choiceBtn);
    }
  }
  
  // Handle choice selection
  function handleChoice(event) {
    if (event.target.matches('.choice')) {
      const selectedChoiceIndex = Array.from(choicesEl.children).indexOf(event.target);
      const question = questions[currentQuestionIndex];
  
      if (selectedChoiceIndex === question.correctChoice) {
        score++;
        feedbackEl.textContent = 'Correct!';
      } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
          timeLeft = 0;
        }
        feedbackEl.textContent = 'Wrong!';
      }
  
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }
  }
  
  // End the quiz
  function endQuiz() {
    clearInterval(timerId);
    quizScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
  
    const totalQuestions = questions.length;
    const percentage = ((score / totalQuestions) * 100).toFixed(2);
    scoreEl.textContent = percentage + "%";
  
    // Save score to scoreboard data
    const initials = initialsInput.value.trim();
    if (initials !== ''){
    scoreboardData.push({ initials, score: percentage});
    }
    // Update scoreboard
    updateScoreboard();
  }
  
  // Save score to scoreboard
  function saveScore(event) {
    event.preventDefault();
    
    const initials = initialsInput.value.trim();
  if (initials === '') {
  alert('Please enter your initials.');
       return;
     }
  
    const percentage = score / questions.length;
    const formattedPercentage = (percentage * 100).toFixed(2) + "%";
    scoreboardData.push({ initials, score: formattedPercentage });
  
    // Update scoreboard
    updateScoreboard();
    
    initialsInput.value = ''; // Clear the initials input field
  }
  

  // Update scoreboard
  function updateScoreboard() {
    scoreboardEl.innerHTML = '';
  
    scoreboardData.forEach(data => {
      const item = document.createElement('li');
      const initials = data.initials.toUpperCase();
      item.textContent = `${initials}: ${data.score}`;
      scoreboardEl.appendChild(item);
    });
  }
  function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    initialsInput.value = '';
    initialsInput.disabled = false;
    startScreen.style.display = 'block';
    gameOverScreen.style.display = 'none';
  }
 function resetScoreboard() {

    scoreboardData = scoreboardData.filter(data => data.score === score);
    updateScoreboard();
 }

  
  
  
  
  
  
  