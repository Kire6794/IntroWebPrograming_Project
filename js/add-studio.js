document.addEventListener('DOMContentLoaded', () => {
    const addStudioForm = document.getElementById('add-studio-form');
    const studioList = document.getElementById('studio-list');

    const saveStudios = (studios) => {
        localStorage.setItem('studios', JSON.stringify(studios));
    };

    const loadStudios = () => {
        const studios = JSON.parse(localStorage.getItem('studios')) || [];
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
            <strong>Price:</strong> $${studio.price}
        `;
        studioList.appendChild(studioItem);
    };

    addStudioForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const studio = {
            name: document.getElementById('studioName').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            area: document.getElementById('area').value,
            type: document.getElementById('type').value,
            capacity: document.getElementById('capacity').value,
            parking: document.getElementById('parking').checked,
            publicTransport: document.getElementById('publicTransport').checked,
            availability: document.getElementById('availability').checked,
            rentalTerm: document.getElementById('rentalTerm').value,
            price: document.getElementById('price').value
        };

        addStudioToDOM(studio);

        const studios = JSON.parse(localStorage.getItem('studios')) || [];
        studios.push(studio);
        saveStudios(studios);

        addStudioForm.reset();
    });

    loadStudios();
});
