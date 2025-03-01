console.log("Profile Page");

//taking object of users data from localstorage;
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
let allQuizData = JSON.parse(localStorage.getItem("quizData") || "[]");
let currentQuiz = JSON.parse(localStorage.getItem("currentQuizData") || "[]");

const usernameDiv = document.getElementById("profile-user-text");
const profileContainer = document.getElementById("profile-container");
const createdQuizDataContainer = document.getElementById("created-quiz-data");

usernameDiv.innerHTML = `Profile Data`;

profileContainer.innerHTML = `
<div>
    UserName: &nbsp;<span class='text-warning'>${
      currentUser[0].username
    }</span> 
    <br/>
    Email: &nbsp;<span class='text-warning'>${currentUser[0].email}</span>  
    <br/>
    Password: &nbsp;<span class='text-warning'>${
      currentUser[0].password
    }</span> 
    <br/>
    <br/>
    <br/>
    <h4 class="display-6"> Game Data</h4>
    <hr>
    <p class='h4'>Total Points: &nbsp;<span class='text-warning'>${
      currentUser[0].totalpoints
    }</span></p>
    <u>Recently played</u><br/> 
    <li>Quiz Name: &nbsp;<span class='text-warning'>${
      currentUser[0]?.previousQuiz?.Quiz === undefined
        ? `Not played yet!`
        : currentUser[0]?.previousQuiz?.Quiz
    }</span></li> 
    <li>Points Gained: &nbsp;<span class='text-warning'>${
      currentUser[0]?.previousQuiz?.Points === undefined
        ? `Not played yet!`
        : currentUser[0]?.previousQuiz?.Points
    }</span></li>
    <li>Quiz Played: &nbsp;<span class='text-warning'>${
      currentUser[0]?.previousQuiz?.Difficulty === undefined
        ? `Not played yet!`
        : currentUser[0]?.previousQuiz?.Difficulty
    }</span> </li> 
    <br/>
    <br/>
    <br/>
</div>
`;

function deleteQuiz(data) {
  if (confirm("Are You Sure?")) {
    const updatedQuiz = allQuizData.filter(function (obj) {
      return obj.quizid !== data;
    });
    localStorage.setItem("quizData", JSON.stringify(updatedQuiz));
    window.location.reload();
  }
  console.log(data);
}
function addQuestionToQuiz(data) {
  console.log(data);
  localStorage.setItem("currentQuizData", JSON.stringify(data));
  window.location.href = "CreateQuiz.html";
}

for (let i = 0; i < allQuizData.length; i++) {
  if (allQuizData[i].createdBy == currentUser[0].email) {
    createdQuizDataContainer.innerHTML += `
    <div>
    <ul>
         <li>Quiz Topic: <span class='text-warning'>${
           allQuizData[i].quizName
         }</span></li>
         <li>Difficulty: <span class='text-warning'>${
           allQuizData[i].difficulty
         }</span></li>
         <li>Total Questions: <span class='text-warning'>${
           allQuizData[i].questions.length
         }</span></li>
         <button type='button' class='btn btn-success btn-sm' onclick='addQuestionToQuiz(${JSON.stringify(
           allQuizData[i]
         )})'>Add</button>
         <button type='button' class='btn btn-danger btn-sm' onclick='deleteQuiz(${JSON.stringify(
           allQuizData[i].quizName + "-" + currentUser[0].email
         )})'>Delete</button>
     </ul>
     </div>
 `;
  }
}

// const homeQuiz = allQuizData
//   .filter((data) => data.createdby === currentUser[0].email)
//   .map((data) => {
//     console.log(data.quizName + "-" + data.createdby);
//     return (createdQuizDataContainer.innerHTML += `
//     <div>
//     <ul>
//         <li>Quiz Topic: <span class='text-warning'>${data.quizName}</span></li>
//         <li>Difficulty: <span class='text-warning'>${
//           data.difficulty
//         }</span></li>
//         <button type='button' class='btn btn-danger btn-sm' onclick='deleteQuiz(${JSON.stringify(
//           data.quizName + "-" + data.createdby
//         )})'>Delete</button>
//     </ul>
//     </div>
// `);
// });

