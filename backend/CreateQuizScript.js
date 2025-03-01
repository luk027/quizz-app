console.log("Create-Quiz");

//taking object of users data from localstorage;
let allQuizData = JSON.parse(localStorage.getItem("quizData") || "[]");
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
let currentQuiz = JSON.parse(localStorage.getItem("currentQuizData") || "[]");

let queForm = document.getElementById("que-form");
const msgSuccess = document.getElementById("msg2");
let questionCount = 1;

function removeQuestionSet() {
  const questionsContainer = document.getElementById("question-container");
  const questionsSet = document.getElementsByClassName("question-set");

  if (questionsSet.length > 1) {
    questionsContainer.removeChild(questionsSet[questionsSet.length - 1]);
    questionCount--;
  } else {
    alert("Cannot Remove!");
  }
} 

function addQuestionSet() {
  const questionsContainer = document.getElementById("question-container");
  const questionSet = document.createElement("div");
  questionSet.className = "question-set";

  questionSet.innerHTML = `
        <input type="text" class="question" placeholder="Enter Question" size="50">
            <br>
        <input type="text" id="optionAText" class="optionAText" placeholder="optionA">
        <input type="radio" name="option-${questionCount}" value="A">
            <br>
        <input type="text" id="optionBText" class="optionBText" placeholder="optionB">
        <input type="radio" name="option-${questionCount}" value="B">
            <br>
        <input type="text" id="optionCText" class="optionCText" placeholder="optionC">
        <input type="radio" name="option-${questionCount}" value="C">
            <br>
        <input type="text" id="optionDText" class="optionDText" placeholder="optionD">
        <input type="radio" name="option-${questionCount}" value="D">
            <br><br>
    `;
  questionsContainer.appendChild(questionSet);
  questionCount++;
}

console.log(allQuizData)


if(currentUser[0].email == currentQuiz.createdBy){
  document.getElementById("quiz-name").value = currentQuiz.quizName;
    document.getElementById("difficulty").value = currentQuiz.difficulty;

  function saveQuestions(){
    const questionsSet = document.getElementsByClassName("question-set");
    for (let index = 0; index < questionsSet.length; index++) {
      const set = questionsSet[index];
      const questionText = set.querySelector(".question").value;
      const optionAText = set.querySelector(".optionAText").value;
      const optionBText = set.querySelector(".optionBText").value;
      const optionCText = set.querySelector(".optionCText").value;
      const optionDText = set.querySelector(".optionDText").value;
      const correctOption = set.querySelector(
        `input[name="option-${index}"]:checked`
      );
  
      if (
        !questionText ||
        !optionAText ||
        !optionBText ||
        !optionCText ||
        !optionDText ||
        !correctOption
      ) {
        alert(
          `Please fill out all fields for question ${
            index + 1
          } and select the correct answer.`
        );
        return;
      }
      if (!correctOption) {
        alert(`Please select the correct answer for question ${index + 1}.`);
        return;
      }
  
      const newQuestion = {
        question: questionText,
        options: {
          A: optionAText,
          B: optionBText,
          C: optionCText,
          D: optionDText,
        },
        correctOption: correctOption.value,
      };
      currentQuiz.questions.push(newQuestion);
      localStorage.setItem("currentQuizData", JSON.stringify(currentQuiz));

      const updateAllQuizData = allQuizData.filter((obj) => {
        if(obj.quizid == currentQuiz.quizid){
          return obj.questions.push(newQuestion);
        }
      });
      // console.log(allQuizData)
      localStorage.setItem("quizData", JSON.stringify(allQuizData));
    }
    msgSuccess.classList.remove("d-none");
    msgSuccess.innerHTML = `Question added successfully!`;
      setTimeout(function () {
        let emptyLS = ""
        localStorage.setItem("currentQuizData", JSON.stringify(emptyLS));
        window.location.href = "ProfilePage.html";
      }, 2000);
  } 
}
else{
  console.log('Add New')
  function saveQuestions() {
    const quizName = document.getElementById("quiz-name").value;
    const difficulty = document.getElementById("difficulty").value;
    const questionsSet = document.getElementsByClassName("question-set");
    let allQue = [];
  
    for (let index = 0; index < questionsSet.length; index++) {
      const set = questionsSet[index];
      const questionText = set.querySelector(".question").value;
      const optionAText = set.querySelector(".optionAText").value;
      const optionBText = set.querySelector(".optionBText").value;
      const optionCText = set.querySelector(".optionCText").value;
      const optionDText = set.querySelector(".optionDText").value;
      const correctOption = set.querySelector(
        `input[name="option-${index}"]:checked`
      );
  
      if (
        !questionText ||
        !optionAText ||
        !optionBText ||
        !optionCText ||
        !optionDText ||
        !correctOption
      ) {
        alert(
          `Please fill out all fields for question ${
            index + 1
          } and select the correct answer.`
        );
        return;
      }
      if (!correctOption) {
        alert(`Please select the correct answer for question ${index + 1}.`);
        return;
      }
  
      const newQuestion = {
        question: questionText,
        options: {
          A: optionAText,
          B: optionBText,
          C: optionCText,
          D: optionDText,
        },
        correctOption: correctOption.value,
      };
      allQue.push(newQuestion);
    }
    let quizData = 
      {
        createdBy: currentUser[0].email,
        difficulty: difficulty,
        quizid: quizName + "-" + currentUser[0].email,
        quizName: quizName,
        questions: allQue,
      };
    console.log(quizData);
    let result = confirm("Add quiz!");
    if (result) {
      allQuizData.push(quizData);
      // Store the questions array in local storage
      localStorage.setItem("quizData", JSON.stringify(allQuizData));
      msgSuccess.classList.remove("d-none");
      setTimeout(function () {
        window.location.href = "ProfilePage.html";
      }, 2000);
    }
  }
}






// queForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let form = e.target;
//   let formData = new FormData(form);
//   let formDataObj = Object.fromEntries(formData.entries());
// formDataObj.createdby = currentUser[0].email;
// formDataObj.quizid = formDataObj.quizName + "-" + currentUser[0].email;
// let queData = [
//   {
//     question: document.getElementById('Question').value,
//     options: {
//       option1: [document.getElementById('OptA').value, document.getElementById('radio1').value],
//       option2: [document.getElementById('OptB').value, document.getElementById('radio1').value],
//       option3: [document.getElementById('OptC').value, document.getElementById('radio1').value],
//       option4: [document.getElementById('OptD').value, document.getElementById('radio1').value],
//     }
//   }
// ];

// console.log(formDataObj)
// if (confirm("Are You Sure?")) {
//   allQuizData.push(formDataObj);
//   let quizData = JSON.stringify(allQuizData);
//   localStorage.setItem("quizData", quizData);
//   form.reset();
//   showSuccessMessage();
// } else {
//   showErrMessage();
// }
// });
