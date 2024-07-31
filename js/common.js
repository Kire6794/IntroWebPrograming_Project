const sessionUser = "sessionUser";


function SetSession(person) {
    localStorage.setItem(sessionUser, JSON.stringify(person));
}

function GetSession() {
    let user = localStorage.getItem(sessionUser);
    if (typeof user !== 'undefined' && user !== null) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

function DeleteSession() {
    localStorage.removeItem(sessionUser);
    CheckLoggedUser();
}

function CheckLoggedUser() {
    let user = GetSession();
    if (user === null) {
        window.location.href = "../index.html";
    } else {
        return user;
    }
}