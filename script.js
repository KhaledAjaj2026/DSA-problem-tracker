// keeps track of number of rows, adds num to class of new <tr>.
// stores current user's rows in local machine storage.
let rowNum = localStorage.getItem('row-num') ? 
JSON.parse(localStorage.getItem('row-num')) : 0;

// stores locally the table data of this machine, and loads it
// if there is any, otherwise an empty object is returned.
let tableData = localStorage.getItem('table-data') ?
JSON.parse(localStorage.getItem('table-data')) : {};

// show table from localStorage.
// 'i' starts at 1 and increments every time an item from
// localStorage is added to problem-table.
let i = 1;
Object.keys(tableData).forEach(parent => {
    let flag = 0;
    const newRow = document.createElement('tr');
    Object.keys(tableData[parent]).forEach(child => {
        // since problem number is not part of tableData, use key
        // of object as problem number. Keeps order when adding
        // and deleting items from table.
        if (flag === 0) {
            const dataP = document.createElement('td');
            const nodeP = document.createTextNode(i);
            dataP.appendChild(nodeP);
            newRow.appendChild(dataP);
            flag = 1;
            i++;
        }
        const dataP = document.createElement('td');
        const nodeP = document.createTextNode(tableData[parent][child]);
        dataP.appendChild(nodeP);
        newRow.appendChild(dataP);
    });
    const table = document.getElementById('problem-table');
    table.appendChild(newRow);
});

// console.log("row num: " + rowNum);
// console.log("table-data:");
// console.log(tableData);

// add row to table and store input data in localStorage.
function addRow() {
    // set inputs as variables for later use & to check if all entered.
    const qVal = document.getElementsByName('question')[0].value;
    const sVal = document.getElementsByName('source')[0].value;
    const cVal = document.getElementsByName('categories')[0].value;
    const dVal = document.getElementsByName('date')[0].value;
    const tVal = document.getElementsByName('time')[0].value;
    
    if(qVal && sVal && cVal && dVal && tVal) {
        // adds data from input to 'tableData' object.
        tableData[rowNum] = {
            question: qVal,
            source: sVal,
            categories: cVal,
            date: dVal,
            time: tVal
        };
        // increment rowNum by 1.
        rowNum++;
        // add data to localStorage.
        localStorage.setItem('row-num', JSON.stringify(rowNum));
        localStorage.setItem('table-data', JSON.stringify(tableData));

        // get table element from DOM.
        const table = document.getElementById('problem-table');
        // insert values into table dynamically.
        let rowCount = table.getElementsByTagName('tr').length;
        let row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML = rowNum;
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
    console.log("new row num: " + rowNum);
}

const tempStorage = JSON.parse(JSON.stringify(tableData));
// Specify which row to delete and remove it from table & localStorage.
function deleteRow() {
    // get input row to delete as variable.
    const selectedRow = parseInt(document.getElementsByName('deleteRow')[0].value);
    console.log(selectedRow);
    // if-else statement checking validity of input row.
    if (!selectedRow) {
        alert('No row specified for deletion.');
    } else if(Object.keys(tableData).length === 0){
        alert('No rows to delete.');
    } else if (selectedRow > 0 && selectedRow <= rowNum) {
        const length = Object.keys(tempStorage).length;
        for (let i = selectedRow; i <= length; i++) {
            Object.assign(tempStorage[i], tempStorage[i+1]);
        }
        delete tempStorage[length];
        Object.assign(tableData, tempStorage);
        delete tableData[length];
        localStorage.setItem('table-data', JSON.stringify(tableData));
        // rowNum decremented.
        rowNum--;
        localStorage.setItem('row-num', rowNum);
        // reload site to see effects of deletion.
        window.scrollTo(0, 0);
        location.reload();
    } else {
        alert(`Invalid row number. Please enter a number between ${1} and ${rowNum}`);
    }
    document.getElementsByName('deleteRow')[0].value = '';
}

// clear all data from table and localStorage.
function clearData() {
    localStorage.clear();
    window.scrollTo(0, 0);
    location.reload();
}