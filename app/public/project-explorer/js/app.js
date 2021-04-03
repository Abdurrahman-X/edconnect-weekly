
    // SELECTORS

const selectOptions = document.getElementById('program');
const gradList = document.querySelector('select[name = graduationYear]');
//const signUp = document.getElementById('signupForm');
//const errAlert = document.getElementById('error-alert');
//const firstName = document.querySelector('[name = firstName]');
//const lastName = document.querySelector('input[name = lastName]');
// console.log(lastName);
// console.log(firstName);
const navHead = document.getElementById("nav-head");
const userStatus = document.getElementById("user-status");
const loginForm = document.getElementById("loginForm");
const createProjectForm = document.getElementById("createProjectForm");




// INDEX PAGE
    let thisPage = window.location.href
    window.onload = async function () {
        
        // const cookieValue = document.cookie
        // .split('; ')
        // .find(row => row.startsWith("uid="))
        // .split('=')[1];
        const checkCookie = document.cookie.split(";");

        if (checkCookie[0]==="uid" && checkCookie[1]) {
            let logoutBtn = document.createElement("button");
            let greetUser = document.createElement("span");
            let response = await fetch(`/api/users/${check[1]}`);
            let data = await response.json();
            logoutBtn.textContent = "Logout";
            greetUser.innerHTML = `<span id="username">${data.firstName}</span>`
            navHead.appendChild(logoutBtn);
            navHead.appendChild(greetUser);
        }

        logoutBtn.addEventListener("click", function () {
            document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            windows.location = "/project-explorer/index.html";

        })
    }



if (window.location.href.includes('register.html')) {
    window.onload = function () {
       

        async function progPopulate() {
            try {
                // POPULATE THE PROGRAM LIST

                const prosponse = await fetch('/api/programs');
                const programs = await prosponse.json();
                
                let myOptions = programs.map(element => {
                    return `<option value = "${element}">${element}</option>`
                });

                selectOptions.innerHTML = myOptions;
            }
            catch(err){
                console.log(err);
            }
        }
        progPopulate();


        async function gradPopulate() {
            try {
                // POPULATE THE GRADUATION YEAR LIST

                const gradsponse = await fetch('/api/graduationYears');
                const gradYears = await gradsponse.json();
                
                let myOptions = gradYears.map(element => {
                    return `<option value = "${element}">${element}</option>`
                });

                gradList.innerHTML = myOptions;
            }
            catch(err){
                console.log(err);
            }
        }
        gradPopulate();

        const signupForm = document.getElementById("signupForm")
  signupForm.addEventListener("submit", e => {
    e.preventDefault()
    const programs = document.getElementById("program").value
    const graduationYear = document.getElementById("graduationYear").value
    const firstname = document.getElementById("firstName").value
    const lastname = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const matricNumber = document.getElementById("matricNumber").value

    const data = { firstname, lastname, email, password, programs, graduationYear, matricNumber }
    handleRegSubmit(data)
  })

  async function handleRegSubmit(data) {
    try {
      const payload = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const response = await payload.json()
      if (response.status === "ok") {
        document.cookie = `uid=${response.data.id};path=/`
        window.location.replace("/project-explorer/index.html")
      } else {
        let errorDiv = document.createElement("div")
        errorDiv.classList.add("alert", "alert-danger", "w-100")
        let errors = response.errors.map(error => {
          return `<p>${error}</p>`
        })
        errorDiv.innerHTML = errors.join("")
        signupForm.prepend(errorDiv)
        throw "Unsuccessful"
      }
    } catch (e) {
      console.log(e)
    }
  }
}


            // HANDLING THE FORM SUBMISSION            
            
        //     signUp.addEventListener("submit", function (e) {
        //         e.preventDefault();
                
        //           const  firstname =  document.getElementById("firstName").value;
        //           const lastname = document.getElementById("lastName").value
        //           const email = document.getElementById("email").value
        //           const  password = document.getElementById("passsword").value
        //           const  matricNumber = document.getElementById("matricNumber").value
        //           const  program = document.getElementById('program')
        //           const graduationYear = document.getElementById("graduationYear").value

        //           const registered = { firstname, lastname, email, password, matricNumber, program, graduationYear }
                

        //         onSubmit(registered)
        //     })

        //     async function onSubmit(registered) {
        //         try{   
        //             const response = await fetch("/api/register", {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //                 //body: JSON.stringify(registered),
        //             })
                

        //             const respData = await response.json();
        //             console.log(respData);

        //           if (respData.status !== 200) {
        //                 const errorDiv = document.createElement("div");
        //                 errorDiv.classList.add("alert", "alert-danger");
        //                 let dataError = respData.error.map(element => {
        //                     return `<p>${element}</p>`;
        //                 })
        //                 errorDiv.innerHTML = dataError.join("");
        //                 signUp.prepend(errorDiv);
        //             } else {
        //                 document.cookie = `uid = ${respData.data.id}; domain=; path=/ `;
        //                 windows.location.replace('index.html');
        //                 throw "Unsuccesful";
        //             }
        //          }catch (err) {
        //              console.log(err);
        //          }
        //     }
        // }
    

    
                // LOGIN
    
    if (window.location.href.includes('login.html')) {
        window.onload = function () {

            loginForm.addEventListener("submit", function (e){
                e.preventDefault();
                const email = document.querySelector('[name = email]').value;
                const password = document.querySelector('[name = password]').value;
                const loggedIn = { email, password }

                onLogIn(loggedIn);

            });

            async function onLogIn(loggedIn) {
                try{
                    const response = await fetch("/api/login", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(loggedIn), 
                    })

                    const respData = await response.json();
                    if (respData.status !== 200) {
                        let errorDiv = document.createElement("div");
                        errorDiv.classList.add("alert", "alert-danger", "w-75");
                        errorDiv.textContent = "Invalid email/password";
                        loginForm.prepend(errorDiv);
                        
                        
                    } else {
                        document.cookie = `uid = ${respData.data.id}; domain=; path=/ `;
                        windows.location.replace('index.html');
                        throw "Unsuccesful";
                    }
                } catch (err) {
                    console.log(err);
                }

                }
            }
        }

        // CREATE PROJECT
        if (window.location.href.includes("createproject.html")) {
            window.onload = function () {
                createProjectForm.addEventListener("submit", function (e) {
                    e.preventDefault();

                    const projectName = document.getElementById("projectName").value;
                    const abstract = document.getElementById("abstract").value;
                    const authors = document.getElementById("authors").value.split(",");
                    const tags = document.getElementById("tags").value;

                    const projectInfo = { projectName, abstract, authors, tags };

                    onCreateProject(projectInfo);
                })

                async function onCreateProject(projectInfo) {
                    try{
                        const response = await fetch("/api/projects", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(projectInfo),
                        })

                        const respData = await response.json();
                        if (respData.status !== "ok") {
                            let errorDiv = document.createElement("div");
                            errorDiv.classList.add("alert", "alert-danger", "w-75");
                            let dataError = response.error.map(element => {
                                return  `<p>${element}</p>`;
                            });
                            errorDiv.innerHTML = dataError;
                            createProjectForm.prepend(errorDiv);
                        } else {
                            windows.location.replace("index.html");
                        }
                    } catch(err){
                        console.log(err);
                    }
                }
            }
        }
}