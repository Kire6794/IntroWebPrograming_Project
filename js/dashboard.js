//Section session
let user = CheckLoggedUser();
console.log(user.name);
//Section session



//Section graph: Type of Studios
const selectorBar = `<div class="bar-g" style="{style-bar-g}">
            <div class="bar-g-content" style="{style-bar-g-content}">
                {value}
            </div>
        </div>`;
const tableSelector = `<table border="1">
            <thead>
                <th>{graphTitle}</th>
            </thead>
            <tbody>
            <tr>
                <td>{graphLegend}</td>
            </tr>
            <tr>
                <td>{graphContent}</td>
            </tr>
            </tbody>
        </div>`;
const styleBarG = `height: {height}px; background-color: rgba({RGB}, 0.5); margin-right: 2px;`;
const styleBarGContent = `height: {height}px; margin-top: {marginTop}px;`;

const legendBar = `<tr>
                <td><div style="width: 10px; height: 10px; background-color: rgba({RGB}, 0.5);"></div></td>
                <td>{value}</td>
            </tr>`;

function randomRGB() {
    let randR = Math.floor(Math.random() * 256);
    let randG = Math.floor(Math.random() * 256);
    let randB = Math.floor(Math.random() * 256);
    return `${randR}, ${randG}, ${randB}`;
}

function drawGraph(dataGraph) {
    let content_bar = "";
    let content_tableLegend = "<table>";
    $.each(dataGraph.aData, function (i, obj) {
        let heightPerc = 2.5 * obj.percentage;
        let heightText = heightPerc > 30 ? heightPerc - 20 : heightPerc - 20;
        let styleBarGR = styleBarG.replace("{height}", heightPerc).replace("{RGB}", obj.rgbC);
        let styleBarGContentR = styleBarGContent.replace("{height}", heightPerc).replace("{marginTop}", heightText);
        let selectorBarR = selectorBar.replace("{style-bar-g}", styleBarGR)
            .replace("{style-bar-g-content}", styleBarGContentR)
            .replace("{value}", obj.percentage + "%");
        content_bar = content_bar.concat(selectorBarR);
        let legendBarR = legendBar.replace("{value}", obj.name).replace("{RGB}", obj.rgbC);
        content_tableLegend = content_tableLegend.concat(legendBarR);
    });
    let tableSelectorMod = tableSelector.replace("{graphTitle}", dataGraph.name)
        .replace("{graphContent}", content_bar)
        .replace("{graphLegend}", content_tableLegend + "</table>");

    $("#graph-table").html(tableSelectorMod);
}
//Section graph: Type of Studios
$(document).ready(function () {
    let dataGraph = {
        name: "Type of Studios",
        aData: [
            { name: "Art Studio", percentage: 100, rgbC: randomRGB() },
            { name: "Recording Studio", percentage: 80, rgbC: randomRGB() },
            { name: "Dance Studio", percentage: 18, rgbC: randomRGB() },
            { name: "Rehearsal space", percentage: 30, rgbC: randomRGB() },
            { name: "Others", percentage: 10, rgbC: randomRGB() }
        ]
    }
    drawGraph(dataGraph);

    $("#logout").click(function () {
        DeleteSession();
    });

    $("#username").html(user.name);
});

