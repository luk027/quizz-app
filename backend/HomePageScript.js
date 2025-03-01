console.log("Home Page");
//taking object of users data from localstorage;
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
let currentQuiz = JSON.parse(localStorage.getItem("currentQuizData") || "[]");
let allQuizData = JSON.parse(localStorage.getItem("quizData") || "[]");

const searchIpt = document.getElementById("inpt-search");
const searchQuizBtn = document.getElementById("quiz-search-btn");
const usernameDiv = document.getElementById("home-user-text");
const cardContainer = document.getElementById("home-quiz-container");
const searchQuizContainer = document.getElementById("search-quiz-container");
const quizNotFoundMsg = document.getElementById("quiz-nf");

usernameDiv.innerHTML = `Welcome! <span class='text-warning'>${currentUser[0].username}</span>`;

function playQuiz(data) {
  localStorage.setItem("currentQuizData", JSON.stringify(data));
  window.location.href = "PlayQuiz.html";
}

for (let i = 0; i < allQuizData.length; i++) {
  if (allQuizData[i].createdBy != currentUser[0].email) {
    cardContainer.innerHTML += `
    <div id='quiz-card' class='col-sm-6 mb-4'>
        <div class='card shadow'>
            <div class='card-body'>
                <h4 class='card-title'>${allQuizData[i].quizName}</h4>
                <spam class='card-text'>Total Questions: ${allQuizData[i].questions.length}</spam>
                <p class='card-text'>Difficulty: ${
                  allQuizData[i].difficulty
                }</p>
                <button class='btn btn-outline-success' onclick='playQuiz(${JSON.stringify(
                  allQuizData[i]
                )})'>Play</button>
            </div>
        </div>
    </div>
`;
  }
}

// const homeQuiz = allQuizData
//   .filter((data) => data.createdby != currentUser[0].email)
//   .map((data) => {
//     return (cardContainer.innerHTML += `
//     <div id='quiz-card' class='col-sm-6 mb-4'>
//         <div class='card shadow'>
//             <div class='card-body'>
//                 <h4 class='card-title'>${data.quizName}</h4>
//                 <spam class='card-text'>Total Questions: ${
//                   data.totalQuestions
//                 }</spam>
//                 <p class='card-text'>Difficulty: ${data.difficulty}</p>
//                 <button class='btn btn-outline-success' onclick='playQuiz(${JSON.stringify(
//                   data
//                 )})'>Play</button>
//             </div>
//         </div>
//     </div>
// `);
//   });

searchQuizBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchedQuiz = searchIpt.value;
  cardContainer.classList.add("d-none");
  searchQuizContainer.classList.remove("d-none");
  //   quizNotFoundMsg.classList.remove("d-none");
  const searchedResult = allQuizData
    .filter((data) => data.quizName === searchedQuiz)
    .map((data) => {
      return (searchQuizContainer.innerHTML += `
                <div id='quiz-card' class='col-sm-6 mb-4'>
                    <div class='card shadow'>
                        <div class='card-body'>
                            <h4 class='card-title'>${data.quizName}</h4>
                            <spam class='card-text'>Total Questions: ${
                              data.totalQuestions
                            }</spam>
                            <p class='card-text'>Difficulty: ${
                              data.difficulty
                            }</p>
                            <button class='btn btn-outline-success' onclick='playQuiz(${JSON.stringify(
                              data
                            )})'>Play</button>
                        </div>
                    </div>
                </div>
            `);
    });
});
