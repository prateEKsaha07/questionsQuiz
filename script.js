const questions = [        //will make a separate javascript file for this one this is just for the development time...
    {
        question:"when : where :: time : ______?",
        answer:[
            {text:"reason",result:"false"},
            {text:"process",result:"false"},
            {text:"place" ,result:"true"},
            {text:"length",result:"false"}
        ]
    },
    {
        question:"A is husband of B and C is mother of D and B. what is A to C?",
        answer:[
            {text:"mother",result:"false"},
            {text:"sister",result:"false"},
            {text:"aunt" ,result:"false"},
            {text:"mother-in-law",result:"true"}
        ]
    },
    {
        question:"NUMBER : UNBMRE :: GHOST : ______?",
        answer:[
            {text:"HOGST",result:"false"},
            {text:"HOGTS",result:"false"},
            {text:"HGOST" ,result:"false"},
            {text:"HGOTS",result:"true"}
        ]
    },
    {
        question:"09 : 25 :: 49 : ______?",
        answer:[
            {text:"63",result:"false"},
            {text:"36",result:"false"},
            {text:"64" ,result:"false"},
            {text:"81",result:"true"}
        ]
    },
    {
        question:"The missing number on the Tringle ?",
        answer:[
            {text:"25",result:"false"},
            {text:"26",result:"false"},
            {text:"30" ,result:"true"},
            {text:"36",result:"false"}
        ]
    },
    {
        question:"if ACE ia 9 and BES is 26 then ice is _____?",
        answer:[
            {text:"62",result:"false"},
            {text:"26",result:"false"},
            {text:"22" ,result:"false"},
            {text:"17",result:"true"}
        ]
    },    {
        question:"RAM goes 6km towards east then 8km towards north .now ram is how far away from his initial position ?",
        answer:[
            {text:"2km",result:"false"},
            {text:"14 km",result:"false"},
            {text:"10km" ,result:"true"},
            {text:"24km",result:"false"}
        ]
    },    {
        question:"JLN : SQU :: PRT:_____ ?",
        answer:[
            {text:"UYW",result:"false"},
            {text:"UTV",result:"false"},
            {text:"YMU" ,result:"true"},
            {text:"VUT",result:"false"}
        ]
    },
    // {
    //     question:"?",
    //     answer:[
    //         {text:"",result:""},
    //         {text:"",result:""},
    //         {text:"" ,result:""},
    //         {text:"",result:""}
    //     ]
    // },
]

const questionDetails = document.getElementById("questions");
const options = document.getElementById("answerButton");
const submit = document.getElementById("nextBtn");
const notice = document.getElementById("Notice");


// console.log(questionDetails);
// console.log(options); 
// console.log(submit);   i was testing !!
console.log(notice);


let currentQuestionIndexNumber = 0; // for keeping  a record of index or number of questions 
let score = 0; // im mean without it whats the fun
let correctAnswerCount = 0;
let incorrectAnswerCount = 0;


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
        score = score + 3;
        correctAnswerCount++;
        console.log(score);
    }else{
        selectedButton.classList.add("incorrect")
        console.log("incorrect")
        score = score - 2;
        incorrectAnswerCount++;
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
    questionDetails.innerHTML = `your score is ${score} out of ${questions.length * 3} the number of correct answers were ${correctAnswerCount} and incorrect answers were ${incorrectAnswerCount}`;
    submit.innerHTML = "test again";
    submit.style.display = "block";
    notice.style.display = "none";
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