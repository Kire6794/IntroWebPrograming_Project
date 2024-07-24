let person = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890"
};

function ValidateEmail() {
    if ($("#login-form").valid()) {
        let email = document.getElementById("login").value;
        if (email === person.email) {
            window.location.href = "pages/dashboard.html";
        } else {
            alert("Email address is not exist, please try again.");
        }

    }

}