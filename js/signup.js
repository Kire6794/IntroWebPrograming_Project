document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    // Load users from JSON file if not already loaded
    if (!localStorage.getItem('users')) {
        fetch('../json/users.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('users', JSON.stringify(data));
            });
    }

    // Event listener for form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form values
        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        // Create a new user object
        const newUser = {
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            role: role
        };

        // Retrieve existing users from localStorage or initialize an empty array if none exist
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if a user with the entered email already exists
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert('User with this email already exists.');
            return; // Stop further execution if user exists
        }

        // Add the new user to the users array
        users.push(newUser);

        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Set the new user session
        SetSession(newUser);

        // Display a success message and redirect to the homepage
        alert('Account created successfully!');
        window.location.href = 'index.html';
    });
});
