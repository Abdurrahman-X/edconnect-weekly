// SELECTORS
const selectOptions = document.querySelector("[name = program]");
const gradList = document.querySelector("[name = graduationYear]");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const createProjectForm = document.getElementById("createProjectForm");

//console.log(showCase);
const links = document.getElementById("links")
const navigation = document.getElementById("nav-head");
const userStatus = document.getElementById("user-status");
// console.log(userStatus);
// console.log(navigation);

//let currentPage = window.location.href

// if (window.location.href.includes("index.html")){

// window.onload = async function () {
    // document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    let cookieCheck = document.cookie.split("=");
    // console.log(cookieCheck[0]);
    // console.log(cookieCheck[1]);
    if (cookieCheck[0] === "uid" && cookieCheck[1]) {
       fetch(`/api/users/${cookieCheck[1]}`)
       .then((response) => {
           return response.json();
       })
        .then((data) => {
            //console.log(data);
            let inAll = `
                <li class="nav-item">
                        <a id = "logout" class="nav-link">Logout</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="username">Hi, ${data.firstname}</a>
                </li>
                    `;
            userStatus.innerHTML = inAll;
        }) 
        .catch((err) => {
            console.log('ERROR:', err.message);
        })
      
        
      
    }
    // let logoutBtn = document.getElementById("logout");
    //     logoutBtn.addEventListener("click", function (e) {
    //         document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    //         window.location.href = "index.html";
    //     })
  //}
//}
                
                          

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
            
            window.location.replace("login.html") // redirect to login page.
        }
        
        createProjectForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name  = document.querySelector("[name = name]").value
            const abstract = document.getElementById("abstract").value
            const authors = document.getElementById("authors").value.split(",")
            const tags = document.getElementById("tags").value.split(" ")

            const createProject = { name, abstract, authors, tags }

            onCreateProject(createProject);
        })

        async function onCreateProject(createProject) {
            try{
                const response = await fetch("/api/projects", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(createProject), 
            });

                //console.log(response);
                const respData = await response.json();
                //console.log(respData);

                if (respData.status !== "ok") {
                    let errorDiv = document.createElement("div");
                    errorDiv.classList.add("alert", "alert-danger");
                    let dataErrors = respData.errors.map(dataErr => `<p>${dataErr}</p>`);
                    errorDiv.innerHTML = dataErrors.join("");
                    createProjectForm.prepend(errorDiv);
                } else {
                    window.location.replace("index.html");
                }
            } catch (err){
                console.log(err);
            }
        }
    }
}

 // // UPDATE PROJECT LIST
 if (window.location.href.includes("index.html")) {
    //     window.onload = function () {
    
        window.onload = function () {
            let showCase = document.querySelector('.showcase');
            //showCase.innerHTML = "";
            
            fetch("/api/projects")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                   
                        let projects = data.map(ele => {
                            return `
                        <div class="card mb-4">
                            <div class="card-body">
                                <a href ="viewproject.html?id=${ele.id}"><h5 class="card-title text-primary">${ele.name}</h5></a>
                                <h6 class="card-subtitle mb-2 text-muted">${ele.authors.join(",")}</h6>
                                <p class="card-text">${ele.abstract}</p>
                                <a class = "card-link">${ele.tags.join(" ")}</a>
                            </div>
                        </div>`
                        
                        });  
                        showCase.innerHTML = projects;  
                })
                .catch((err) => {
                    console.log(err.message);
                })
            }
 }    
 
 
 // VIEW PROJECT PAGE 
 if (window.location.href.includes("viewproject.html")) {
     const projectName = document.getElementById("project_name");
     const projectAbstract = document.getElementById("project_abstract");
     const projectAuthors = document.getElementById("project_authors");
     const ProjectAuthor = document.getElementById("project_author")
     const projectTags = document.getElementById("project_tags");
     
     
     let params = new URLSearchParams(document.location.search.substring(1));
     let userId = params.get("id")
    //  console.log(params);
    //  console.log(userId);

     fetch(`/api/projects/${userId}`)
        .then((response) => {
            //console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            projectName.innerText = data.name;
            projectAbstract.textContent = data.abstract;
            projectAuthors.innerHTML = data.authors.map(author => {
                return `<p class="card-text">${author}</p>`;
            }).join("")
            projectTags.innerHTML = data.tags.map(tag => {
                return `<a href="#" class="card-link">${tag}</a>`
            }).join("");

            fetch(`/api/users/${data.createdBy}`)
                .then((response) => {
                    //console.log(response);
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);
                    ProjectAuthor.innerHTML = `Created By: <br> ${data.firstname} ${data.lastname}`;
                })
        .catch((err) => {
            console.log(err.message);
        })
 })
}




 
 
       
    

            
    

        
