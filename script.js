window.onload = function() {
    styleSheet = document.createElement("style");
    styleSheet.type = "text/css"; 
    document.head.insertBefore(styleSheet, null);
    styleSheet = styleSheet.sheet;
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: 'users.json',
        success: function (users) {
            columns = ['email', 'firstName', 'lastName', 'birthdate'];
            for (var i in columns) {
                var column = CreateElement('div', 'col', '');
                column.append(CreateElement('div', 'table-header', columns[i]));
                column.append(CreateElement('div', 'hide', '.'));
                for (var j in users) {
                    column.append(CreateElement('div', 'cell', users[j][columns[i]]));
                }
                getElement('.container').append(column);
            }
            setTableHeaderWidth();
            var cells = document.querySelectorAll('.cell');
            for (var i = 0; i < cells.length; i++) {
                cells[i].addEventListener('mouseover', function(event) {
                    var collection = this.parentElement.children;
                    collection = Array.from(collection);
                    rowIndex = collection.indexOf(this);
                    if (typeof styleSheet.cssRules[0] != 'undefined') {
                        styleSheet.deleteRule(0);
                    }
                    styleSheet.insertRule('.col div:nth-child(' + (rowIndex + 1) + ') {background-color: #ABB7B7}', 0);
                });
            }
        }
    });
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

function setRowHeight(height) {
    if (typeof height != undefined) {
        cells = document.querySelectorAll('.col div');
        for (i = 0; i < cells.length; i++) {
            cells[i].style.lineHeight = height+ 'px';
        }
    }
}

function setTableHeaderWidth() {
    headerCells = document.querySelectorAll('.table-header');
    for (i = 0; i < headerCells.length; i++) {
        headerCells[i].style.width = (headerCells[i].parentElement.offsetWidth - 20) +'px';
    }
}