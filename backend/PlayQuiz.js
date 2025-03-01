console.log("Play Quiz");
//taking object of users data from localstorage;
let storedUsersData = JSON.parse(localStorage.getItem("usersData") || "[]");
let currentQuiz = JSON.parse(localStorage.getItem("currentQuizData") || "[]");
let allQuizData = JSON.parse(localStorage.getItem("quizData") || "[]");
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");

let quizName = document.getElementById("quiz-name-text");
const qInfo = document.getElementById("quiz-info");
let quizFormContainer = document.getElementById("user-quiz-form-container");
const quizForm = document.getElementById("user-quiz-form");
const resultDiv = document.getElementById("result");
const sBtn = document.getElementById("sBtn");
const backBtn = document.getElementById("backBtn");
let totalQuestions = currentQuiz.questions.length;


let score = 0;

function winningPointsFun() {
  if (currentQuiz.difficulty === "Hard") {
    return totalQuestions * 30;
  } else if (currentQuiz.difficulty === "Medium") {
    return totalQuestions * 20;
  } else {
    return totalQuestions * 10;
  }
}
let winningPoints = winningPointsFun();

quizName.innerHTML = `<span class='text-warning'>${currentQuiz.quizName}</span> Quiz!`;
qInfo.innerHTML = `
<p>Difficulty: <span class='text-warning'>${currentQuiz.difficulty}</span>
&nbsp; 
Points:  <span class='text-warning'>${winningPoints}</span></p>
`;

console.log(currentQuiz?.questions[0]?.correctOption)
{/* <span class='mt-3'>${i}. ${currentQuiz[`questions${i}`].question}</span> */}
function formComponent() {
  for (let i = 0; i < totalQuestions; i++) {
    quizForm.innerHTML += `
          <div class='mb-2 rounded p-2' id='que-${i}'>
              <span class='mt-3'>${i+1}. ${currentQuiz?.questions[`${i}`]?.question}</span>
              <div class='row gap-2 container mt-1'>
                  <div class='col-sm-4'>
                      <div class='form-check'>
                          <input type='radio' class='form-check-input' id='radio1' name='${i}' value='A' required>
                          ${currentQuiz?.questions[`${i}`]?.options?.A}
                          <label class='form-check-label' for='radio1'></label>
                      </div>
                  </div>
                  <div class='col-sm-4'>
                      <div class='form-check'>
                          <input type='radio' class='form-check-input' id='radio1' name='${i}' value='B' required>
                          ${currentQuiz?.questions[`${i}`]?.options?.B}
                          <label class='form-check-label' for='radio1'></label>
                      </div>
                  </div>
                  <div class='col-sm-4'>
                      <div class='form-check'>
                          <input type='radio' class='form-check-input' id='radio1' name='${i}' value='C' required>
                          ${currentQuiz?.questions[`${i}`]?.options?.C}
                          <label class='form-check-label' for='radio1'></label>
                      </div>
                  </div>
                  <div class='col-sm-4'>
                      <div class='form-check'>
                          <input type='radio' class='form-check-input' id='radio1' name='${i}' value='D' required>
                          ${currentQuiz?.questions[`${i}`]?.options?.D}
                          <label class='form-check-label' for='radio1'></label>
                      </div>
                  </div>
              </div>
        </div>
          `;
  }
}
formComponent();

quizFormContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);
  let formDataObj = Object.fromEntries(formData.entries());
  
  const userAns = Object.values(formDataObj);
  for (let i = 0; i < totalQuestions; i++) {
    if (currentQuiz?.questions[i]?.correctOption === userAns[i]) {
      document.getElementById(`que-${i}`).classList.add("bg-success");
      score++;
    } else if (currentQuiz?.questions[i]?.correctOption !== userAns[i]) {
      document.getElementById(`que-${i}`).classList.add("bg-danger");
    }
  }


  const matchedUser = storedUsersData.map((user) => {
    // console.log("pt"+user.totalpoints)
    if (score === totalQuestions) {
      if (currentUser[0].email === user.email) {
        user.previousQuiz = {
          Quiz: currentQuiz.quizName,
          Difficulty: currentQuiz.difficulty,
          Points: winningPoints, 
        };
        user.totalpoints += winningPoints;
        // let pointArray = winningPoints;
        // user.previousQuiz['points'].push(pointArray);
      }
    }
    return user;
  });
  console.log(matchedUser)
  let allUsersData = JSON.stringify(matchedUser);
  localStorage.setItem("usersData", allUsersData);


  const updateCurrentUser = storedUsersData.filter((cUser) => {
    if (currentUser[0].email === cUser.email) {
      return cUser;
    }
  });
  let currentlyLoginUser = JSON.stringify(updateCurrentUser);
  //storing current user in localstorage;
  localStorage.setItem("currentUser", currentlyLoginUser);

  ShowResult(score, totalQuestions);
  backBtn.addEventListener("click", function () {
    window.location.href = "HomePage.html";
  });
});

function ShowResult(score, qLen) {
  sBtn.disabled = true;
  sBtn.innerHTML = `<del>Submit</del>`;
  backBtn.classList.remove("d-none");
  resultDiv.classList.remove("d-none");
  if (score === 0) {
    resultDiv.classList.remove("alert-info");
    resultDiv.classList.add("alert-danger");
    return (resultDiv.innerHTML += `Your Score is ${score} out of ${qLen}`);
  } else {
    resultDiv.classList.add("alert-info");
    return (resultDiv.innerHTML += `Your Score is ${score} out of ${qLen}`);
  }
}
