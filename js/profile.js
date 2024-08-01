document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const loggedInUser = CheckLoggedUser(); // Use session management functions

    // Check if a user is logged in
    if (loggedInUser) {
        // Display current user information in the view card
        document.getElementById('current-name').innerText = loggedInUser.name;
        document.getElementById('current-phone').innerText = loggedInUser.phone;
        document.getElementById('current-email').innerText = loggedInUser.email;

        // Pre-fill the update form with current user information
        document.getElementById('profile-name').value = loggedInUser.name;
        document.getElementById('profile-phone').value = loggedInUser.phone;
        document.getElementById('profile-email').value = loggedInUser.email;

        // Display the logged-in user's name in the header
        document.getElementById('username').innerText = loggedInUser.name;
    }

    // Event listener for form submission
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect updated form values
        const updatedName = document.getElementById('profile-name').value;
        const updatedPhone = document.getElementById('profile-phone').value;
        const updatedEmail = document.getElementById('profile-email').value;

        // Retrieve existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        // Find the index of the logged-in user
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);

        // Check if the user is found
        if (userIndex !== -1) {
            // Update the user's information
            users[userIndex] = { ...users[userIndex], name: updatedName, phone: updatedPhone, email: updatedEmail };
            // Save the updated users array to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            // Update the logged-in user information in localStorage
            SetSession(users[userIndex]);

            // Update the view card with the new information
            document.getElementById('current-name').innerText = updatedName;
            document.getElementById('current-phone').innerText = updatedPhone;
            document.getElementById('current-email').innerText = updatedEmail;

            // Update the username in the header
            document.getElementById('username').innerText = updatedName;

            alert('Profile updated successfully!');
        } else {
            alert('User not found.');
        }
    });

    // Event listener for logout button
    document.getElementById('logout').addEventListener('click', function() {
        DeleteSession(); // Remove the logged-in user from localStorage
        alert('Logged out successfully!');
    });
});
