let person = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890"
};

function ValidateEmail() {
    if ($("#login-form").valid()) {
        let email = document.getElementById("login").value;
        if (email === person.email) {
            SetSession(person);
            GotoDashboard();
        } else {
            alert("Email address is not exist, please try again.");
        }

    }

}

function GotoDashboard() {
    window.location.href = "pages/dashboard.html";
}

let user = GetSession();

$(document).ready(function () {
    if (user !== null) {
        GotoDashboard();
    }
});