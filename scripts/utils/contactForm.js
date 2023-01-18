function displayModal() {
    const modal = document.getElementById("contact_modal");
    //focus on the first input
    document.getElementById("firstname").focus();
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.querySelector(".contact_submit").addEventListener("click", function(event){
    event.preventDefault()
    let requestForm = []
    let name = document.getElementById("lastname").value + " " + document.getElementById("firstname").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    requestForm.push({name: name, email: email, message: message});
    console.log(requestForm);
  });
