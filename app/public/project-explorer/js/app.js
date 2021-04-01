
    // SELECTORS

const selectOptions = document.getElementById('program');
const gradList = document.querySelector('select[name = graduationYear]');
const signUp = document.getElementById('signupForm');
const errAlert = document.getElementById('error-alert');
const firstName = document.querySelector('[name = firstName]');
//console.log(firstName).value;

errAlert.classList.add('w-100');
errAlert.style.display = 'none';

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


            // HANDLING THE FORM SUBMISSION            
            
            signUp.addEventListener("submit", function (e) {
                e.preventDefault();

                const registered = {
                    firstname: document.querySelector('[name = firstName]').value,
                    lastname: document.querySelector('[name = lastName]').value,
                    email: document.querySelector('[name = email]').value,
                    password: document.querySelector('[name = password]').value,
                    matricNumber: document.querySelector('[name = matricNumber]').value,
                    program: document.getElementById('program'),
                    graduationYear: document.querySelector('[name = graduationYear]').value
                }

                onSubmit(registered);
            })

            async function onSubmit(registered) {
                try{   
                    const response = await fetch("/api/register", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(registered)
                    })

                    const data = await response.json();
                    if (data.status !== 200) {
                        errAlert.style.display = 'block';
                        let dataError = response.error.map(element => {
                            return `<p>${element}</p>`;
                        })
                        errAlert.innerHTML = dataError;
                    } else {
                        document.cookie = `uid = ${response.data.id}; domain=; path=/ `;
                        windows.location.replace('index.html');
                        throw "Unsuccesful";
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }