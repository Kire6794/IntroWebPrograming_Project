document.addEventListener('DOMContentLoaded', function () {
    let aStudios = [];
    let aStudiosOri = [];
    let aUsers = [];
    let filter = {};

    let user = CheckLoggedUser(); // Use session management function to get the logged-in user
    console.log('Logged in user:', user);

    if (user.role === "renter") {
        document.getElementById('addStudio').style.display = 'none';
        document.getElementById('updateStudio').style.display = 'none';
    }

    getStudios();
    aUsers = JSON.parse(localStorage.getItem(sessionUsers));

    $(".input-search").on('blur', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        let inputType = parseInt($(this).attr('input-type'));
        let inputValue = $(this).val().toLocaleLowerCase();
        addParameterToFilter(inputType, inputValue);
        filterStudios();
    });

    function getStudios() {
        try {
            aStudios = JSON.parse(localStorage.getItem(sessionStudios));
            aStudiosOri = aStudios;
            if (user.role === ownerRole) {
                // Filter studios by owner ID if the user is an owner
                aStudios = aStudios.filter((studio) => studio.IdOwner == user.id);
            } else {
                // Filter studios by availability if the user is a renter
                aStudios = aStudios.filter((studio) => studio.Available == "Yes");
            }
            fillDataStudios();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const rowStudio = `<tr>
        <td>{Name}</td>
        <td>{Address}</td>
        <td>{Area}</td>
        <td>{Type}</td>
        <td>{Capacity}</td>
        <td>{Parking}</td>
        <td>{PublicTransport}</td>
        <td>{Available}</td>
        <td>{RentalTerm}</td>
        <td>{PricePerTerm}</td>
        <td>{Actions}</td>
    </tr>`;

    function fillDataStudios() {
        let dataBodyTable = '';
        if (aStudios.length > 0) {
            aStudios.forEach(function (studio) {
                dataBodyTable = dataBodyTable.concat(replaceObjectRow(studio));
            });
        } else {
            dataBodyTable = '<tr><td colspan="11"><center>No studios found</center></td></tr>';
        }
        $("#studios tbody").html(dataBodyTable);
    }

    function replaceObjectRow(studio) {
        let row = rowStudio;
        Object.entries(studio).forEach(function (property) {
            row = row.replace(`{${property[0]}}`, property[1]);
        });
        row = row.replace('{Actions}', replaceActionRow(studio));
        return row;
    }

    const iTagTable = '<i onclick="functionAction({ActionCode},{StudioId})" title="{title}" class="material-icons">{FontCode}</i>';
    const showInfoIconCode = 'visibility';
    const priceIconCode = 'paid';
    const editIconCode = 'edit';
    const deleteIconCode = 'delete';
    const ownerInfoIconCode = 'person';

    function replaceActionRow(studio) {
        let actionRow = '';
        if (user.role === ownerRole) {
            actionRow = actionRow.concat(iTagTable.replace('{FontCode}', editIconCode).replace('{ActionCode}', 2).replace('{title}', 'Edit Studio'));
            actionRow = actionRow.concat(iTagTable.replace('{FontCode}', deleteIconCode).replace('{ActionCode}', 3).replace('{title}', 'Delete Studio'));
        } else { // Renter role
            actionRow = actionRow.concat(iTagTable.replace('{FontCode}', ownerInfoIconCode).replace('{ActionCode}', 5).replace('{title}', 'Owner Info'));
        }
        return actionRow.replaceAll('{StudioId}', studio.idStudio);
    }

    function functionEditStudio(studioId) {
        window.location.href = "update-studio.html?studioId=" + studioId;
    }

    function functionDeleteStudio(studioId) {
        let localStorageStudios = JSON.parse(localStorage.getItem(sessionStudios));
        localStorageStudios = localStorageStudios.filter((studio) => studio.idStudio != studioId);
        localStorage.setItem(sessionStudios, JSON.stringify(localStorageStudios));
        getStudios();
    }

    function functionShowOwnerInfo(studioId) {
        let idOwner = aStudios.find((studio) => studio.idStudio == studioId).IdOwner;
        let owner = aUsers.find((user) => user.id == idOwner);
        alert(`Owner Info
        Name: ${owner.name}
        Phone Number: ${owner.phoneNumber}
        Email: ${owner.email}`);
    }

    function functionAction(actionCode, studioId) {
        switch (actionCode) {
            case 2:
                functionEditStudio(studioId);
                break;
            case 3:
                functionDeleteStudio(studioId);
                break;
            case 5:
                functionShowOwnerInfo(studioId);
                break;
        }
    }

    function addParameterToFilter(inputType, inputValue) {
        switch (inputType) {
            case 1:
                filter.Name = inputValue;
                break;
            case 2:
                filter.Address = inputValue;
                break;
            case 3:
                filter.Area = inputValue;
                break;
            case 4:
                filter.Type = inputValue;
                break;
            case 5:
                filter.Capacity = inputValue;
                break;
            case 6:
                filter.Parking = inputValue;
                break;
            case 7:
                filter.PublicTransport = inputValue;
                break;
            case 8:
                filter.Available = inputValue;
                break;
            case 9:
                filter.RentalTerm = inputValue;
                break;
            case 10:
                filter.PricePerTerm = inputValue;
                break;
        }
    }

    function filterStudios() {
        aStudios = aStudiosOri.filter(function (studio) {
            for (let key in filter) {
                let paramVal = studio[key] + "";
                if (studio[key] === undefined || studio[key] === null || !(paramVal.toLocaleLowerCase().includes(filter[key])))
                    return false;
            }
            return true;
        });
        fillDataStudios();
    }
});
