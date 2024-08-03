const questions = [        //will make a separate javascript file for this one this is just for the development time...
    {
        question:"who are you ?",
        answer:[
            {text:"i'm batman !",result:"false"},
            {text:"i'm iron man !",result:"false"},
            {text:"i'm steve rogers !" ,result:"true"},
            {text:"i'm groot !",result:"false"}
        ]
    },
    {
        question:"one number ?",
        answer:[
            {text:"a !",result:"false"},
            {text:"d !",result:"false"},
            {text:"1" ,result:"true"},
            {text:"j",result:"false"}
        ]
    },
    {
        question:"why do i live ?",
        answer:[
            {text:"to eat",result:"false"},
            {text:"to sleep",result:"false"},
            {text:"to relax" ,result:"false"},
            {text:"all of these",result:"true"}
        ]
    },
]

const questionDetails = document.getElementById("questions");
const options = document.getElementById("answerButton");
const submit = document.getElementById("nextBtn");


// console.log(questionDetails);
// console.log(options); 
// console.log(submit);   i was testing !!


let currentQuestionIndexNumber = 0; // for keeping  a record of index or number of questions 
let score = 0; // im mean without it whats the fun


function startQuiz(){
    // have to make a reset state function here so that it can clear out previous questions before showing the next one ----------------------
         // its here !
    currentQuestionIndexNumber = 0;
    score = 0;
    submit.innerHTML="next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndexNumber];
    let questionNo = currentQuestionIndexNumber + 1;
    questionDetails.innerHTML = questionNo + ". " + currentQuestion.question;
            // the above one will bw for questions which will show the question with its index number 
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        options.appendChild(button);
            // and this one is for options we are going to show in the page according to the data set which 
            //we will be rendering from our dictionary above
        if(answer.result){
            button.dataset.result = answer.result;
        }
            //have to add a click function so that we can run a specific function after clicking on any of the given options
            button.addEventListener("click",response);
        
    });
}

function resetState(){
    submit.style.display="none";
    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
}
function response(e){
    const selectedButton = e.target;        //it will target the selected button element naming selectedButton
    const correctAns = selectedButton.dataset.result === "true"; // it will check the data elements for a specific set of data for results
    
    // now it will check whether the selected element is correct or not using a if else ladder
    if(correctAns){
        selectedButton.classList.add("correct");
        console.log("correct");
        score++;
        console.log(score);
    }else{
        selectedButton.classList.add("incorrect")
        console.log("incorrect");
    }


    Array.from(options.children).forEach(button => {
        if(button.dataset.result === "true"){
            button.classList.add("correct");
            button.disabled = true;
        }
    });
    submit.style.display = "block";
}



function showScore(){
    resetState();
    questionDetails.innerHTML = `your score is ${score} out of ${questions.length}`;
    submit.innerHTML = "test again";
    submit.style.display = "block";
}

submit.addEventListener("click",() =>{
    if(currentQuestionIndexNumber < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function handleNextButton(){
    currentQuestionIndexNumber++;
    if(currentQuestionIndexNumber<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
startQuiz();



// code by prateek saha