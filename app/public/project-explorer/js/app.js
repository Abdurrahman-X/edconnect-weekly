// SELECTORS
const selectOptions = document.querySelector("[name = program]");
const gradList = document.querySelector("[name = graduationYear]");
const signupForm = document.getElementById("signupForm");


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
            console.log(respData);

          if (respData.status === 200) {
                document.cookie = `uid=${respData.data.id};path=/`;
                window.location.replace("index.html");
            } else {
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