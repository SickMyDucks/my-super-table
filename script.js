

// initSuperTable({
//     element: superTable,
//     data: users,
//     options: {
//         firstColumn: 'email',
//         rowMouseOver: true,
//         rowStyle: 'zebra',
//         fixedHeader: true,
//         fixedColumn: true
//     }
// });

window.onload = function() {
    var superTable = document.querySelector('#super-table');
    var users = $.ajax({
        method: 'get',
        dataType: 'json',
        url: 'users.json',
        success: function (users) {
            for (var i in users) {
                getElement('#super-table').append(createRow(users[i]));
            }
            return users;
        }
    });
};

/**
 * Initialize the table with given options or the default ones if none given
 * @param {object} settings 
 */
function initSuperTable(settings) {
    $('.row').css({"height": "30px"});
}

/**
 * document.querySelector alias
 * @param {string} selector
 * @returns {Element}
 */
function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * Creates a row with userData at the end of given element
 * @param {Object} userData 
 * @param {Element} element 
 */
function createRow(userData) {
    var row = CreateElement('div', 'row', '');
    for (var i in userData) {
        row.append(CreateElement('div', '', userData[i]));
    }
    return row;
}

/**
 * Creates an element with a specific class
 * @param {string} tag 
 * @param {string} className 
 * @param {string} content 
 * @returns {Element}
 */

function CreateElement(tag, className, content) {
    element = document.createElement(tag);
    element.classList = className;
    element.innerHTML = content;
    return element;
}