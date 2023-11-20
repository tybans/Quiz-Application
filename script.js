//accessing the elements
const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const optionsBox = document.querySelector(".options");
const nextBtn = document.querySelector(".btn");
const scoreCard = document.querySelector(".scoreCard")
const alert = document.querySelector(".alert");
const startBtn =document.querySelector(".startbtn")
const homeScreen = document.querySelector(".home");
const timer = document.querySelector(".timer");

// making an array to get questions, when we click on next question so it should change
// we will include questions, answers, and all choices in this array
//it will be an array of objects
const quiz = [
    {
        question:"Q1. Which one is the smallest ocean in the World?",
        options:["Indian", "Pacific", "Atlantic", "Arctic"],
        answer:"Arctic"
    },
    {
        question:"Q2. Which country gifted the ‘Statue of Liberty’ to USA in 1886?",
        options:["France", "Canada", "Brazil", "England"],
        answer:"France"
    },
    {
        question:"Q3. Dead Sea is located between which two countries?",
        options:["Jordan and Sudan", "Jordan and Israel", "Turkey and UAE", "UAE and Egypt"],
        answer:"Jordan and Israel"
    },
    {
        question:"Q4. In which ocean ‘Bermuda Triangle’ region is located?",
        options:["Indian", "Pacific", "Atlantic", "Arctic"],
        answer:"Atlantic"
    },
    {
        question:"Q5. Which country is known as the ‘playground of Europe’?",
        options:["Austria", "Holland", "Switzerland", "Italy"],
        answer:"Switzerland"
    },
    {
        question:"Q6. Which country is also known as the ‘Land of Rising Sun’?",
        options:["Japan", "New Zealand", "Fiji", "China"],
        answer:"Japan"
    },
    {
        question:"Q7. Which country is known as the ‘Land of Thunderbolts’?",
        options:["China", "Bhutan", "Mongolia", "Thailand"],
        answer:"Bhutan"
    },
    {
        question:"Q8. Which continent has the highest number of countries?",
        options:["Asia", "Europe", "North America", "Africa"],
        answer:"Africa"
    },
    {
        question:"Q9. In which country, white elephant is found?",
        options:["India", "Sri Lanka", "Thailand", "Malaysia"],
        answer:"Thailand"
    },
    {
        question:"Q10. Total number of oceans in the World is",
        options:["3", "5", "7", "12"],
        answer:"5"
    },
    {
        question:"Q11. Which country is also known as the ‘Land of Thousand Lakes’?",
        options:["Iceland", "Norway", "Finland", "Switzerland"],
        answer:"Finland"
    },
    {
        question:"Q12. Which country has the highest number of time zones?",
        options:["England", "France", "Russia", "China"],
        answer:"France"
    },
    {
        question:"Q13. The world’s longest straight road without any corners is located in?",
        options:["USA", "Australia", "Saudi Arabia", "China"],
        answer:"Saudi Arabia"
    },
    {
        question:"Q14. Which one is the biggest island in the World?",
        options:["Borneo", "Finland", "Sumatra", "Greenland"],
        answer:"Greenland"
    },
    {
        question:"Q15. In which year Hong Kong became a part of China after British Rule?",
        options:["1982", "1989", "1995", "1997"],
        answer:"1997"
    },
    {
        question:"Q16. Which one is the largest tropical rain forest in the world?",
        options:["Amazon", "Bosawas", "Southeast Asian Rain Forest", "Daintree Rain Forest"],
        answer:"Amazon"
    },
    {
        question:"Q17. Which one is the longest continental mountain range in the world?",
        options:["Himalaya", "Andes", "Rocky Mountains", "Ural Mountains"],
        answer:"Andes"
    },
    {
        question:"Q18. Mount Etna, one of the most active volcanos in the World is located in?",
        options:["Italy", "Japan", "Peru", "Fiji"],
        answer:"Italy"
    },
    {
        question:"Q19. Only continent in the world without a desert is _____?",
        options:["North America", "Asia", "Africa", "Europe"],
        answer:"Europe"
    },
    {
        question:"Q20. Which country has the most number of lakes?",
        options:["Canada", "USA", "Finland", "Brazil"],
        answer:"Canada"
    },
]

// making a variable that will maintain the questions index
let currentQuestionIndex = 0;

let score = 0;

let quizOver = false;

let timeLeft = 15;

let timerId = null;


// now preparing for our questions to bring on quiz
// selecting next button

// arrow functions to show questions
const showQuestions = () =>{
    // to check this function is making a call or not, i will check it by logging
    //console.log("question");

    // now to get questions
    const questionDetails = quiz[currentQuestionIndex];

    //questionbox: inside the text content of div of questionbox we will fetch only question
    questionBox.textContent = questionDetails.question;


    // making the optionbox empty before the for loop starts, because it will add the aoptions agaian and again 
    optionsBox.textContent = "";


    //to fetch 4 choices
    for(let i =0; i<questionDetails.options.length; i++){
        const currentOption = questionDetails.options[i];
        const optionDiv = document.createElement("div");
        optionDiv.textContent = currentOption;
        //making class for optionDiv
        optionDiv.classList.add("option-div")
        optionsBox.appendChild(optionDiv);


        optionDiv.addEventListener("click", () =>{
            if(optionDiv.classList.contains("selected")){
                optionDiv.classList.remove("selected");
            }
            else{
                optionDiv.classList.add("selected");
            }
        });
    }
    //console.log(questionDetails);

    //calling the timer function here
    if(currentQuestionIndex < quiz.length){
        startTimer();
    };
};
//calling the function here means it will show the questions and options without clicking the next
// showQuestions();


//function to check answer, using arrow function
const checkAnswer = () => {
    // taking a variable to check which option has been selected
    const selectedOption = document.querySelector(".option-div.selected");
    //console.log(selectedOption);

    //now checking the selected answer is right or wrong
    //so we will check text content of selectedoption
    if(selectedOption.textContent === quiz[currentQuestionIndex].answer){
        //alert("Correct Answer!!!");
        showAlert("Correct Answer!!!")
        score++;
    }
    else{
        //alert("Wrong Answer!")
        showAlert(`Wrong Answer!  "${quiz[currentQuestionIndex].answer}"  is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
        quizOver = true;
        timer.style.display = "none";
    }
}

//function to show score
const showScore = () => {
    // to clear questionBox and optionBox after the score generated
    //we want to show only score after the last question
    questionBox.textContent = "";
    optionsBox.textContent = "";

    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;

    showAlert(" Great! You have completed this Quiz!")


    //this will change the same but as "Play Again", when final score is shown
    nextBtn.textContent = "Play Again";
    // nextBtn.addEventListener("click", () => {
    //     currentQuestionIndex = 0;
    //     showQuestions();
    //     nextBtn.textContent = ("Next Question");
    //     scoreCard.textContent = "";
    // });
}


//creating a function to show alert
const showAlert = (msg) =>{

    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() =>{
        alert.style.display = "none";
    }, 2000);
}


//creating a function to start timer
const startTimer = () => {
    clearInterval(timerId)
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        

        if(timeLeft === 0){
            const confirmUser = confirm("Times Up! Do you want to continue?");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                homeScreen.style.display = "block";
                container.style.display = "none";
                return;
            };
        };
    };
    // setInterval function wil decrease the time by 1 sec repeatedly
    timerId = setInterval(countDown, 1000);
};


// creating a function to stop timer
const stopTimer = () => {
    clearInterval(timerId);
}


const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    showQuestions();
}

//adding eventlistener to start button
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    homeScreen.textContent = "";
    container.style.display = "block";
    startQuiz();
})

nextBtn.addEventListener("click", () =>{
    // calling a funcion that will show questions after we click on next button
    // showQuestions();

    const selectedOption = document.querySelector(".option-div.selected");
    if(!selectedOption && nextBtn.textContent === "Next Question"){
        //alert("Select your answer!")
        showAlert("Select your answer!")
        return;
    }
    // if(nextBtn.textContent === "Play Again"){
    //         //currentQuestionIndex = 0;
    //         nextBtn.textContent = "Next Question";
    //         scoreCard.textContent = "";
    //         showQuestions();
    // }
    if(quizOver){
        
        nextBtn.textContent = "Next Question";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        
        quizOver = false;
        score = 0;
        startQuiz();
}
    else{
        checkAnswer();
    }

    

    

});