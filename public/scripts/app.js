/* app.js
Jeffrey Sy
980045498
Sept 29. 2021
*/

// IIFE -- Imediately Invoked Function Expression
(function(){
    
    function Start(){
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons){
            button.addEventListener('click', (event) => {
                if(!confirm("Are you sure?")) {
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();

/*
function submitForm(){
    let fName = document.getElementById("fName");
    let lName = document.getElementById("lName");
    let cNumber = document.getElementById("cNumber");
    let eAddress = document.getElementById("eAddress");
    let messageText = document.getElementById("messageText"); 
}; 
*/