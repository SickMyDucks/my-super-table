function initSuperTable(params) {
    var target = params.element;
    var users = params.data;
    params.options = extend(defaultOptions, params.options);
    users = sortUsersBy(users, params.options.sorts.by, params.options.sorts.asc);
    columns = sortColumnsOrder(columns, params.options.firstColumn);
    isfirstColumnFixed(params.options.fixedColumn);
    rowStyles(params.options.rowStyle);
    isHeaderFixed(params.options.fixedHeader);
    generateTable(columns, params.data, params.element);
    enableRowHover(params.options.rowMouseOver);
    setRowHeight(params.options.rowHeight);
    largerRows(params.options.rowHoverHeight.enabled, params.options.rowHoverHeight.height)
}

/**
 * Generates the table with columns array, users data, where to put the generated table
 * @param {array} columns 
 * @param {object} users 
 * @param {element} target
 */
function generateTable(columns, users, target) {
    container = CreateElement('div', 'container', '');
    for (var i in columns) {
        var column = CreateElement('div', 'col', '');
        column.append(CreateElement('div', 'table-header cell', columns[i]));
        for (var j in users) {
            column.append(CreateElement('div', '', users[j][columns[i]]));
        }
        container.append(column);
    }
    target.append(container);
}

/**
 * document.querySelector alias
 * @param {string} selector 
 * @returns {object}
 */
function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * document.querySelectorAll alias
 * @param {string} selector 
 * @returns {array}
 */
function getElements(selector) {
    return document.querySelectorAll(selector);
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
    rowHeightStyleSheet = document.createElement("style");
    rowHeightStyleSheet.type = "text/css";
    rowHeightStyleSheet.id = 'hoverStyleSheet';
    document.head.append(rowHeightStyleSheet);
    rowHeightStyleSheet = rowHeightStyleSheet.sheet;
    if (typeof height != undefined) {
        rowHeightStyleSheet.insertRule('.col div {line-height:' + height + 'px}')
        // cells = document.querySelectorAll('.col div');
        // for (i = 0; i < cells.length; i++) {
        //     cells[i].style.lineHeight = height + 'px';
        // }
    }
}

/**
 * Enables color switch when hovering rows  
 * @param {boolean} bool
 */
function enableRowHover(bool) {
    if (!bool) {
        return false;
    }
    hoverStyleSheet = document.createElement("style");
    hoverStyleSheet.type = "text/css";
    hoverStyleSheet.id = 'hoverStyleSheet';
    document.head.append(hoverStyleSheet);
    hoverStyleSheet = hoverStyleSheet.sheet;
    var cells = document.querySelectorAll('.col div:not(.table-header)');
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mouseover', function (event) {
            var collection = this.parentElement.children;
            collection = Array.from(collection);
            rowIndex = collection.indexOf(this);
            if (typeof hoverStyleSheet.cssRules[0] != 'undefined') {
                hoverStyleSheet.deleteRule(0);
            }
            hoverStyleSheet.insertRule('.col div:nth-child(' + (rowIndex + 1) + ') {background-color: #ABB7B7;}', 0);
        });
    }
    getElement('#super-table').onmouseout = function () {
        if (typeof hoverStyleSheet.cssRules[0] != 'undefined') {
            hoverStyleSheet.deleteRule(0);
        }
    }
}

/**
 * Determines Rows' style
 * @param {string} style 'free' — 'line' — 'zebra'
 */
function rowStyles(style) {
    rowsStyleSheet = document.createElement("style");
    rowsStyleSheet.type = "text/css";
    rowsStyleSheet.id = 'rowStyleSheet';
    document.head.append(rowsStyleSheet);
    rowsStyleSheet = rowsStyleSheet.sheet;

    if (style === 'line') {
        rowsStyleSheet.insertRule('.col div {border-width: 1px 0; border-style: solid; border-color: #CFDFE5;}', 0);
        rowsStyleSheet.insertRule('.col:first-child div {background-color: white;}', 1);
    } else if (style === 'zebra') {
        rowsStyleSheet.insertRule('.col div:nth-child(even) {background-color: #CFDFE5}', 0);
        rowsStyleSheet.insertRule('.col div:nth-child(odd) {background-color: #FFF}', 1);
    } else if (style == 'free') {
        rowsStyleSheet.insertRule('.col:first-child div {background-color: white;}', 0);
    }
}

/**
 * Enables or not the first row to be fixed when scrolling
 * @param {boolean} bool 
 */
function isHeaderFixed(bool) {
    if (bool) {
        headerStyleSheet = document.createElement("style");
        headerStyleSheet.type = "text/css";
        headerStyleSheet.id = 'headerStyleSheet';
        document.head.append(headerStyleSheet);
        headerStyleSheet = headerStyleSheet.sheet;
        headerStyleSheet.insertRule('.table-header {padding: 0; position: sticky; top: 0; background-color: white;}', 0);
    }
}

/**
 * Enables or not the first column fixed when scrolling
 * @param {boolean} bool 
 */
function isfirstColumnFixed(bool) {
    if (bool) {
        columnStyleSheet = document.createElement("style");
        columnStyleSheet.type = "text/css";
        columnStyleSheet.id = 'columnStyleSheet';
        document.head.append(columnStyleSheet);
        columnStyleSheet = columnStyleSheet.sheet;
        columnStyleSheet.insertRule('.col:first-child {position: sticky; left: 0; z-index: 1;}', 0);
    }
}

/**
 * Sorts users by the given property by ascending order or not
 * @param {object} users 
 * @param {string} property
 * @param {boolean} asc
 */
function sortUsersBy(users, property, asc) {
    var sortable = [];
    for (var user in users) {
        sortable.push(users[user]);
    }
    if (!property) {
        return sortable;
    }
    sortable.sort(function (a, b) {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    })

    if (asc === false) {
        sortable.reverse();
    }
    return sortable;
}

/**
 * jQuery's extend equivalent
 * @param {object} obj 
 * @param {object} src
 * @returns {object}
 */
function extend(obj, src){
    for(var key in src)
        if(src.hasOwnProperty(key))
            obj[key] = src[key];
    return obj;
}

function largerRows(bool, height) {
    if (!bool) {
        return false;
    }
    largerRowsStyleSheet = document.createElement("style");
    largerRowsStyleSheet.type = "text/css";
    largerRowsStyleSheet.id = 'hoverStyleSheet';
    document.head.append(largerRowsStyleSheet);
    largerRowsStyleSheet = largerRowsStyleSheet.sheet;
    var cells = document.querySelectorAll('.col div:not(.table-header)');
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mouseover', function (event) {
            var collection = this.parentElement.children;
            collection = Array.from(collection);
            rowIndex = collection.indexOf(this);
            if (typeof largerRowsStyleSheet.cssRules[0] != 'undefined') {
                largerRowsStyleSheet.deleteRule(0);
            }
            largerRowsStyleSheet.insertRule('.col div:nth-child(' + (rowIndex + 1) + ') {line-height: ' + height + 'px;}', 0);
        });
    }
    getElement('#super-table').onmouseout = function () {
        if (typeof largerRowsStyleSheet.cssRules[0] != 'undefined') {
            largerRowsStyleSheet.deleteRule(0);
        }
    }
}