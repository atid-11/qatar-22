class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}
let questions = [
  new Question(
    "Who will host the world cup 2022 tournament",
    ["France", "Qatar", "Tunisia", "Japan"],
    "Qatar"
  ),
  new Question(
    "who is the most successful football team in the world cup",
    ["Argentina", "Tunisia", "Brazil", "Germany"],
    "Brazil"
  ),
  new Question(
    "when was the first world cup football tournament",
    ["1930", "1890", "1934", "1945"],
    "1930"
  ),
  new Question(
    "who is the current champion of the FIFA World cup",
    ["Spain", "croitia", "brazil", "france"],
    "france"
  ),
  new Question(
    "where was the first world cup football tournament",
    ["Mexico", "Uruguay", "England", "Tunisia"],
    "Uruguay"
  ),
  new Question(
    "Who is the winner of the first world cup football tournament",
    ["Mexico", "Uruguay", "England", "Tunisia"],
    "Uruguay"
  ),
  new Question(
    "How many times Brazil won the world cup football tournament",
    ["3", "4", "5", "6"],
    "5"
  ),
  new Question(
    "How many times Germany won the world cup football tournament",
    ["3", "4", "5", "6"],
    "4"
  ),
  new Question(
    "How many times Argentina won the world cup football tournament",
    ["1", "2", "3", "4"],
    "2"
  ),
  new Question(
    "how many times has tunisia qualified for the world cup football tournament",
    ["4", "7", "5", "6"],
    "5"
  ),
  new Question(
    "who is the world cup top scorer",
    ["Miroslav Klose", "Mario Gomez", "Phillip Lahm", "Cristiano ronaldo"],
    "Miroslav Klose"
  ),
  new Question(
    "how many goals did miroslav klose score in the world cup",
    ["12", "27", "20", "16"],
    "16"
  ),
  new Question(
    "how many goals does messi have in world cup history",
    ["6", "7", "4", "12"],
    "6"
  ),
];

console.log(questions);

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Regroup all  functions relative to the App Display
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function () {
    endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    // display choices and handle guess
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown(
      "progress",
      "Question " + currentQuestionNumber + " sur " + quiz.questions.length
    );
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};
// Create Quiz
let quiz = new Quiz(questions);
quizApp();

console.log(quiz);
