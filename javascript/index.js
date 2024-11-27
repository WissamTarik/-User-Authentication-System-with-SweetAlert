
var usersList = [];

var bodyId = document.body.getAttribute("id");
function addToLocalStorage(key, value) {
  localStorage.setItem(key,JSON.stringify(value))
}
if (localStorage.getItem("users")) {
  usersList = JSON.parse(localStorage.getItem("users"));
}
if (bodyId == "signupPage") {
  var signupBtn = document.querySelector("#signupBtn");
  var signupEmailInput = document.querySelector("#signupEmail");
  var signupUserNameInput = document.querySelector("#signUpuserName");
  var signupPasswordInput = document.querySelector("#signupPassword");
  var correctEmail=true,correctPassword=true,correctUserName=true


  function createUser() {
    var flag = false;
    if (
      validation("signupEmail") &&
      validation("signUpuserName") &&
      validation("signupPassword")
    ) {
      for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email == signupEmailInput.value) {
          flag = true;
          break;
        }
      }
      if (flag) {
        alert("The email is already exist");
      } else {
        user = {
          userName: signupUserNameInput.value,
          email: signupEmailInput.value,
          password: signupPasswordInput.value,
        };
        usersList.push(user);
        addToLocalStorage('users',usersList)
        Swal.fire({
          title: "Sign up done successfully",
          text: "Welcome to our website",
          icon: "success",
          confirmButtonText: "Okay"
        }).then(() => {
        window.open("./index.html", "_self"); 
      });
      }
    } else {
      if (!correctEmail) {
        swal.fire({
          title: "Incorrect Email",
          icon:"error"
        })
      }
      if (!correctPassword) {
        swal.fire({
          title: "Incorrect Password",
          icon:'error'
        })
      }
      if (!correctUserName) {
        swal.fire({
          title: "Incorrect UserName",
          icon:"error"
        })
      }
    }
    clearSignUpInputs();
  }

  function clearSignUpInputs() {
    signupPasswordInput.value = null;
    signupUserNameInput.value = null;
      signupEmailInput.value = null;
      signupPasswordInput.classList.remove('is-valid')
      signupPasswordInput.classList.remove('is-invalid')
      signupUserNameInput.classList.remove('is-valid')
      signupUserNameInput.classList.remove('is-invalid')
       signupEmailInput.classList.remove('is-valid')
       signupEmailInput.classList.remove('is-invalid')
  }

  function validation(id) {
    var input = document.getElementById(id);
    var inputValue = input.value;
    var regexes = {
      signUpuserName: /^[a-zA-Z](\w|\s){2,15}$/,
      signupEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      signupPassword:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };
    if (regexes[id].test(inputValue)) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    }
  }
  signupBtn.addEventListener("click", createUser);
  signupUserNameInput.addEventListener("blur", function (e) {
    if (!validation(e.target.getAttribute("id"))) {
      addErrorMessage(document.querySelector(".nameDiv p"),false)
     
      correctUserName=false
    } 
    else {
      correctUserName=true
    }
  });
  signupUserNameInput.addEventListener("focus", function (e) {
    addErrorMessage(document.querySelector(".nameDiv p"),true)

  });
  signupEmailInput.addEventListener("blur", function (e) {
    if (!validation(e.target.getAttribute("id"))) {
      addErrorMessage(document.querySelector(".emailDiv p"),false)
      correctEmail=false
    }
    else {
      correctEmail=true
    }
  });
  signupEmailInput.addEventListener("focus", function (e) {

      document.querySelector(".emailDiv p").classList.add("d-none");

  });
  signupPasswordInput.addEventListener("blur", function (e) {
    if (!validation(e.target.getAttribute("id"))) {
      addErrorMessage(document.querySelector(".passwordDiv p"),false)
      correctPassword=false
    } 
    else {
      correctPassword=true
    }
  });
  
  signupPasswordInput.addEventListener("focus", function (e) {
    addErrorMessage(document.querySelector(".passwordDiv p"),true)
  });
  function addErrorMessage(selector, isvalid) {
    if (isvalid) {
      selector.classList.add("d-none")
    }
    else {
      selector.classList.remove('d-none')
    }
  }
  
}
if (bodyId == "IndexPage") {
    var flag=true
  var signinEmail = document.querySelector(".signinEmail");
  var signinPassword = document.querySelector(".signinPassword");
  var loginBtn = document.querySelector(".loginBtn");
  var correctSignInEmail=true
  var correctSignInPassword=true
    function clearSignInInputs() {
        signinEmail.value = null
        signinPassword.value = null
    }
    loginBtn.addEventListener('click', function () {
        
      if (signinEmail.value == '' || signinPassword.value == '') {
        swal.fire({
          title: "All Inputs are required",
          icon: "error"
        })
        clearSignInInputs()
      }
      else {
        for (var i = 0; i < usersList.length; i++) {
          if (usersList[i].email == signinEmail.value && usersList[i].password == signinPassword.value) {
            addToLocalStorage('userName', usersList[i].userName)
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            }).then(function () {
              clearSignInInputs()
              window.open('./home.html', "_self")
            
       
            })
            flag = false
      
            break;
          }
          else {
            if (usersList[i].email == signinEmail.value && usersList[i].password !== signinPassword.value) {
              correctSignInPassword = false
            }
            if (usersList[i].email !== signinEmail.value && usersList[i].password == signinPassword.value) {
              
              correctSignInEmail = false
            }
          }
        }
        if (flag) {
          swal.fire({
            title: "Failed to login",
            text: "you can try again",
            icon: "error",
          })
          clearSignInInputs()
        }
        if (!correctSignInPassword) {
          swal.fire({
            title: "Incorrect Password",
            text: "you can try again",
            icon: "error",
          })
        
          correctSignInPassword = true
        }
        if (!correctSignInEmail) {
          swal.fire({
            title: "Incorrect  Email",
            text: "you can try again",
            icon: "error",
          })
          correctSignInEmail = true
        }
      }
    })
}
console.log(usersList);
if (bodyId == "homePage") { 
   document.querySelector('.content').innerHTML=` <h1>Welcome ${JSON.parse(localStorage.getItem('userName'))}</h1>`    
}
