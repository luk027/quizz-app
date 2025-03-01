console.log("--Register Page--");

//taking object of users data from localstorage;
let storedUsersData = JSON.parse(localStorage.getItem("usersData") || "[]");

const regForm = document.getElementById("register-form");
const msg = document.getElementById("msg1");

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);
  let regFormDataObj = Object.fromEntries(formData.entries());
  regFormDataObj.totalpoints = 0;

  const matchedUser = storedUsersData.filter((user) => {
    return regFormDataObj.email === user.email;
  });
  if (regFormDataObj.email==="" || regFormDataObj.username==="" || regFormDataObj.password==="") {
    showMessage("All Details Required!");
  } else if(matchedUser.length){
    showMessage("Email Already Exist!");
  } else {
    storedUsersData.push(regFormDataObj);
    let allUsersData = JSON.stringify(storedUsersData);
    localStorage.setItem("usersData", allUsersData);
    window.location.href = "SignIn.html";
  }
});

function showMessage(message) {
  msg.classList.remove("d-none");
  msg.innerText = message;
  setTimeout(function () {
    msg.classList.add("d-none");
  }, 3000);
  return false;
}