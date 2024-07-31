let aStudios = [];

async function getStudios() {
    try {
        const response = await fetch('../json/studios.json');

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        aStudios = await response.json();
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

function fillDataStudios(){
    let dataBodyTable = '';
    aStudios.forEach(function(studio){
        dataBodyTable = dataBodyTable.concat(replaceObjectRow(studio));
    })
    $("#studios tbody").html(dataBodyTable)
}

function replaceObjectRow(studio){
    let row = rowStudio;
    Object.entries(studio).forEach(function(property){ //Object.entries - property key-value pairs from object - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        row = row.replace(`{${property[0]}}`, property[1]);//0 = property name; 1 = property value; string Interpolation - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    });
    row = row.replace('{Actions}', replaceActionRow(studio));
    return row;
}

const iTagTable = '<i class="material-icons">{FontCode}</i>';
const showInfoIconCode = 'visibility';
const priceIconCode = 'paid';

function replaceActionRow(studio){ //Google Fonts icon - https://fonts.google.com/icons?icon.set=Material+Icons&selected=Material+Icons+Outlined:home:&icon.size=24&icon.color=%23e8eaed
    let actionRow = '';
    actionRow = actionRow.concat(iTagTable.replace('{FontCode}', showInfoIconCode));
    if(true){ //Use the user property to show action
        actionRow = actionRow.concat(iTagTable.replace('{FontCode}', priceIconCode));
    }
    return actionRow;
}

getStudios();