document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    // Event listener for form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        // Create a new user object
        const newUser = {
            name: name,
            phone: phone,
            email: email,
            role: role
        };

        // Retrieve existing users from localStorage or initialize an empty array if none exist
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if a user with the entered email already exists
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert('User with this email already exists.');
            return;
        }

        users.push(newUser);
        
        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Display a success message and redirect to the homepage
        alert('Account created successfully!');
        window.location.href = 'index.html';
    });
});
