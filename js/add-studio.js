document.addEventListener('DOMContentLoaded', () => {
    const addStudioForm = document.getElementById('add-studio-form');
    const studioList = document.getElementById('studio-list');

    const saveStudios = (studios) => {
        localStorage.setItem('studios', JSON.stringify(studios));
    };

    const loadStudios = () => {
        const studios = JSON.parse(localStorage.getItem('studios')) || [];
        studioList.innerHTML = ''; // Clear the list before loading
        studios.forEach(studio => {
            addStudioToDOM(studio);
        });
    };

    const addStudioToDOM = (studio) => {
        const studioItem = document.createElement('div');
        studioItem.className = 'studio-item';
        studioItem.innerHTML = `
            <strong>Name:</strong> ${studio.name} <br>
            <strong>Location:</strong> ${studio.location} <br>
            <strong>Description:</strong> ${studio.description} <br>
            <strong>Area:</strong> ${studio.area} sq meters <br>
            <strong>Type:</strong> ${studio.type} <br>
            <strong>Capacity:</strong> ${studio.capacity} people <br>
            <strong>Parking:</strong> ${studio.parking ? 'Yes' : 'No'} <br>
            <strong>Public Transport:</strong> ${studio.publicTransport ? 'Yes' : 'No'} <br>
            <strong>Availability:</strong> ${studio.availability ? 'Yes' : 'No'} <br>
            <strong>Rental Term:</strong> ${studio.rentalTerm} <br>
            <strong>Price:</strong> $${studio.price} <br>
            <button class="change-studio-btn" data-id="${studio.id}">Change</button>
            <button class="delete-studio-btn" data-id="${studio.id}">Delete</button>
        `;
        studioList.appendChild(studioItem);

        // Attach event listeners to buttons
        studioItem.querySelector('.change-studio-btn').addEventListener('click', () => changeStudio(studio.id));
        studioItem.querySelector('.delete-studio-btn').addEventListener('click', () => deleteStudio(studio.id));
    };

    const changeStudio = (id) => {
        const studios = JSON.parse(localStorage.getItem('studios')) || [];
        const studio = studios.find(studio => studio.id === id);
        if (studio) {
            document.getElementById('studioName').value = studio.name;
            document.getElementById('location').value = studio.location;
            document.getElementById('description').value = studio.description;
            document.getElementById('area').value = studio.area;
            document.getElementById('type').value = studio.type;
            document.getElementById('capacity').value = studio.capacity;
            document.getElementById('parking').checked = studio.parking;
            document.getElementById('publicTransport').checked = studio.publicTransport;
            document.getElementById('availability').checked = studio.availability;
            document.getElementById('rentalTerm').value =
