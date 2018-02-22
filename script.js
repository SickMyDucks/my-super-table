window.onload = function() {
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: 'users.json',
        success: function (users) {
            columns = ['name', 'email', 'gender', 'age', 'company', 'eyeColor'];
            generateTable(columns, users);
            setTableHeaderWidth();
            rowStyles('zebra');
            enableRowHover();
        }
    });
}

/**
 * Generates the table
 * @param {array} columns 
 * @param {object} users 
 */
function generateTable(columns, users) {
    for (var i in columns) {
        var column = CreateElement('div', 'col', '');
        column.append(CreateElement('div', 'table-header', columns[i]));
        // column.append(CreateElement('div', 'hide', '.'));
        for (var j in users) {
            column.append(CreateElement('div', 'cell', users[j][columns[i]]));
        }
        getElement('.container').append(column);
    }
}

/**
 * document.querySelector alias
 * @param {string} selector 
 */
function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * Creates an HTML element with given class and content
 * @param {string} tag 
 * @param {string} className 
 * @param {string} content 
 * @returns {object} HTML element
 */
function CreateElement(tag, className, content) {
    element = document.createElement(tag);
    element.classList = className;
    element.innerHTML = content;
    return element;
}

/**
 * Sorts columns to put the chosen one first
 * @param {array} columns 
 * @param {string} firstColumn 
 * @returns {array} columns
 */
function sortColumnsOrder(columns, firstColumn) {
    columns.splice(columns.indexOf(firstColumn), 1);
    columns.unshift(firstColumn);
    return columns;
}

/**
 * Sets rows height
 * @param {number} height 
 */
function setRowHeight(height) {
    if (typeof height != undefined) {
        cells = document.querySelectorAll('.col div');
        for (i = 0; i < cells.length; i++) {
            cells[i].style.lineHeight = height+ 'px';
        }
    }
}

/**
 * Fixes table-header element that took the wrong parent's width
 */
function setTableHeaderWidth() {
    headerCells = document.querySelectorAll('.table-header');
    for (i = 0; i < headerCells.length; i++) {
        headerCells[i].style.width = (headerCells[i].parentElement.offsetWidth - 18) +'px';
    }
}

/**
 * Enables color switch when hovering rows  
 */
function enableRowHover() {
    hoverStyleSheet = document.createElement("style");
    hoverStyleSheet.type = "text/css"; 
    document.head.append(hoverStyleSheet);
    hoverStyleSheet = hoverStyleSheet.sheet;
    var cells = document.querySelectorAll('.cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mouseover', function (event) {
            var collection = this.parentElement.children;
            collection = Array.from(collection);
            rowIndex = collection.indexOf(this);
            if (typeof hoverStyleSheet.cssRules[0] != 'undefined') {
                hoverStyleSheet.deleteRule(0);
            }
            hoverStyleSheet.insertRule('.col div:nth-child(' + (rowIndex + 1) + ') {background-color: #ABB7B7}', 0);
        });
    }
    getElement('#super-table').onmouseout = function() {
        if (typeof hoverStyleSheet.cssRules[0] != 'undefined') {
            hoverStyleSheet.deleteRule(0);
        }
    }
}

function rowStyles(style) {
    rowsStyleSheet = document.createElement("style");
    rowsStyleSheet.type = "text/css"; 
    document.head.append(rowsStyleSheet);
    rowsStyleSheet = rowsStyleSheet.sheet;

    if (style === 'line') {
        rowsStyleSheet.insertRule('.col div {border-width: 1px 0; border-style: solid; border-color: #CFDFE5;}', 0);
    } else if (style === 'zebra') {
        rowsStyleSheet.insertRule('.col div:nth-child(even) {background-color: #CFDFE5}', 0);
        rowsStyleSheet.insertRule('.col div:nth-child(odd) {background-color: #FFF}', 1);
    }
}