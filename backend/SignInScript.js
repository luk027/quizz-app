console.log("--SignIn Page--");

//taking object of users data from localstorage;
let storedUsersData = JSON.parse(localStorage.getItem("usersData") || "[]");

const sigInForm = document.getElementById("signin-form");
const msg = document.getElementById("msg1");
const msgSuccess = document.getElementById("msg2");

sigInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);
  let signInFormDataObj = Object.fromEntries(formData.entries());
  if (
    signInFormDataObj.email === "admin@email.com" &&
    signInFormDataObj.password == "123"
  ) {
    msgSuccess.classList.remove("d-none");
    setTimeout(function () {
      window.location.href = "CreateQuiz.html";
    }, 1000);
  } else {
    const matchedUser = storedUsersData.filter((user) => {
      return (
        signInFormDataObj.email === user.email &&
        signInFormDataObj.password == user.password
      );
    });
    if (matchedUser.length) {
      let newUser = matchedUser;
      let currentlyLoginUser = JSON.stringify(newUser);
      //storing current user in localstorage;
      localStorage.setItem("currentUser", currentlyLoginUser);
      msgSuccess.classList.remove("d-none");
      setTimeout(function () {
        window.location.href = "HomePage.html";
      }, 1000);
      form.reset();
    } else if (
      signInFormDataObj.username === "" ||
      signInFormDataObj.password === ""
    ) {
      showMessage("All Details Required!");
    } else {
      showMessage("Invalid Credentials");
    }
  }
});

function showMessage(message) {
  msg.classList.remove("d-none");
  msg.innerText = message;
  setTimeout(function () {
    msg.classList.add("d-none");
  }, 2000);
  return false;
}
