const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Mardown Language",
    c: "Hyper Markup Language",
    d: "Hypertext  Language",
    correct: "a",
  },
  {
    question: "Which language the best easy?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "c",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const quesitonEl = document.getElementById("question");
const text_a = document.getElementById("text_a");
const text_b = document.getElementById("text_b");
const text_c = document.getElementById("text_c");
const text_d = document.getElementById("text_d");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  quesitonEl.innerText = currentQuizData.question;
  text_a.innerText = currentQuizData.a;
  text_b.innerText = currentQuizData.b;
  text_c.innerText = currentQuizData.c;
  text_d.innerText = currentQuizData.d;
};

const deselectAnswers = () => {
  answerEls.forEach((item) => (item.checked = false));
};

loadQuiz();

const getSelected = () => {
  let answerId;

  answerEls.forEach((item) => {
    if(item.checked) {
      answerId = item.id;
    }
  })
  return answerId;
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();

if (answer) {
  if(answer === quizData[currentQuiz].correct) {
    score++;
  }
  currentQuiz++;
  if(currentQuiz<quizData.length) {
    loadQuiz();
    startTimer();
  } else {
    quiz.innerHTML = `
    <h2>You answered correctly at ${score} / ${quizData.length} questions</h2>

    <button onClick='location.reload()'>Try Again</button>
    `
  }
}
})

//Counter section 

const quizCounter = document.querySelector('.quiz-counter');
let timer;

function startTimer() {
  let count = 0;

  clearInterval(timer);

  timer = setInterval(() => {
    quizCounter.innerText = count;
    count++;

    if(count>10) {
      clearInterval(timer);
      quizCounter.innerText = 'Time is up! Please answer the question.'
      setTimeout(() => {
        if(currentQuiz<quizData.length) {
          currentQuiz++;
          loadQuiz();
          startTimer();
        } 
        else {
          quiz.innerHTML = `
          <h2>You answered correctly at ${score} / ${quizData.length} questions</h2>
      
          <button onClick='location.reload()'>Try Again</button>
          `
        }
      },2000)
    }
  },1000)
}

window.addEventListener('load',startTimer);
