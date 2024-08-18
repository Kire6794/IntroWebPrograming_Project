document.addEventListener('DOMContentLoaded', () => {
    const updateStudioForm = document.getElementById('update-studio-form');

    const loadStudioData = (id) => {
        const studios = JSON.parse(localStorage.getItem('studios')) || [];
        return studios.find(studio => studio.idStudio == id);
    };

    const saveStudios = (studios) => {
        localStorage.setItem('studios', JSON.stringify(studios));
    };

    updateStudioForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const studioId = document.getElementById('studioId').value;
        const studioIndex = studios.findIndex(studio => studio.idStudio == studioId);

        if (studioIndex !== -1) {
            const updatedStudio = {
                idStudio: studioId,
                Name: document.getElementById('studioName').value,
                Address: document.getElementById('location').value,
                Description: document.getElementById('description').value,
                Area: document.getElementById('area').value,
                Type: document.getElementById('type').value,
                Capacity: document.getElementById('capacity').value,
                Parking: document.getElementById('parking').checked,
                PublicTransport: document.getElementById('publicTransport').checked,
                Available: document.getElementById('availability').checked,
                RentalTerm: document.getElementById('rentalTerm').value,
                PricePerTerm: document.getElementById('price').value
            };

            studios[studioIndex] = updatedStudio;
            saveStudios(studios);
            alert('Studio updated successfully!');
            updateStudioForm.reset();
        } else {
            alert('Studio not found');
        }
    });

    document.getElementById('studioId').addEventListener('change', (event) => {
        const studio = loadStudioData(event.target.value);

        if (studio) {
            document.getElementById('studioName').value = studio.Name;
            document.getElementById('location').value = studio.Address;
            document.getElementById('description').value = studio.Description;
            document.getElementById('area').value = studio.Area;
            document.getElementById('type').value = studio.Type;
            document.getElementById('capacity').value = studio.Capacity;
            document.getElementById('parking').checked = studio.Parking;
            document.getElementById('publicTransport').checked = studio.PublicTransport;
            document.getElementById('availability').checked = studio.Available;
            document.getElementById('rentalTerm').value = studio.RentalTerm;
            document.getElementById('price').value = studio.PricePerTerm;
        } else {
            alert('Studio not found');
        }
    });
});
