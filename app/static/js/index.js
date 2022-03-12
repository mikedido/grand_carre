var htmlGrid =  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * Complete grid with the input
 * 
 * @param {*} event
 * @param {*} idCell
 * @returns 
 */
 function isNumeric(event, idCell) {
    const number = ['X', 'x', 'Backspace'];

    if (!isInArray(event.key, number)) {
        return false;
    }

    let line = Math.floor(idCell.substring(5) / 12);
    let column = idCell.substring(5) % 12;

    if (event.key == "Backspace") {
        htmlGrid[line][column] = 0;
        document.getElementById(idCell).classList.remove("error");
        document.getElementById(idCell).classList.remove("cell-fill");
    }
    
    htmlGrid[line][column] = event.key;
    document.getElementById(idCell).classList.add("cell-fill");
}

function isInArray(value, array) {  
    return array.indexOf(value) > -1;
}



function clearGrid() {
    let allInputGridElements = document.getElementsByTagName('input');
  
    for (let element = 0; element < allInputGridElements.length; element++) {
      allInputGridElements[element].value = '';
      allInputGridElements[element].classList.remove("error");
      allInputGridElements[element].classList.remove("cell-fill");
      allInputGridElements[element].classList.remove("cell-fill-green");
    }

    //activate the button
    let btnResolve = document.getElementById('btn-resolve');
    btnResolve.classList.add('enabled');
    btnResolve.classList.add('active');
    btnResolve.classList.remove('disabled');

    htmlGrid =  [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

/**
 * 
 * @returns {array}
 */
async function findSquare() {
    const url = '/api/square/find'

    let response = await fetch(url + `?matrix=${JSON.stringify(htmlGrid)}&test=1`)
    let result = await response.json();

    return result;
}


/**
 * 
 * @param {*} row 
 * @param {*} column 
 * @param {*} dimension 
 */
function fillGrid(row, column, dimension) {
    let count = 0;
    let counterCell = 0
    let cellId = row * 12 + column;

    while (count < dimension * dimension) {
        if (counterCell == dimension) {
            counterCell = 0
            row++
            cellId = (row * 12) + column
        }

        let element = document.getElementById(`cell-${cellId}`);
        element.classList.add("cell-fill-green");
        
        cellId++;
        count++;
        counterCell++;
    }
}

/**
 * The main program
 */
function main() {

    findSquare().then(result => {
        console.log(result);

        fillGrid(result[0], result[1], result[2])

        let btnResolve = document.getElementById('btn-resolve');
        btnResolve.classList.add('disabled');
        btnResolve.classList.remove('active');

    });
}