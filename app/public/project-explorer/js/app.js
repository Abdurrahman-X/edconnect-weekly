// SELECTORS
const selectOptions = document.querySelector("[name = program]");
const gradList = document.querySelector("[name = graduationYear]");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const createProjectForm = document.getElementById("createProjectForm");
const showCase = document.querySelector(".showcase");
//console.log(showCase);
const links = document.getElementById("links")
const navigation = document.getElementById("nav-head");
const userStatus = document.getElementById("user-status");
// console.log(userStatus);
// console.log(navigation);

// FUNCTIONS

// function errorMessage() {
//                 let errorDiv = document.createElement("div");
//                 errorDiv.classList.add("alert", "alert-danger");
//                 let dataErrors = respData.errors.map(dataErr => {
//                     return `<p>${dataErr}</p>`;
//                 })
//                 errorDiv.innerHTML = dataErrors.join("");
//                 signupForm.prepend(errorDiv);
//                 throw "Unsuccesful"; 
// }

// function reDirect() {
//     window.location.replace("index.html");
// }

  

const cookieCheck = document.cookie.split("=");
        //console.log(cookieCheck[0]); 
        //console.log(cookieCheck[1]); 
        if (cookieCheck[0] === "uid" && cookieCheck[1]) {
            //console.log(true);
            fetch(`/api/users/${cookieCheck[1]}`)
                .then((response) => {
                    //console.log(response);
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);
                    //console.log(userStatus);
                    // let logoutBtn = document.createElement("button");
                    // let greetUser = document.createElement("span");
                    // logoutBtn.textContent = "Logout";
                    // logoutBtn.classList.add("btn", "btn-info");
                    // greetUser.innerHTML = `<span id = "username"> Hi, ${data.firstname}</span>`;
                    // userStatus.classList.add("invisible");
                    // navigation.appendChild(logoutBtn);
                    // navigation.appendChild(greetUser);
                    let inAll = `
                                    <li class="nav-item">
                                         <a id = "logout" class="nav-link">Logout</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id = "username">Hi, ${data.firstname}</a>
                                    </li>
                                `;
                    userStatus.innerHTML = inAll;

                    let logoutBtn = document.getElementById("logout");
                    logoutBtn.addEventListener("click", function (e) {
                        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                        window.location.href = "index.html";
                    })
                })
                .catch ((err) => {
                    console.log('ERROR:', err.message);
                })
        }

if (window.location.href.includes("register.html")) {
    window.onload = function () {
        async function progPopulate() {
            try {
                // POPULATE THE PROGRAM LIST
                const prosponse = await fetch("/api/programs");
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

                const gradsponse = await fetch("/api/graduationYears");
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


        // HANDLING THE FORM SUBMISSION            
                
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
        
          const  firstname =  document.querySelector("[name = firstName]").value;
          const lastname = document.querySelector("[name = lastName]").value;
          const email = document.querySelector("[name = email]").value;
          const  password = document.getElementById("password").value;
          const  matricNumber = document.querySelector("[name = matricNumber]").value;
          const  program = document.querySelector("[name = program]").value;
          const graduationYear = document.querySelector("[name = graduationYear]").value;

          const registered = { firstname, lastname, email, password, matricNumber, program, graduationYear }
        

        onSubmit(registered)
    })

    async function onSubmit(registered) {
        try{   
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registered),
            })
        
            
            const respData = await response.json();
            // console.log(respData);

          if (respData.status === "ok") {
                document.cookie = `uid=${respData.data.id};path=/`;
                window.location.replace("index.html");
                
            } 
            else {
                let errorDiv = document.createElement("div");
                errorDiv.classList.add("alert", "alert-danger");
                let dataErrors = respData.errors.map(dataErr => {
                    return `<p>${dataErr}</p>`;
                })
                errorDiv.innerHTML = dataErrors.join("");
                signupForm.prepend(errorDiv);
                throw "Unsuccesful";  
            }
        }catch (err) {
             console.log(err);
        }
        
        }
    }
}


// LOGIN
if (window.location.href.includes("login.html")) {
    window.onload = function () {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.querySelector("[name = email]").value;
            const password = document.querySelector("[name = password]").value;
            const loggedIn = { email, password};
    
            onLogIn(loggedIn);
        })

       async function onLogIn(loggedIn) {
           try{
               const response = await fetch("/api/login", {
                   method: "POST",
                   headers: {"Content-Type" : "application/json"},
                   body: JSON.stringify(loggedIn),
               });

               const respData = await response.json();
               console.log(respData);

               if (respData.status !== "ok") {
                   let errorDiv = document.createElement("div");
                   errorDiv.classList.add("alert", "alert-danger");
                   errorDiv.textContent = "Invalid email/password";
                   loginForm.prepend(errorDiv);
               } else {
                   document.cookie = `uid=${respData.data.id}; path=/`;
                   window.location.replace("index.html");
               }
           } catch(err){
               console.log(err);
           }
       }
    }
}

// CREATE PROJECT
if (window.location.href.includes("createproject.html")) {
    window.onload = function () {

        // const cookieCheck = document.cookie.indexOf("uid=");
        // console.log(cookieCheck); 
        //if (cookieCheck !== -1) 
        const cookieCheck = document.cookie.split(";").find(item => item.startsWith("uid="));
        if(!cookieCheck) {
            console.log("No cookies");
            window.location.replace("login.html") // redirect to login page.
        }
        
        createProjectForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const projectName = document.getElementById("projectName").value;
            const abstract = document.getElementById("abstract").value;
            const authors = document.getElementById("authors").value.split(",");
            const tags = document.getElementById("tags").value.split(" ");

            const createProject = { projectName, abstract, authors, tags }

            onCreateProject(createProject);
        })

        async function onCreateProject(createProject) {
            try{
                const response = await fetch("/api/projects", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(createProject), 
            });

                const respData = await response.json();
                // console.log(respData);

                if (respData === "ok") {
                    window.location.replace("index.html");
                } else {
                    let errorDiv = document.createElement("div");
                    errorDiv.classList.add("alert", "alert-danger");
                    let dataErrors = respData.errors.map(dataErr => `<p>${dataErr}</p>`);
                    errorDiv.innerHTML = dataErrors.join("");
                    createProjectForm.prepend(errorDiv);
                    
                }
            } catch (err){
                console.log(err);
            }
        }
    }
}

// UPDATE PROJECT LIST
if (window.location.href.includes("index.html")) {
    window.onload = function () {

        fetch("/api/projects")
        .then((response) => {
            //console.log('response', response);
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            let projects = data.map((project) => {
            // let title = document.getElementById("title");
            // let subtitle = document.getElementById("subtitle");
            // let text = document.getElementById("abstract-text");
            // let link = document.createElement("a");
            // link.classList.add("card-link");
            // links.appendChild(link);

            // // console.log(data[0].name);
            // title.innerText = project.name;
            // subtitle.innerText = project.authors.join(", ");
            // text.innerText = project.abstract;
            // link.innerText = project.tags.join(" ");

            return `<div class="card-deck">
                    <div class="card mb-4">
                        <div class="card-body">
                            <a href = "viewproject.html?id=${project.id}"><h5 class="card-title text-primary">${project.name}</h5></a>
                            <h6 class="card-subtitle mb-2 text-muted">${project.authors.join(", ")}</h6>
                            <p class="card-text">${project.abstract}</p>
                            <a class = "card-link">${project.tags.join(" ")}</a>
                        </div>
                    </div>
                    </div>`;
            })
            
            showCase.innerHTML = projects;

        })
}
}
        
