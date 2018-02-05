var superTable = document.querySelector('#super-table');

initSuperTable({
    element: superTable,
    data: users,
    options: {
        firstColumn: 'email',
        rowMouseOver: true,
        rowStyle: 'zebra',
        fixedHeader: true,
        fixedColumn: true
    }
});
 /**
  * Inititialize the table with given options or the default ones if none given
  *
  * @param settings
  */
function initSuperTable(settings) {
    
}