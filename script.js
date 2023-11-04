let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    const content = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;

            if (fields[index] === 'circle') {
                const svg = generateAnimatedCircleSVG();
                cell.appendChild(svg);
            } else if (fields[index] === 'cross') {
                const svg = generateAnimatedCrossSVG();
                cell.appendChild(svg);
            } else {
                cell.textContent = '';
            }

            cell.onclick = () => handleCellClick(cell, index); // Füge den onclick-Event hinzu
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    content.innerHTML = '';
    content.appendChild(table);
}

function handleCellClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;

        if (currentPlayer === 'circle') {
            cell.innerHTML = generateAnimatedCircleSVG().outerHTML;
            currentPlayer = 'cross';
        } else {
            cell.innerHTML = generateAnimatedCrossSVG().outerHTML;
            currentPlayer = 'circle';
        }

        cell.onclick = null; // Entferne den Eventlistener, um erneutes Klicken zu verhindern
    }
}


function generateAnimatedCircleSVG() {
    const svgWidth = 70;
    const svgHeight = 70;
    const circleColor = "#00B0EF";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", svgWidth / 2);
    circle.setAttribute("cy", svgHeight / 2);
    circle.setAttribute("r", 0);
    circle.setAttribute("fill", "transparent");
    circle.setAttribute("stroke", circleColor);
    circle.setAttribute("stroke-width", "4");

    const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animation.setAttribute("attributeName", "r");
    animation.setAttribute("from", 0);
    animation.setAttribute("to", svgWidth / 2 - 2);
    animation.setAttribute("dur", "125ms");
    animation.setAttribute("begin", "0s");
    animation.setAttribute("fill", "freeze");
    animation.setAttribute("repeatCount", "0");

    circle.appendChild(animation);
    svg.appendChild(circle);

    return svg;
}


function generateAnimatedCrossSVG() {
    const svgWidth = 70;
    const svgHeight = 70;
    const crossColor = "#FFC000";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", 0);
    line1.setAttribute("y1", 0);
    line1.setAttribute("x2", svgWidth);
    line1.setAttribute("y2", svgHeight);
    line1.setAttribute("stroke", crossColor);
    line1.setAttribute("stroke-width", "4");

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", svgWidth);
    line2.setAttribute("y1", 0);
    line2.setAttribute("x2", 0);
    line2.setAttribute("y2", svgHeight);
    line2.setAttribute("stroke", crossColor);
    line2.setAttribute("stroke-width", "4");

    const animation1 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animation1.setAttribute("attributeName", "stroke-dasharray");
    animation1.setAttribute("from", "0, 150");
    animation1.setAttribute("to", "150, 0");
    animation1.setAttribute("dur", "200ms");
    animation1.setAttribute("begin", "0s");
    animation1.setAttribute("repeatCount", "1");
    animation1.setAttribute("end", "indefinite");

    const animation2 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animation2.setAttribute("attributeName", "stroke-dasharray");
    animation2.setAttribute("from", "0, 150");
    animation2.setAttribute("to", "150, 0");
    animation2.setAttribute("dur", "200ms");
    animation2.setAttribute("begin", "0s");
    animation2.setAttribute("repeatCount", "1");
    animation2.setAttribute("end", "indefinite");

    line1.appendChild(animation1);
    line2.appendChild(animation2);

    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg;
}