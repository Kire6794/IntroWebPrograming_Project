document.addEventListener('DOMContentLoaded', () => {
    const studioList = document.getElementById('studio-list');

    const loadAvailableStudios = () => {
        const studios = JSON.parse(localStorage.getItem('studios')) || [];
        const availableStudios = studios.filter(studio => studio.Available);

        if (availableStudios.length === 0) {
            studioList.innerHTML = '<p>No available studios at the moment.</p>';
        } else {
            studioList.innerHTML = availableStudios.map(studio => `
                <div class="studio-card">
                    <h2>${studio.Name}</h2>
                    <p><strong>Location:</strong> ${studio.Address}</p>
                    <p><strong>Description:</strong> ${studio.Description}</p>
                    <p><strong>Area:</strong> ${studio.Area} sq meters</p>
                    <p><strong>Type:</strong> ${studio.Type}</p>
                    <p><strong>Capacity:</strong> ${studio.Capacity}</p>
                    <p><strong>Parking:</strong> ${studio.Parking ? 'Available' : 'Not Available'}</p>
                    <p><strong>Public Transport:</strong> ${studio.PublicTransport ? 'Available' : 'Not Available'}</p>
                    <p><strong>Rental Term:</strong> ${studio.RentalTerm}</p>
                    <p><strong>Price:</strong> $${studio.PricePerTerm}</p>
                </div>
            `).join('');
        }
    };

    loadAvailableStudios();
});
