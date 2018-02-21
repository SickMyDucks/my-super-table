window.onload = function() {
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
                    column.append(CreateElement('div', '', users[j][columns[i]]));
                }
                getElement('.container').append(column);
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
    console.table(columns);
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