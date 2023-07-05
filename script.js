// keeps track of number of rows, adds num to class of new <tr>.
// stores current user's rows in local machine storage.
let rowNum = localStorage.getItem('row-num') ? 
JSON.parse(localStorage.getItem('row-num')) : 0;

// stores locally the table data of this machine, and loads it
// if there is any, otherwise an empty object is returned.
let tableData = localStorage.getItem('table-data') ?
JSON.parse(localStorage.getItem('table-data')) : {};

// show table from localStorage.
Object.keys(tableData).forEach(parent => {
    const newRow = document.createElement('tr');
    Object.keys(tableData[parent]).forEach(child => {
        const dataP = document.createElement('td');
        const nodeP = document.createTextNode(tableData[parent][child]);
        dataP.appendChild(nodeP);
        newRow.appendChild(dataP);
    });
    const table = document.getElementById('problem-table');
    table.appendChild(newRow);
});

function addRow() {
    // set inputs as variables for later use & to check if all entered.
    const qVal = document.getElementsByName('question')[0].value;
    const sVal = document.getElementsByName('source')[0].value;
    const cVal = document.getElementsByName('categories')[0].value;
    const dVal = document.getElementsByName('date')[0].value;
    const tVal = document.getElementsByName('time')[0].value;
    
    if(qVal && sVal && cVal && dVal && tVal) {
        // increment rowNum by 1.
        rowNum++;
        // adds data from input to 'tableData' object.
        tableData[rowNum] = {
            problemNum: rowNum,
            question: qVal,
            source: sVal,
            categories: cVal,
            date: dVal,
            time: tVal
        };
        console.log(tableData);
        // add data to localStorage.
        localStorage.setItem('row-num', JSON.stringify(rowNum));
        // let length = Object.keys(tableData).length;
        localStorage.setItem('table-data', JSON.stringify(tableData));

        // get table element from DOM.
        const table = document.getElementById('problem-table');
        // insert values into table dynamically.
        let rowCount = table.getElementsByTagName('tr').length;
        let row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML = tableData[rowNum].problemNum;
        row.insertCell(1).innerHTML = tableData[rowNum].question;
        row.insertCell(2).innerHTML = tableData[rowNum].source;
        row.insertCell(3).innerHTML = tableData[rowNum].categories;
        row.insertCell(4).innerHTML = tableData[rowNum].date;
        row.insertCell(5).innerHTML = tableData[rowNum].time;

        // clear input fields for new entry.
        // using variables like 'qVal' does not work, reference error.
        document.getElementsByName('question')[0].value = '';
        document.getElementsByName('source')[0].value = '';
        document.getElementsByName('categories')[0].value = '';
        document.getElementsByName('date')[0].value = '';
        document.getElementsByName('time')[0].value = '';
    } else {
        alert('One or more fields are empty. Fill out form before pressing \"Enter\".');
    }
}
function deleteRow() {
    // get input row to delete as variable.
    const selectedRow = document.getElementsByName('deleteRow')[0].value;
    // if-else statement checking validity of input row.
    if (!selectedRow) {
        alert('No row specified for deletion.');
    } else if(rowNum === 0){
        alert('No rows to delete.');
    } else if (selectedRow > 0 && selectedRow <= rowNum) {
        // row input via jQuery.
        $(`.row-${selectedRow}`).remove();
        // rowNum decremented.
        rowNum--;
    } else {
        alert(`Invalid row number. Please enter a number between ${1} and ${rowNum}`);
    }
    document.getElementsByName('deleteRow')[0].value = '';
}