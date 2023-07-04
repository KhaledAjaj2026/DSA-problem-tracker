// keeps track of number of rows, adds num to class of new <tr>.
// stores current user's rows in local machine storage.
let rowNum = localStorage.getItem('row-num') ? 
JSON.parse(localStorage.getItem('row-num')) : 0;
function addRow() {
    // set inputs as variables for later initialization & to check if all entered.
    const qVal = document.getElementsByName('question')[0].value;
    const sVal = document.getElementsByName('source')[0].value;
    const cVal = document.getElementsByName('categories')[0].value;
    const dVal = document.getElementsByName('date')[0].value;
    const tVal = document.getElementsByName('time')[0].value;
    
    if(qVal && sVal && cVal && dVal && tVal) {
        // increment rowNum by 1.
        rowNum++;
        localStorage.setItem('row-num', JSON.stringify(rowNum))
        // get table element.
        const dsaTable = document.getElementById('table');
        // initialize new row and insert input values.
        dsaTable.innerHTML += `
        <tr class='row-${rowNum}'>
            <td>Problem #${rowNum}</td>
            <td>${qVal}</td>
            <td>${sVal}</td>
            <td>${cVal}</td>
            <td>${dVal}</td>
            <td>${tVal}</td>
        <tr>`;
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