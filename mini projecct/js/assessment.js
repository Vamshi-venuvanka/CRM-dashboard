

const questions = [
  {
    question: "What does CRM stand for?",
    options: ["Customer Resource Manager","Customer Relationship Management","Client Response Management","Corporate Record Management"],
   
  },
  {
    question: "Which element is used for storing data in browser?",
    options: ["localStorage","cookie","sessionStorage","All of the above"],
    
  },
  {
    question: "Which Bootstrap class is used for card layout?",
    options: [".container",".card",".row",".btn"],
  
  },
  {
    question: "Which of these is a valid JavaScript data type?",
    options: ["string","number","boolean","All of the above"],
  
  },
  {
    question: "Which HTML element is used for ordered lists?",
    options: ["ol","ul","li","p"],
  }
];




const correctAnswers={
    Q1:"B",
    Q2:"D",
    Q3:"B",
    Q4:"D",
    Q5:"A"
};

function calculatePercentage(score,totalQuestions){
  return Math.round((score/totalQuestions)*100);

}

function getGrade(percentage){
if(percentage>=80){
    return {
    Grade:'A',
    Feedback:"Excellent"};
}
else if(percentage>=60){
    return {Grade:'B',
    Feedback:"Good Job"};
}
else if (percentage>=40) {
    return {Grade:'C',
    Feedback:"Needs Improvement"};
}
else{
    return {Grade:'Fail',
    Feedback:"Try Again"};

}
}


function isPassed(percentage){
    return percentage>=40;
}

let startbtn, questionContainer, finishbtn;
let resultContainer, scoreq, percentage1, gradeq, feedbackq;

if (typeof document!== "undefined")
{
 startbtn=document.getElementById('startTest');

 questionContainer=document.getElementById("questionsContainer");
 finishbtn=document.getElementById("finishTest");

 resultContainer=document.getElementById("resultContainer");
 scoreq=document.getElementById("score");
 percentage1=document.getElementById("Percentage");
 gradeq=document.getElementById("Grade");

 feedbackq=document.getElementById("Feedback");

}

const renderQuestions = () => {
    const container = document.getElementById("questionsContainer");
    container.innerHTML = ""; // Clear old content
    questions.forEach((q, index) => {
        const qNumber = index + 1;
        const card = document.createElement("div");
        card.classList.add("card", "mb-4");
        card.innerHTML = `
            <div class="card-body bg-light">
                <h6>${qNumber}. ${q.question}</h6>
                ${q.options.map((opt, i) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="Q${qNumber}" id="Q${qNumber}${String.fromCharCode(65+i)}">
                        <label class="form-check-label" for="Q${qNumber}${String.fromCharCode(65+i)}">
                            ${opt}
                        </label>
                    </div>
                `).join("")}
            </div>
        `;
        container.appendChild(card);
    });
}; 

if (startbtn){
startbtn.addEventListener('click',()=>{
    startbtn.innerText="Loading Questions...";
    setTimeout(() => {
        startbtn.style.display="none";

    questionContainer.classList.remove('d-none');
    finishbtn.classList.remove('d-none');
    renderQuestions();
    }, 1000);
});
}


if (finishbtn){
finishbtn.addEventListener('click',()=>{
    let score=0;
    const totalQuestions=Object.keys(correctAnswers).length;

    for(let q in correctAnswers){
        const selected=document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.id.slice(-1) === correctAnswers[q].toUpperCase()) {
    score++;
}
    }

const percentage = calculatePercentage(score, totalQuestions);
const result = getGrade(percentage);



scoreq.innerText=`${score}/${totalQuestions}`;
percentage1.innerText=`${percentage}%`;
gradeq.innerText=result.Grade;
feedbackq.innerText=result.Feedback;


questionContainer.classList.add('d-none');
finishbtn.classList.remove('d-none');

resultContainer.classList.remove('d-none');




// Get selected employee
let employee = JSON.parse(localStorage.getItem("selectedEmployee"));

// Get existing scores or empty object
let scores = JSON.parse(localStorage.getItem("employeeScores")) || {};

 if (employee) {
    scores[employee.id] = percentage;
    localStorage.setItem("employeeScores", JSON.stringify(scores));
  }

setTimeout(() => {
        window.location.href = "Profile.html";
    }, 1500);
});

}
  module.exports = {
    calculatePercentage,
    getGrade,
    isPassed
  };

