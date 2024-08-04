$(document).ready(function() {
    // Validate the form on submit
    $("#add-studio-form").validate({
        rules: {
            studioName: {
                required: true,
                minlength: 3
            },
            location: {
                required: true,
                minlength: 3
            },
            description: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            studioName: {
                required: "Please enter the studio name",
                minlength: "Studio name must be at least 3 characters long"
            },
            location: {
                required: "Please enter the location",
                minlength: "Location must be at least 3 characters long"
            },
            description: {
                required: "Please enter a description",
                minlength: "Description must be at least 10 characters long"
            }
        },
        submitHandler: function(form) {
            // Call the function to submit the form data
            submitForm();
        }
    });

    // Function to handle form submission
    function submitForm() {
        // Gather form data
        var formData = {
            studioName: $("#studioName").val(),
            location: $("#location").val(),
            description: $("#description").val()
        };

        // Send form data to the server using AJAX
        $.ajax({
            type: "POST",
            url: "server_endpoint_here", // Replace with your server endpoint
            data: formData,
            success: function(response) {
                // Handle successful response
                alert("Studio added successfully!");
                $("#add-studio-form")[0].reset(); // Reset the form
            },
            error: function(xhr, status, error) {
                // Handle errors
                alert("An error occurred: " + error);
            }
        });
    }
});
