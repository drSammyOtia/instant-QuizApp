const questions = [
    {
        question: 'What is the capital city of Kenya?',
        answers: [
            { Text: 'New York', correct: false},
            { Text: 'Zanzibar', correct: false},
            { Text: 'Nairobi', correct: true},
            { Text: 'Addis Ababa', correct: false},
        ]
    },
    {
        question: 'Which Country in Africa is rich In Gold?',
        answers: [
            { Text: 'South Africa', correct: true},
            { Text: 'Zanzibar', correct: false},
            { Text: 'Kenya', correct: false},
            { Text: 'Nigeria', correct: false},
        ]
    },
    {
        question: 'What is the Capital city of America?',
        answers: [
            { Text: 'New York', correct: true},
            { Text: 'Zanzibar', correct: false},
            { Text: 'Nairobi', correct: true},
            { Text: 'Addis Ababa', correct: false},
        ]
    },
    {
        question: 'What is the largest mountain in the world?',
        answers: [
            { Text: 'Mt Nebo', correct: false},
            { Text: 'Mt Antlas', correct: false},
            { Text: 'Mt kilimanjaro', correct: false},
            { Text: 'Mt ernest', correct: true},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){  //start the function
    currentQuestionIndex = 0; // reset the current question to 0
    score = 0; // reset score to 0
    nextButton.innerHTML = 'Next'; // At the end will replay
    showQuestion(); //Call this function to start again and reset everything as above
}

// Create the showQuestion function to continue playing and add scoresd
 function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; //we used bracket notation to call the function coz we reassign
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ", " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
 }

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == 'true'){
            button.classList.add('correct');
        }
        button.disabled = 'true';
    });
    nextButton.style.display = 'block';

}

function showScore(){
    resetState();
    questionElement.innerHTML = 'Your score is &{score} out of ${questions.lenght}!';
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();